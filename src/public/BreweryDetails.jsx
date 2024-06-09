import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Rating from 'react-rating';
import 'font-awesome/css/font-awesome.min.css';
import './BreweryDetails.css';
import { db, auth, onAuthStateChanged, getDocs, collection, query, where, addDoc, Timestamp } from './firebase'; // Import Firestore functions

const BreweryDetails = () => {
    const { id } = useParams();
    const [brewery, setBrewery] = useState(null);
    const [starsGiven, setStarsGiven] = useState(0);
    const [displayName, setUserName] = useState('');
    const [description, setDescription] = useState('');
    const [ratings, setRatings] = useState([]);

    useEffect(() => {
        const fetchBrewery = async () => {
            try {
                const response = await axios.get(`https://api.openbrewerydb.org/breweries/${id}`);
                setBrewery(response.data);
            } catch (error) {
                console.error('Error fetching brewery details:', error);
            }
        };

        const fetchRatings = async () => {
            try {
                const q = query(collection(db, 'reviews'), where('breweryId', '==', id));
                const querySnapshot = await getDocs(q);
                const ratingsData = querySnapshot.docs.map(doc => doc.data());
                setRatings(ratingsData);
            } catch (error) {
                console.error('Error fetching ratings:', error);
            }
        };

        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserName(user.displayName);
            } else {
                console.error('No user is signed in');
            }
        });

        fetchBrewery();
        fetchRatings();
    }, [id]);

    const handleRatingChange = (rate) => {
        setStarsGiven(rate);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!displayName) {
            console.error('User name not available');
            return;
        }

        try {
            const payload = {
                breweryId: id,
                starsGiven,
                userName: displayName,
                description,
                date: Timestamp.fromDate(new Date())
            };

            // Add the review to the 'reviews' collection
            const docRef = await addDoc(collection(db, 'reviews'), payload);
            console.log('Review saved with ID:', docRef.id);
            setRatings(prevRatings => [...prevRatings, payload]);
            setStarsGiven(0);
            setDescription('');
        } catch (error) {
            console.error('Error saving rating and description:', error);
        }
    };

    if (!brewery) {
        return <p>Loading...</p>;
    }

    return (
        <div className="brewery-details">
            <h2>{brewery.name}</h2>
            <p><strong>Type:</strong> {brewery.brewery_type}</p>
            <p><strong>Address:</strong> {brewery.street}, {brewery.address_2}, {brewery.address_3}, {brewery.city}, {brewery.state_province}, {brewery.postal_code}, {brewery.country}</p>
            <p><strong>Phone:</strong> {brewery.phone}</p>
            <p><strong>Website:</strong> <a href={brewery.website_url} target="_blank" rel="noopener noreferrer">{brewery.website_url}</a></p>
            <p><strong>Longitude:</strong> {brewery.longitude}</p>
            <p><strong>Latitude:</strong> {brewery.latitude}</p>
            
            
            <div className="rating">
                <h3>Rate this Brewery:</h3>
                <Rating
                    initialRating={starsGiven}
                    onChange={handleRatingChange}
                    emptySymbol="fa fa-star-o fa-2x orange-star"
                    fullSymbol="fa fa-star fa-2x orange-star"
                />
            </div>

            
            <div className="description-box">
                <h3>Leave a Description:</h3>
                <textarea
                    value={description}
                    onChange={handleDescriptionChange}
                    placeholder="Write your review here..."
                    rows="4"
                    cols="50"
                />
            </div>

           
            <button onClick={handleSubmit}>Submit</button>

            
            <div className="ratings-list">
                <h3>Previous Ratings:</h3>
                {ratings.map((ratingData, index) => (
                    <div key={index} className="rating-item">
                        <p><strong>UserName:</strong> {ratingData.userName}</p>
                        <p><strong>Rating:</strong> {ratingData.starsGiven}</p>
                        <p><strong>Description:</strong> {ratingData.description}</p>
                        <p><strong>Date:</strong> {ratingData.date.toDate().toLocaleString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BreweryDetails;
