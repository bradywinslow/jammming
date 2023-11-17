import React from 'react';
import styles from '../styles/SearchBar.module.css';

export default function SearchBar() {
    return (
        <>
            <div className={styles.searchDiv}>
                <form className={styles.searchContainer}>
                    <input className={styles.searchInput}></input>
                </form>
                <button>Search</button>
            </div>
        </>
    )
}