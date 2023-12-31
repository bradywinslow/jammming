import React from 'react';
import styles from '../styles/SearchResults.module.css'
import Tracklist from '../components/Tracklist.jsx';

export default function SearchResults({ results, onAddResult }) {
    return (
        <div className={styles.searchResultsContainer}>
            <h2>Search Results</h2>
            <Tracklist results={results} onAddResult={onAddResult} />
        </div>
    );
}
