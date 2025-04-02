import React from 'react';

function SearchBar({ searchTerm, onSearchChange }) {
    return (
        <input
            type="text"
            placeholder="Search profiles..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="search-bar"
        />
    );
}

export default SearchBar;