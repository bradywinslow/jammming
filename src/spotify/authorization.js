// Spotify application details
const stateKey = 'spotify_auth_state';
const clientId = 'c73c8dd43ae64b7c82a1e3b355cda443';
const scope = 'playlist-modify-private playlist-modify-public user-read-private user-read-email';

function getRedirectUri() {
    const origin = window.origin;
    if (origin.includes('localhost')) {
        return 'http://localhost:8080';
    }
    return origin;
}

// Function to generate a random string
function generateRandomString(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

// Function to build authorization URL using the generated state
function generateAuthorizationUrl(state) {
    let url = new URL('https://accounts.spotify.com/authorize');
    const searchParams = url.searchParams;
    searchParams.append('client_id', clientId);
    searchParams.append('response_type', 'token');
    searchParams.append('redirect_uri', getRedirectUri());
    if (state) {
        searchParams.append('state', state);
    }
    searchParams.append('scope', scope);
    return url;
}

// Function to handle login
const handleLogin = (e) => {    
    e.preventDefault();

    //Set the state in localStorage
    const state = generateRandomString(16);
    localStorage.setItem(stateKey, state);

    // Build the authorization URL using the generated state
    const url = generateAuthorizationUrl(state);

    // Redirect the user to the Spotify auhorization page
    window.location.href = url;
};

// Implicit Grant Flow authorization
const retrieveTokenFromUrlHash = () => {
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

    // Extract accessToken, expiresIn, and tokenType
    const accessToken = hash.substring(1).split('&').find(elem => elem.startsWith('access_token')).split('=')[1];
    const expiresIn = Number(hash.substring(1).split('&').find(elem => elem.startsWith('expires_in')).split('=')[1]);
    const tokenType = hash.substring(1).split('&').find(elem => elem.startsWith('token_type')).split('=')[1];

    // Determine expirationTime for when the accessToken will expire
    const now = new Date().getTime() / 1000; // Current time in seconds
    const expirationTime = now + expiresIn;

    // Use localStorage to temporarily store accessToken, expirationTime, and tokenType
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('expiration_time', expirationTime);
    localStorage.setItem('token_type', tokenType);

    window.location.hash = '';
};

// Checks if token has expired. If it has, user will be asked to reauthenticate
const handleReauthorization = () => {
    const expirationTime = localStorage.getItem('expiration_time');
    const accessToken = localStorage.getItem('access_token');

    // Check if access token is present and has expired
    const expired = accessToken && expirationTime && new Date().getTime() / 1000 > expirationTime;

    if (expired) {
        // Set the state in localStorage
        const state = generateRandomString(16);
        localStorage.setItem(stateKey, state);
        
        // Build the authorization URL using the generated state
        const url = generateAuthorizationUrl(state);
        
        // Store the authorization URL in localStorage
        // localStorage.setItem('reauth_url', url);

        // Redirect the user to the Spotify authorization URL
        window.location = url;
    }
};

export { retrieveTokenFromUrlHash, handleLogin, handleReauthorization };
