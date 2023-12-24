import React, { useState } from 'react';
import styles from '../styles/Playlist.module.css';
import Track from '../components/Track.jsx';

export default function Playlist({ tracks, onRemoveResult }) {
    const [playlistTitle, setPlaylistTitle] = useState('');

    const handlePlaylistTitleChange = (e) => {
        setPlaylistTitle(e.target.value);
    };
    
    return (
        <div className={styles.playlistContainer}>
            <form className={styles.form}>
                <input
                    className={styles.playlistInput}
                    type='text'
                    id='playlistInput'
                    value={playlistTitle}
                    onChange={handlePlaylistTitleChange}
                    required
                />
            </form>
            <Track tracks={tracks} onRemoveResult={onRemoveResult} />
            <form>
                <button className={styles.saveToSpotifyButton} type='submit'>Save Playlist</button>
            </form>
        </div>
    )
}
