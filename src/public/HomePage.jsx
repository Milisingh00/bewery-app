import React from 'react';
import BrewerySearch from './BrewerySearch';

const HomePage = () => {
    return (
        <div>
            <h1 className='d-flex justify-content-center align-items-center m-2'>Welcome to the Home Page</h1>
            <BrewerySearch />
        </div>
    );
};

export default HomePage;
