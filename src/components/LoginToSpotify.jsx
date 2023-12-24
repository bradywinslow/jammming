import React, { useEffect } from 'react';
import styles from '../styles/LoginToSpotify.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';

const CLIENT_ID = 'c73c8dd43ae64b7c82a1e3b355cda443';
const REDIRECT_URI = 'http://localhost:3000/';

const stateKey = 'spotify_auth_state';

function generateRandomString(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

const state = generateRandomString(16);

localStorage.setItem(stateKey, state);
const scope = 'playlist-modify-private playlist-modify-public user-read-private user-read-email';

let url = 'https://accounts.spotify.com/authorize';
url += '?client_id=' + encodeURIComponent(CLIENT_ID);
url += '&response_type=token';
url += '&redirect_uri=' + encodeURIComponent(REDIRECT_URI);
url += '&state=' + encodeURIComponent(state);
url += '&scope=' + encodeURIComponent(scope);

export default function LoginToSpotify() {

    useEffect(() => {
        const hash = window.location.hash;
        let token = window.localStorage.getItem('access_token');
        let expires_in = window.localStorage.getItem('expires_in');
        let token_type = window.localStorage.getItem('token_type');

        if (!token && hash) {
            token = hash.substring(1).split('&').find(elem => elem.startsWith('access_token')).split('=')[1];
            expires_in = hash.substring(1).split('&').find(elem => elem.startsWith('expires_in')).split('=')[1];
            token_type = hash.substring(1).split('&').find(elem => elem.startsWith('token_type')).split('=')[1];

            localStorage.clear();

            localStorage.setItem('access_token', token);
            localStorage.setItem('expires_in', expires_in);
            localStorage.setItem('token_type', token_type);
        }
    }, [])

    const handleLogin = (e) => {
        e.preventDefault();
        window.location = url;
    };

    return (
        <div className={styles.loginToSpotifyButtonDiv}>
            <form className={styles.loginToSpotifyButtonContainer} onClick={handleLogin}>
                <button
                    className={styles.loginToSpotifyButton}
                    type='submit'
                    formAction={`${url}`}
                >Login to Spotify<FontAwesomeIcon icon={faSpotify} className={styles.faSpotify} /></button>
            </form>
        </div>
    )
}
