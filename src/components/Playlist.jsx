import React, { useState } from 'react';
import styles from '../styles/Playlist.module.css';
import Track from '../components/Track.jsx';
import { obtainUserId, addToPlaylist } from '../Constants/httpRequests.js';

export default function Playlist({ trackUris, tracks, onRemoveResult }) {
    const [playlistTitle, setPlaylistTitle] = useState('');
    const [submissionErrorMessage, setSubmissionErrorMessage] = useState('');
    const [savedSuccessfullyMessage, setSavedSuccessfullyMessage] = useState('');

    const handlePlaylistTitleChange = (e) => {
        setPlaylistTitle(e.target.value);
        setSubmissionErrorMessage('');
    };

    const handleSavePlaylistToSpotify = () => {
        if (!playlistTitle && (tracks.length === 0)) {
            setSubmissionErrorMessage('Please add tracks and a playlist name before saving');
            
            // Clear the error message after 5 seconds
            setTimeout(() => {
                setSubmissionErrorMessage('');
            }, 5000);

            return;
        };
        
        if (tracks.length === 0) {
            setSubmissionErrorMessage('Please add tracks to the playlist before saving');
       
            // Clear the error message after 5 seconds
            setTimeout(() => {
                setSubmissionErrorMessage('');
            }, 5000);

            return;
        };
        
        if (!playlistTitle) {
            setSubmissionErrorMessage('Please add a playlist name before saving');
            
            // Clear the error message after 5 seconds
            setTimeout(() => {
                setSubmissionErrorMessage('');
            }, 5000);

            return;
        };
        
        // Obtain userId
        obtainUserId();

        // Add to playlist
        const tracksInfo = addToPlaylist(playlistTitle, trackUris);
        if (tracksInfo) {
            setSavedSuccessfullyMessage(`${playlistTitle} saved successfully!`);

            // Clear message aftrer 5 seconds
            setTimeout(() => {
                setSavedSuccessfullyMessage('');
            }, 5000);

            return;
        };
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
                    placeholder='Playlist name'
                    autoComplete='off'
                />
            </form>
            {submissionErrorMessage && <p className={styles.submissionErrorMessage}>{submissionErrorMessage}</p>}
            {/* Display success message if playlist saved successfully */}
            {savedSuccessfullyMessage && <p className={styles.savedSuccessfullyMessage}>{savedSuccessfullyMessage}</p>}
            <Track tracks={tracks} onRemoveResult={onRemoveResult} />
            <form>
                <button className={styles.saveToSpotifyButton} type='button' onClick={handleSavePlaylistToSpotify}>
                    Save Playlist
                </button>
            </form>
        </div>
    )
}
