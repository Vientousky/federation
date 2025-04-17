import React from 'react';

const Search: React.FC = () => {


    return (
        <form  className="search-container">
            <input
                type="search"
                placeholder="Search..."
                className="search-input"
            />
        </form>
    );
};

export default Search;