import React, { useState } from 'react';
import styles from '../styles/Playlist.module.css';
import Track from '../components/Track.jsx';
import { obtainUserId, createPlaylist, addToPlaylist } from '../Constants/httpRequests.js';

export default function Playlist({ tracks, onRemoveResult }) {
    const [playlistTitle, setPlaylistTitle] = useState('');
    // const [token, setToken] = useState('');
    // const [userId, setUserId] = useState({});
    // const [playlistId, setPlaylistId] = useState({});
    const [submissionErrorMessage, setSubmissionErrorMessage] = useState('');
    const [savedSuccessfullyMessage, setSavedSuccessfullyMessage] = useState('');

    /*useEffect(() => {
        if (localStorage.getItem('access_token')) {
            setToken(localStorage.getItem('access_token'));
        }
    }, []); */

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
        
        // Create playlist
        createPlaylist(playlistTitle, (playlistId) => {
            if (playlistId) {
                // Display success message
                setSavedSuccessfullyMessage(`${playlistTitle} saved successfully!`);

                // Clear the success message after 5 seconds
                setTimeout(() => {
                    setSavedSuccessfullyMessage('');
                }, 5000);
            }
        });

        // Add to playlist
        addToPlaylist(playlistTitle);
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
