import React, { useState } from 'react';
import styles from '../styles/Playlist.module.css';
import Track from '../components/Track.jsx';
import { addToPlaylist } from '../spotify/httpRequests.js';

export default function Playlist({ trackUris, tracks, onRemoveResult }) {
    const [playlistTitle, setPlaylistTitle] = useState('');
    const [submissionErrorMessage, setSubmissionErrorMessage] = useState('');
    const [savedSuccessfullyMessage, setSavedSuccessfullyMessage] = useState('');

    const handlePlaylistTitleChange = (e) => {
        setPlaylistTitle(e.target.value);
        setSubmissionErrorMessage('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSavePlaylistToSpotify();
        }
    };

    const handleSavePlaylistToSpotify = () => {
        if (!playlistTitle && (tracks.length === 0)) {
            setSubmissionErrorMessage('Please add tracks and playlist name before saving');
            
            // Clear the error message after 5 seconds
            setTimeout(() => {
                setSubmissionErrorMessage('');
            }, 5000);

            return;
        };
        
        if (tracks.length === 0) {
            setSubmissionErrorMessage('Please add tracks to playlist before saving');
       
            // Clear the error message after 5 seconds
            setTimeout(() => {
                setSubmissionErrorMessage('');
            }, 5000);

            return;
        };
        
        if (!playlistTitle) {
            setSubmissionErrorMessage('Please add playlist name before saving');
            
            // Clear the error message after 5 seconds
            setTimeout(() => {
                setSubmissionErrorMessage('');
            }, 5000);

            return;
        };

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
                    onKeyDown={handleKeyDown}
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
