import React, { useState } from 'react';
import { spotifySearch } from '../spotify/httpRequests.js';
import { useNavigate } from 'react-router-dom';

export default function SearchBar() {
    const [searchInput, setSearchInput] = useState('');
    
    const navigate = useNavigate();
  
    const handleSpotifySearch = async (searchInput) => {
      const searchData = await spotifySearch(searchInput);

      navigate('/create-playlist', { state: searchData });
    };

    const handleInputChange = (e) => {
        setSearchInput(e.target.value);
    };
    
    const handleSearch = (e) => {
        if (searchInput) {
            handleSpotifySearch(searchInput);
            setSearchInput('');
        } else if (searchInput === '') {
            e.preventDefault();
        }
    };

    const handleKeyDown = (e) => {        
        if (e.key === 'Enter' && searchInput) {
            e.preventDefault();
            handleSpotifySearch(searchInput);
            setSearchInput('');
        } else if (e.key === 'Enter' && searchInput === '') {
            e.preventDefault();
        }
    };

    return (
        <search>
            <form onKeyDown={handleKeyDown}>
                <input
                    type='text'
                    id='searchBar'
                    autoComplete='off'
                    value={searchInput}
                    onChange={handleInputChange}
                ></input>
                <input
                    type='button'
                    id='searchButton'
                    value='Search'
                    onClick={handleSearch}
                ></input>
            </form>
        </search>
    )
}
