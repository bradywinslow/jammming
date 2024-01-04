import React from 'react';
import styles from './styles/App.module.css';
import Header from './components/Header.jsx';
import LoginToSpotify from './components/LoginToSpotify.jsx';
// import SearchBar from './components/SearchBar.jsx';
// import SearchResults from './components/SearchResults.jsx';
// import Playlist from './components/Playlist.jsx';

export default function App() {
  return (
    <>
      <header>
        <Header />
      </header>
    
      <main>
        <div className={styles.main}>
            <div>
              <LoginToSpotify />
            </div>
            <div className={styles.searchBar}>
                
            </div>
            <div className={styles.resultsAndPlaylist}>
                
            </div>
        </div>
      </main>
    </>
  );
}


/*
import React, { useState, useEffect } from 'react';
import styles from './styles/App.module.css';
import Header from './components/Header.jsx';
import LoginToSpotify from './components/LoginToSpotify.jsx';
import SearchBar from './components/SearchBar.jsx';
import SearchResults from './components/SearchResults.jsx';
import Playlist from './components/Playlist.jsx';
import axios from 'axios';

const TRACKLIST_ENDPOINT = 'https://api.spotify.com/v1/search';

export default function App() {
  // const [searchResults, setSearchResults] = useState([]);
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [token, setToken] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    if (localStorage.getItem('access_token')) {
      setToken(localStorage.getItem('access_token'));
    }
  }, []);

  const handleSpotifySearch = (searchInput) => {
    axios.get(TRACKLIST_ENDPOINT, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
      params: {
        q: searchInput,
        type: 'track' || 'album' || 'artist',
      },
    }).then(response => {
      setData(response.data.tracks.items);
    }).catch((error) => {
      console.log(error);
    });
  };
  
  // Add track to playlist
  const addSearchResultToPlaylist = (track) => {
    if (!playlistTracks.some((playlistTracks) => playlistTracks.id === track.id)) {
      setPlaylistTracks((prevTracks) => [...prevTracks, track]);
    }
  };

  // Remove track from playlist
  const removeSearchResultFromPlaylist = (trackId) => {
      setPlaylistTracks((prevTracks) => prevTracks.filter((track) => track.id !== trackId.id));
  };

  return (
    <>
      <header>
        <Header />
      </header>
    
      <main>
        <div className={styles.main}>
            <div>
              <LoginToSpotify />
            </div>
            <div className={styles.searchBar}>
                <SearchBar onSearch={handleSpotifySearch}/>
            </div>
            <div className={styles.resultsAndPlaylist}>
                <SearchResults results={data} onAddResult={addSearchResultToPlaylist} />
                <Playlist tracks={playlistTracks} onRemoveResult={removeSearchResultFromPlaylist} />
            </div>
        </div>
      </main>
    </>
  );
}
*/
