import React from 'react';
import styles from '../styles/Main.module.css';
import SearchResults from '../components/SearchResults.jsx';
import Playlist from '../components/Playlist.jsx';

export default function Main() {
    return (
        <div className={styles.main}>
            <SearchResults />
            <Playlist />
        </div>
    )
}
