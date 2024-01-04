import React, { useEffect } from 'react';
import styles from '../styles/LoginToSpotify.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';
import { authorization, handleLogin } from '../Constants/authorization.js';

export default function LoginToSpotify() {
    useEffect(() => {
        // Check if the hash contains access_token, indicating successful login
        if (window.location.hash.includes('access_token')) {
            // Call authorization function
            authorization();
        }
    }, []); // Empty dependency array so effect only runs once

    return (
        <div className={styles.loginToSpotifyButtonDiv}>
            <div className={styles.loginToSpotifyButtonContainer}>
                <button className={styles.loginToSpotifyButton} type='button' onClick={handleLogin}>
                    Login to Spotify<FontAwesomeIcon icon={faSpotify} className={styles.faSpotify} />
                </button>
            </div>
        </div>
    )
};
