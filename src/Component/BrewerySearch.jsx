// src/BrewerySearch.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './BrewerySearch.css';

const BrewerySearch = () => {
    const [searchType, setSearchType] = useState('by_city');
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const navigate = useNavigate();

    const handleSearch = async () => {
        let url = '';
        switch (searchType) {
            case 'by_city':
                url = `https://api.openbrewerydb.org/breweries?by_city=${query}`;
                break;
            case 'by_name':
                url = `https://api.openbrewerydb.org/breweries?by_name=${query}`;
                break;
            case 'by_type':
                url = `https://api.openbrewerydb.org/breweries?by_type=${query}`;
                break;
            default:
                return;
        }

        try {
            const response = await axios.get(url);
            const breweriesWithRatings = response.data.map(brewery => ({
                ...brewery,
                rating: (Math.random() * 5).toFixed(2) // Simulated rating between 0 and 5
            }));
            setResults(breweriesWithRatings);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleCardClick = (id) => {
        navigate(`/brewery/${id}`);
    };

    return (
        <div>
            <h2>Brewery Search</h2>
            <div className="search-container">
                <label>
                    Search by:
                    <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
                        <option value="by_city">City</option>
                        <option value="by_name">Name</option>
                        <option value="by_type">Type</option>
                    </select>
                </label>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={`Search by ${searchType.replace('by_', '')}`}
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            <div className="results-container">
                {results.length > 0 ? (
                    <ul className="results-list">
                        {results.map((brewery) => (
                            <li key={brewery.id} className="result-card" onClick={() => handleCardClick(brewery.id)}>
                                <h3>{brewery.name}</h3>
                                <p><strong>Address:</strong> {brewery.street}, {brewery.city}, {brewery.state}</p>
                                <p><strong>Phone:</strong> {brewery.phone}</p>
                                <p><strong>Website:</strong> <a href={brewery.website_url} target="_blank" rel="noopener noreferrer">{brewery.website_url}</a></p>
                                <p><strong>Rating:</strong> {brewery.rating}</p>
                                <p><strong>Location:</strong> {brewery.city}, {brewery.state}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No results found</p>
                )}
            </div>
        </div>
    );
};

export default BrewerySearch;
