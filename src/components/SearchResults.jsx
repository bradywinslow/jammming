import React from 'react';
import styles from '../styles/SearchResults.module.css'
import Tracklist from '../components/Tracklist.jsx';

export default function SearchResults({ searchData, addSearchResultToPlaylist }) {
    return (
        <div className={styles.searchResultsContainer}>
            <h2>Search Results</h2>
            <Tracklist searchData={searchData} addSearchResultToPlaylist={addSearchResultToPlaylist} />
        </div>
    );
}
