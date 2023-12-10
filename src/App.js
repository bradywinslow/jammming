import React, { useState } from 'react';
import styles from './styles/App.module.css';
import { tracklist } from './Constants/global.js';
import Header from './components/Header.jsx';
import SearchBar from './components/SearchBar.jsx';
import SearchResults from './components/SearchResults.jsx';
import Playlist from './components/Playlist.jsx';

export default function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistTracks, setPlaylistTracks] = useState([]);

  const handleSearch = (query) => {
      const filteredResults = tracklist.filter((item) => 
      item.song.toLowerCase().includes(query.toLowerCase()) ||
      item.artist.toLowerCase().includes(query.toLowerCase()) ||
      item.album.toLowerCase().includes(query.toLowerCase())        
      );
      setSearchResults(filteredResults);
  };
  
  const addSearchResultToPlaylist = (track) => {
    if (!playlistTracks.some((playlistTracks) => playlistTracks.id === track.id)) {
      setPlaylistTracks((prevTracks) => [...prevTracks, track]);
    }
  };

  const removeSearchResultFromPlaylist = (trackId) => {
      setPlaylistTracks((prevTracks) => prevTracks.filter((track) => track.id !== trackId.id));
  };

  return (
    <body>
      <header>
        <Header />
      </header>
    
      <main>
        <div className={styles.main}>
            <div className={styles.searchBar}>
                <SearchBar onSearch={handleSearch}/>
            </div>
            <div className={styles.resultsAndPlaylist}>
                <SearchResults results={searchResults} onAddResult={addSearchResultToPlaylist} />
                <Playlist tracks={playlistTracks} onRemoveResult={removeSearchResultFromPlaylist} />
            </div>
        </div>
      </main>
    </body>
  );
}
