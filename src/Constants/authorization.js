/* 
Questions for Dan:
1. Need help with issue that's being caused when state is removed from localStorage after authentication
2. Authentication page not opening up correctly --> need to logout of Spotify and then click Login to Spotify button to see error
*/

// Spotify application details
const stateKey = 'spotify_auth_state';
const CLIENT_ID = 'c73c8dd43ae64b7c82a1e3b355cda443';
const REDIRECT_URI = 'http://localhost:8080/';
const scope = 'playlist-modify-private playlist-modify-public user-read-private user-read-email';

// Function to generate a random string
function generateRandomString(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

// Function to set the state in localStorage
function setStateInStorage(stateKey) {
    const state = generateRandomString(16);
    localStorage.setItem(stateKey, state);
};

// Function to handle login
const handleLogin = (e) => {    
    e.preventDefault();

    //Set the state in localStorage
    setStateInStorage(stateKey);

    // Get the generated state from localStorage
    const storedState = localStorage.getItem(stateKey);

    // Build the authorization URL using the generated state
    let url = 'https://accounts.spotify.com/authorize';
    url += '?client_id=' + encodeURIComponent(CLIENT_ID);
    url += '&response_type=token';
    url += '&redirect_uri=' + encodeURIComponent(REDIRECT_URI);
    url += '&state=' + encodeURIComponent(storedState);
    url += '&scope=' + encodeURIComponent(scope);

    // Redirect the user to the Spotify auhorization page
    window.location.href = url;
};

// Implicit Grant Flow authorization
const authorization = () => {
    const hash = window.location.hash;
    const storedState = localStorage.getItem(stateKey);

    // Handle errors or user denial
    if (!hash || !hash.includes('access_token') || !hash.includes('expires_in') || !hash.includes('token_type')) {
        console.error('Authorization error or user denied access.');
        return;
    }

    // Validate state to prevent CSRF attacks
    const stateInHash = hash.substring(1).split('&').find(elem => elem.startsWith('state')).split('=')[1];

    if (stateInHash !== storedState) {
        console.error('State parameter does not match.');
        return;
    }

    // Extract accessToken, expires_in, and token_type
    const accessToken = hash.substring(1).split('&').find(elem => elem.startsWith('access_token')).split('=')[1];
    const expires_in = Number(hash.substring(1).split('&').find(elem => elem.startsWith('expires_in')).split('=')[1]);
    const token_type = hash.substring(1).split('&').find(elem => elem.startsWith('token_type')).split('=')[1];

    // Determine expirationTime for when the accessToken will expire
    const now = new Date().getTime() / 1000; // Current time in seconds
    const expirationTime = now + expires_in;

    // Use localStorage to temporarily store accessToken, expirationTime, and token_type
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('expiration_time', expirationTime);
    localStorage.setItem('token_type', token_type);

    // Remove the state from localStorage only after successful authorization
    /* if (stateInHash === storedState) {
        localStorage.removeItem(stateKey);
    } */ 

    // Removing the state is a security measure to help prevent CSRF attacks
    // Removing the state from the localStorage is causing an issue. Need to ask Dan about this
};

// Checks if token has expired. If it has, user will be asked to reauthenticate
const handleReauthorization = () => {
    const expirationTime = localStorage.getItem('expiration_time');
    const accessToken = localStorage.getItem('access_token');

    // Check if access token is present and has expired
    const expired = accessToken && expirationTime && new Date().getTime() / 1000 > expirationTime;

    if (expired) {
        // Define the Spotify authorization URL
        let url = 'https://accounts.spotify.com/authorize';
        url += '?client_id=' + encodeURIComponent(CLIENT_ID);
        url += '&response_type=token';
        url += '&redirect_uri=' + encodeURIComponent(REDIRECT_URI);
        url += '&scope=' + encodeURIComponent(scope);
        
        // Store the authorization URL in localStorage
        localStorage.setItem('reauth_url', url);

        // Redirect the user to the Spotify authorization URL
        window.location = url;
    }
};

export { authorization, handleLogin, handleReauthorization };
