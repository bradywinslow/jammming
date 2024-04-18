import React, { useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react'
import styles from './styles/App.module.css';
import { spotifySearch } from './spotify/httpRequests.js';
import Header from './components/Header.jsx';
import LoginToSpotify from './components/LoginToSpotify.jsx';
import SearchBar from './components/SearchBar.jsx';
import SearchResults from './components/SearchResults.jsx';
import Playlist from './components/Playlist.jsx';

export default function App() {
  const [searchData, setSearchData] = useState([]);
  const [playlistTracks, setPlaylistTracks] = useState([]);

  const handleSpotifySearch = async (searchInput) => {
    const searchData = await spotifySearch(searchInput);
    setSearchData(searchData);
  };

  // Add track to playlist
  const addSearchResultToPlaylist = (track) => {    
    if (!playlistTracks.some((playlistTrack) => playlistTrack.id === track.id)) {
      setPlaylistTracks((prevTracks) => [...prevTracks, track]);
    }
  };

  // Remove track from playlist
  const removeSearchResultFromPlaylist = (trackId) => {
    setPlaylistTracks((prevTracks) => {
      // Filter out the removed track from the playlist
      const updatedTracks = prevTracks.filter((track) => track.id !== trackId.id);

      // Update playlistTracks state
      return updatedTracks;
    })
  };

  return (
    <ChakraProvider>
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
              <SearchResults results={searchData} onAddResult={addSearchResultToPlaylist} />
              <Playlist tracks={playlistTracks} onRemoveResult={removeSearchResultFromPlaylist} />
            </div>
        </div>
      </main>
    </ChakraProvider>
  );
}
