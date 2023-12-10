import React, { useState } from 'react';
import styles from '../styles/Playlist.module.css';
import Track from '../components/Track.jsx';

export default function Playlist({ tracks, onRemoveResult }) {
    const [playlistTitle, setPlaylistTitle] = useState('');

    const handlePlaylistTitleChange = (e) => {
        setPlaylistTitle(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Playlist Title:', playlistTitle);
    };
    
    return (
        <div className={styles.playlistContainer}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <input
                    className={styles.playlistInput}
                    type='text'
                    value={playlistTitle}
                    onChange={handlePlaylistTitleChange}
                    required
                />
            </form>
            <Track tracks={tracks} onRemoveResult={onRemoveResult} />
            <input
                className={styles.saveToSpotifyButton}
                type="submit"
                value="Save to Spotify"
            />
        </div>
    )
}
