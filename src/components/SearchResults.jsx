import React from 'react';
import styles from '../styles/SearchResults.module.css'
import Tracklist from '../components/Tracklist.jsx';
import { useLocation } from 'react-router-dom';

export default function SearchResults({ results, onAddResult }) {
    const location = useLocation();
    const data = location.state || { searchData: []}
    
    return (
        <div className={styles.searchResultsContainer}>
            <h2>Search Results</h2>
            <Tracklist results={data.searchData} onAddResult={onAddResult} />
        </div>
    );
}
