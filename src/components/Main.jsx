import React, { useState } from 'react';
import styles from '../styles/Main.module.css';
import { tracklist } from '../Constants/global.js';
import SearchBar from '../components/SearchBar.jsx';
import SearchResults from '../components/SearchResults.jsx';
import Playlist from '../components/Playlist.jsx';

export default function Main() {
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = (query) => {
        const filteredResults = tracklist.filter((item) => 
        item.song.toLowerCase().includes(query.toLowerCase()) ||
        item.artist.toLowerCase().includes(query.toLowerCase()) ||
        item.album.toLowerCase().includes(query.toLowerCase())        
        );
        setSearchResults(filteredResults);
    }

    return (
        <div className={styles.main}>
            <div className={styles.searchBar}>
                <SearchBar onSearch={handleSearch}/>
            </div>
            <div className={styles.resultsAndPlaylist}>
                <SearchResults results={searchResults} />
                <Playlist />
            </div>
        </div>
    );
}
