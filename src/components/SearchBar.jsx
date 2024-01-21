import React, { useState } from 'react';
import styles from '../styles/SearchBar.module.css';

export default function SearchBar({ onSearch }) {
    const [searchInput, setSearchInput] = useState('');
    const [loginErrorMessage, setLoginErrorMessage] = useState('');

    const handleInputChange = (e) => {
        setSearchInput(e.target.value);
    };
    
    const handleSearch = (e) => {
        let accessToken = localStorage.getItem('access_token');

        if (accessToken && searchInput) {
            onSearch(searchInput);
            setSearchInput('');
        } else if (searchInput === '') {
            e.preventDefault();
        } else {
            setLoginErrorMessage('Please login before searching');
            
            // Clear the error message after 5 seconds
            setTimeout(() => {
                setLoginErrorMessage('');
            }, 5000);

            return;
        }
    };

    const handleKeyDown = (e) => {
        let accessToken = localStorage.getItem('access_token');
        
        if (e.key === 'Enter' && searchInput && accessToken) {
            e.preventDefault();
            onSearch(searchInput);
            setSearchInput('');
        } else if (e.key === 'Enter' && searchInput === '') {
            e.preventDefault();
        } else if (e.key === 'Enter' && searchInput && !accessToken) {
            e.preventDefault();
            setLoginErrorMessage('Please login before searching');
            
            // Clear the error message after 5 seconds
            setTimeout(() => {
                setLoginErrorMessage('');
            }, 5000);

            return;
        }
    };

    return (
        <search className={styles.searchDiv}>
            <form className={styles.searchContainer} onKeyDown={handleKeyDown}>
                <input type='text' id='searchBar' autoComplete='off' value={searchInput} className={styles.searchInput} onChange={handleInputChange}></input>
            </form>
            <form className={styles.searchButtonContainer}>
                <input type='button' id='searchButton' value='Search' onClick={handleSearch} className={styles.searchButton}></input>
            </form>
            {loginErrorMessage && <p className={styles.loginErrorMessage}>{loginErrorMessage}</p>}
        </search>
    )
}
