import React from 'react';
import styles from '../styles/Playlist.module.css';

export default function Playlist() {
    return (
        <div className={styles.playlistContainer}>
            <form>
                <input className={styles.playlistInput} type='text' />
            </form>
            <input className={styles.saveToSpotifyButton} type="submit" value="Save to Spotify" />
        </div>
    )
}
