// Obtain userId
const obtainUserId = async () => {
    let accessToken = sessionStorage.getItem('access_token');
    const urlToFetch = 'https://api.spotify.com/v1/me';

    try {
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
    } catch(error) {
        console.error('Error during API call: ', error);
        return null;
    }    
};


// Create playlist
const createPlaylist = async () => {
    let accessToken = sessionStorage.getItem('access_token');
    const userId = obtainUserId();
    const urlToFetch = `https://api.spotify.com/v1/users/${userId}/playlists`;

    try {
        // Check for token expiration before making the API call
        handleReauthorization();

        const response = await fetch(urlToFetch, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + accessToken,
                'Content-Type': 'application/json',
            },
            name: playlistTitle,
            description: 'New playlist',
            public: false,
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
    } catch(error) {
        console.error('Error during API call: ', error);
        return null;
    }
};


// Add to playlist
const addToPlaylist = async () => {
    const playlistId = createPlaylist();
    const urlToFetch = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;

    try {
        // Check for token expiration before making the API call
        handleReauthorization();

        const response = await fetch(urlToFetch, {
            method: 'POST',
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
        })
    }
    catch(error) {
        console.log(error);
    }
}; 

export { obtainUserId, createPlaylist, addToPlaylist };
