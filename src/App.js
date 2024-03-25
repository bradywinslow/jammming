import React, { useState } from 'react';
import styles from './styles/App.module.css';
import { spotifySearch } from './Constants/httpRequests.js';
import { handleReauthorization } from './Constants/authorization.js';
import Header from './components/Header.jsx';
import LoginToSpotify from './components/LoginToSpotify.jsx';
import SearchBar from './components/SearchBar.jsx';
import SearchResults from './components/SearchResults.jsx';
import Playlist from './components/Playlist.jsx';

export default function App() {
  const [searchData, setSearchData] = useState([]);
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [trackUris, setTrackUris] = useState([]);

  const handleSpotifySearch = async (searchInput) => {
    const searchData = await spotifySearch(searchInput);
    setSearchData(searchData);
  };

  // Add track to playlist
  const addSearchResultToPlaylist = (track) => {
    // Check for token expiration before adding track to playlist
    handleReauthorization();
    
    if (!playlistTracks.some((playlistTrack) => playlistTrack.id === track.id)) {
      setPlaylistTracks((prevTracks) => [...prevTracks, track]);

      // Update trackUris with the new track's URI
      setTrackUris((prevTrackUris) => [...prevTrackUris, track.uri]);
    }
  };

  // Remove track from playlist
  const removeSearchResultFromPlaylist = (trackId) => {
    // Check for token expiration before removing track from playlist
    handleReauthorization();
  
    setPlaylistTracks((prevTracks) => {
    // Filter out the removed track from the playlist
    const updatedTracks = prevTracks.filter((track) => track.id !== trackId.id);

    // Update trackUris by filtering out the URI of the removed track
    setTrackUris((prevTrackUris) => prevTrackUris.filter((uri) => uri !== trackId.uri));

    // Update playlistTracks state
    return updatedTracks;
   })
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
              <SearchResults results={searchData} onAddResult={addSearchResultToPlaylist} />
              <Playlist trackUris={trackUris} tracks={playlistTracks} onRemoveResult={removeSearchResultFromPlaylist} />
            </div>
        </div>
      </main>
    </>
  );
}
