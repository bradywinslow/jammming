import { handleReauthorization } from "./authorization.js";

// Search Spotify
const spotifySearch = async (searchInput) => {
    let accessToken = localStorage.getItem('access_token');
    const TRACKLIST_ENDPOINT = 'https://api.spotify.com/v1/search';
    const urlToFetch = `${TRACKLIST_ENDPOINT}?q=${encodeURIComponent(searchInput)}&type=track%2Calbum%2Cartist`;

    try {
        /* // Alert user to login if they haven't already
        if (accessToken === undefined) {
            alert('Please login before searching');
        } */

        // Check for token expiration before making the API call
        handleReauthorization();
      
        const response = await fetch(urlToFetch, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + accessToken,
            },
        });
      
        if (response.ok) {
            const data = await response.json();
            const searchData = data.tracks.items;
            return searchData;
        } else {
            console.error('Search request failed.');
            return null;
        }
    } catch(error) {
        console.error('Error during API call: ', error);
    }
};


// Obtain userId
const obtainUserId = async () => {
    try {
        let accessToken = localStorage.getItem('access_token');
        const urlToFetch = 'https://api.spotify.com/v1/me';

        // Check for token expiration before making the API call
        handleReauthorization();

        const response = await fetch(urlToFetch, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + accessToken
            }
        });
        
        if (response.ok) {
            const data = await response.json();
            const userId = data.id;
            return userId;
        } else {
            // Handle non-OK response
            console.error('Failed to obtain user ID: ', response.statusText);
            return null;
        }
    } catch (error) {
        console.error('Error during API call: ', error);
        return null;
    }    
};


// Create playlist
const createPlaylist = async (playlistTitle) => {
    try {
        let accessToken = localStorage.getItem('access_token');
        const userId = await obtainUserId();
    
        // Check for token expiration before making the API call
        handleReauthorization();

        const urlToFetch = `https://api.spotify.com/v1/users/${userId}/playlists`;

        const response = await fetch(urlToFetch, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + accessToken,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: playlistTitle,
                description: 'New playlist',
                public: false,
            }),
        });
        
        if (response.ok) {
            const data = await response.json();
            const playlistId = data.id;
            return playlistId;
        } else {
            // Handle non-OK response
            console.error('Failed to create playlist: ', response.statusText);
            return null;
        }
    } catch (error) {
        console.error('Error during API call: ', error);
        return null;
    }
};


// Add to playlist
const addToPlaylist = async (playlistTitle, tracks) => {
    try {
        let accessToken = localStorage.getItem('access_token');
        const playlistId = await createPlaylist(playlistTitle);
        const urlToFetch = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;

        const response = await fetch(urlToFetch, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + accessToken,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                uris: tracks.map(t => t.uri),
            }),
        });

        if (response.ok) {
            const data = await response.json();
            const tracksInfo = data.id;
            return tracksInfo;

        } else {
            console.error('Failed to add tracks to playlist: ', response.statusText);
        }
    } catch (error) {
        console.error('Error during API call: ', error);
    }
};

export { spotifySearch, obtainUserId, createPlaylist, addToPlaylist };
