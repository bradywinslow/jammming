import React, { useState } from 'react';
import { addToPlaylist } from '../spotify/httpRequests.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus } from '@fortawesome/free-solid-svg-icons';

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
                    placeholder='Give playlist a name'
                    autoComplete='off'
                />
            </form>
            
            {submissionErrorMessage && <p>{submissionErrorMessage}</p>}
            {/* Display success message if playlist saved successfully */}
            {savedSuccessfullyMessage && <p>{savedSuccessfullyMessage}</p>}
            
            {playlistTracks.map((item) => (
                <div key={item.id}>
                    <img src={`${item.album.images[2].url}`} alt="album artwork" />
                    <div>
                        <div>
                            <h3>{item.name}</h3>
                            <p>{`${item.artists[0].name} | ${item.album.name}`}</p>
                        </div>
                        <button onClick={() => removeSearchResultFromPlaylist(item)}>
                            <FontAwesomeIcon icon={faMinus} />
                        </button>
                    </div>
                </div>
            ))}
            
            <form>
                <button type='button' onClick={handleSavePlaylistToSpotify}>
                    Save Playlist
                </button>
            </form>
        </div>
    )
}
