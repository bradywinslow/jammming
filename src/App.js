import React, { useState, useEffect } from 'react';
import styles from './styles/App.module.css';
import Header from './components/Header.jsx';
import LoginToSpotify from './components/LoginToSpotify.jsx';
import SearchBar from './components/SearchBar.jsx';
import SearchResults from './components/SearchResults.jsx';
import Playlist from './components/Playlist.jsx';

const TRACKLIST_ENDPOINT = 'https://api.spotify.com/v1/search';

export default function App() {
  const [accessToken, setAccessToken] = useState('');
  const [data, setData] = useState([]);
  const [playlistTracks, setPlaylistTracks] = useState([]);
  
  useEffect(() => {
    if (localStorage.getItem('access_token')) {
      setAccessToken(localStorage.getItem('access_token'));
    }
  }, []);

  const handleSpotifySearch = async (searchInput) => {
    const urlToFetch = `${TRACKLIST_ENDPOINT}?q=${encodeURIComponent(searchInput)}&type=track%2Calbum%2Cartist`;

    try {
      const response = await fetch(urlToFetch, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setData(data.tracks.items);
        // console.log(data);
      } else {
        console.error('Search request failed.');
        return null;
      }
    } catch(error) {
      console.error('Error during API call: ', error);
    }
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
              <SearchBar onSearch={handleSpotifySearch} />
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
