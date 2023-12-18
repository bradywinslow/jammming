import React, { useState } from 'react';
import styles from '../styles/SearchBar.module.css';

export default function SearchBar({ onSearch }) {
    const [searchInput, setSearchInput] = useState('');

    const handleInputChange = (e) => {
        setSearchInput(e.target.value);
    };
    
    const handleSearch = () => {
        if (searchInput) {
            onSearch(searchInput);
            setSearchInput('');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && searchInput) {
            e.preventDefault();
            onSearch(searchInput);
            setSearchInput('');
        } else if (e.key === 'Enter' && searchInput === '') {
            e.preventDefault();
        }
    };

    return (
        <search className={styles.searchDiv}>
            <form className={styles.searchContainer} onKeyDown={handleKeyDown}>
                <input type='text' value={searchInput} className={styles.searchInput} onChange={handleInputChange}></input>
            </form>
            <form className={styles.searchButtonContainer}>
                <input type='button' value='Search' onClick={handleSearch} className={styles.searchButton}></input>
            </form>
        </search>
    )
}
