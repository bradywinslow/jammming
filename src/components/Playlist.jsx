import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/Playlist.module.css';
import Track from '../components/Track.jsx';

export default function Playlist({ tracks, onRemoveResult }) {
    const [playlistTitle, setPlaylistTitle] = useState('');
    const [token, setToken] = useState('');
    const [userId, setUserId] = useState({});
    const [playlistId, setPlaylistId] = useState({});
    const [noTracksAddedErrorMessage, setNoTracksAddedErrorMessage] = useState('');
    const [noPlaylistNameErrorMessage, setNoPlaylistNameErrorMessage] = useState('');
    const [savedSuccessfullyMessage, setSavedSuccessfullyMessage] = useState('');

    useEffect(() => {
        if (localStorage.getItem('access_token')) {
            setToken(localStorage.getItem('access_token'));
        }
    }, []);

    const handlePlaylistTitleChange = (e) => {
        setPlaylistTitle(e.target.value);
        setNoPlaylistNameErrorMessage('');
    };

    const handleSavePlaylistToSpotify = () => {
        if (tracks.length === 0) {
            setNoTracksAddedErrorMessage('Please add tracks to the playlist before saving');
       
            // Clear the error message after 5 seconds
            setTimeout(() => {
                setNoTracksAddedErrorMessage('');
            }, 5000);

            return;
        };
        
        if (!playlistTitle) {
            setNoPlaylistNameErrorMessage('Please add a playlist name before saving');
            
            // Clear the error message after 5 seconds
            setTimeout(() => {
                setNoPlaylistNameErrorMessage('');
            }, 5000);

            return;
        };
        
        // Obtain userId
        axios
            .get('https://api.spotify.com/v1/me', {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            })
            .then((response) => {
                const userId = response.id;
                setUserId(userId);
            })
            .catch((error) => {
                console.log(error);
            })
        
        // Create playlist
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
                const playlistId = response.id;
                setPlaylistId(playlistId);
            })
            .catch((error) => {
                console.log(error);
            });
        
        // Obtain playlist - Don't think this is necessary
        /* axios
            .get(`https://api.spotify.com/v1/playlists/${playlistId}`, {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            }); */

        // Add to playlist
        axios
            .post(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
                headers: {
                    Authorization: 'Bearer ' + token,
                    'Content-Type': 'application/json',
            },
                uris: [
                    `spotify:track:${tracks.map((item) => item.uris)}`
                ]
            })
            .then(() => {
                    setSavedSuccessfullyMessage(`${playlistTitle} saved successfully!`); // this isn't right; need to fix this
                    setTimeout(() => {
                        setSavedSuccessfullyMessage('');
                    }, 5000);

                    return;
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
            {noTracksAddedErrorMessage && <p className={styles.noTracksAddedErrorMessage}>{noTracksAddedErrorMessage}</p>}
            {noPlaylistNameErrorMessage && <p className={styles.noPlaylistNameErrorMessage}>{noPlaylistNameErrorMessage}</p>}
            <Track tracks={tracks} onRemoveResult={onRemoveResult} />
            <form>
                <button className={styles.saveToSpotifyButton} type='submit' onClick={handleSavePlaylistToSpotify}>
                    Save Playlist
                </button>
            </form>

            {/* Display success message if playlist saved successfully */}
            {savedSuccessfullyMessage}
        </div>
    )
}
