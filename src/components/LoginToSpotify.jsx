import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';
import { retrieveTokenFromUrlHash, handleLogin } from '../spotify/authorization.js';

export default function LoginToSpotify() {
    useEffect(() => {
        // Check if the hash contains access_token, indicating successful login
        if (window.location.hash.includes('access_token')) {
            // Call authorization function
            retrieveTokenFromUrlHash();
        }
    }, []); // Empty dependency array so effect only runs once

    return (
        <div>
            
            <div>
                <button type='button' onClick={handleLogin}>
                    Login to Spotify<FontAwesomeIcon icon={faSpotify} />
                </button>
            </div>
        </div>
    )
};
