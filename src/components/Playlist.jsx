import React, { useState } from 'react';
import Track from '../components/Track.jsx';
import { addToPlaylist } from '../spotify/httpRequests.js';

export default function Playlist({ playlistTracks, removeSearchResultFromPlaylist }) {
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
        if (!playlistTitle && (playlistTracks.length === 0)) {
            setSubmissionErrorMessage('Please add tracks and playlist name before saving');
            
            // Clear the error message after 5 seconds
            setTimeout(() => {
                setSubmissionErrorMessage('');
            }, 5000);

            return;
        };
        
        if (playlistTracks.length === 0) {
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
        const tracksInfo = addToPlaylist(playlistTitle, playlistTracks);
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
        <div>
            <form>
                <input
                    type='text'
                    id='playlistInput'
                    value={playlistTitle}
                    onChange={handlePlaylistTitleChange}
                    onKeyDown={handleKeyDown}
                    required
                    placeholder='Give your playlist a name'
                    autoComplete='off'
                />
            </form>
            {submissionErrorMessage && <p>{submissionErrorMessage}</p>}
            {/* Display success message if playlist saved successfully */}
            {savedSuccessfullyMessage && <p>{savedSuccessfullyMessage}</p>}
            <Track playlistTracks={playlistTracks} removeSearchResultFromPlaylist={removeSearchResultFromPlaylist} />
            <form>
                <button type='button' onClick={handleSavePlaylistToSpotify}>
                    Save Playlist
                </button>
            </form>
        </div>
    )
}
