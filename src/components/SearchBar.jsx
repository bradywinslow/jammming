import React from 'react';
import styles from '../styles/SearchBar.module.css';

export default function SearchBar() {
    return (
        <search className={styles.searchDiv}>
            <form className={styles.searchContainer}>
                <input className={styles.searchInput}></input>
            </form>
            <button className={styles.searchButton}>Search</button>
        </search>
    )
}