import React from 'react';
import styles from '../styles/Playlist.module.css';
import Track from '../components/Track.jsx';

export default function Playlist() {
    return (
        <div className={styles.playlistContainer}>
            <form className={styles.form}>
                <input className={styles.playlistInput} type='text' />
            </form>
            <Track />
            <input className={styles.saveToSpotifyButton} type="submit" value="Save to Spotify" />
        </div>
    )
}
