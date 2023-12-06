import React, { useState } from 'react';
import styles from '../styles/SearchBar.module.css';

export default function SearchBar() {
    const [inputValue, setInputValue] = useState('');

    const handleUserInput = (e) => {
        setInputValue(e.target.value);
    };

    const resetInputField = () => {
        setInputValue('');
    };

    return (
        <search className={styles.searchDiv}>
            <form className={styles.searchContainer}>
                <input type='text' value={inputValue} className={styles.searchInput} onChange={handleUserInput}></input>
            </form>
            <button onClick={resetInputField} className={styles.searchButton}>Search</button>
        </search>
    )
}
