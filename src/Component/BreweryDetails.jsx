import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Rating from 'react-rating'; // Import the Rating component
import './BreweryDetails.css';

const BreweryDetails = () => {
    const { id } = useParams();
    const [brewery, setBrewery] = useState(null);
    const [rating, setRating] = useState(0); // State to hold the rating value

    useEffect(() => {
        const fetchBrewery = async () => {
            try {
                console.log(`Fetching brewery with ID: ${id}`);
                const response = await axios.get(`https://api.openbrewerydb.org/breweries/${id}`);
                console.log('API response:', response.data);
                setBrewery(response.data);
            } catch (error) {
                console.error('Error fetching brewery details:', error);
            }
        };

        fetchBrewery();
    }, [id]);

    const handleRatingChange = (rate) => {
        setRating(rate);
        // Here you can send the rating to your backend if needed
        console.log(`Rating for brewery ${id}: ${rate}`);
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
            
            {/* Rating component */}
            <div className="rating">
                <h3>Rate this Brewery:</h3>
                <Rating
                    initialRating={rating}
                    onChange={handleRatingChange}
                    emptySymbol="fa fa-star-o fa-2x" // Empty star icon
                    fullSymbol="fa fa-star fa-2x" // Full star icon
                />
            </div>
        </div>
    );
};

export default BreweryDetails;
