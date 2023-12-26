import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/Playlist.module.css';
import Track from '../components/Track.jsx';

export default function Playlist({ tracks, onRemoveResult }) {
    const [playlistTitle, setPlaylistTitle] = useState('');
    const [token, setToken] = useState('');
    const [userId, setUserId] = useState({});
    const [data, setData] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (localStorage.getItem('access_token')) {
            setToken(localStorage.getItem('access_token'));
        }
    }, []);

    const handlePlaylistTitleChange = (e) => {
        setPlaylistTitle(e.target.value);
        setErrorMessage('');
    };

    const handleSavePlaylistToSpotify = () => {
        if (!playlistTitle) {
            setErrorMessage('Please add a playlist name before saving');
            return;
        }
    
        axios
            .get('https://api.spotify.com/v1/me', {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            })
            .then((response) => {
                const userId = response.data.id;
                setUserId(userId);
            })
            .catch((error) => {
                console.log(error);
            })
        
        axios
            .post(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                headers: {
                    Authorization: 'Bearer ' + token,
                    'Content-Type': 'application/json',
            },
                name: playlistTitle,
                description: 'New playlist',
                public: false,
            })
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
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
                />
            </form>
            {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
            <Track tracks={tracks} onRemoveResult={onRemoveResult} />
            <form>
                <button className={styles.saveToSpotifyButton} type='submit' onClick={handleSavePlaylistToSpotify}>
                    Save Playlist
                </button>
            </form>

            {/* Display success message if data is available */}
            {data && (
                <div className={styles.successMessage}>
                    {playlistTitle} saved successfully! Playlist ID: {data.id}
                </div>
            )}
        </div>
    )
}
