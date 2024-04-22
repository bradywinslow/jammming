import React, { useState } from 'react';
import styles from '../styles/SearchBar.module.css';
import { spotifySearch } from '../spotify/httpRequests.js';
import { useNavigate } from 'react-router-dom';
import LoginToSpotify from './LoginToSpotify.jsx';
// import SearchResults from './SearchResults.jsx';
// import Playlist from './Playlist.jsx';

export default function SearchBar() {
    const [searchData, setSearchData] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [playlistTracks, setPlaylistTracks] = useState([]);
    const navigate = useNavigate();
  
    const handleSpotifySearch = async (searchInput) => {
      const searchResults = await spotifySearch(searchInput);
      setSearchData(searchResults);
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

    const handleInputChange = (e) => {
        setSearchInput(e.target.value);
    };
    
    const data = { searchData: searchData, playlistTracks: playlistTracks, addSearchResultToPlaylist: addSearchResultToPlaylist, removeSearchResultFromPlaylist: removeSearchResultFromPlaylist };
    
    const handleSearch = (e) => {
        if (searchInput) {
            handleSpotifySearch(searchInput);
            setSearchInput('');
            navigate('results', { state: data });
        } else if (searchInput === '') {
            e.preventDefault();
        }
    };

    const handleKeyDown = (e) => {        
        if (e.key === 'Enter' && searchInput) {
            e.preventDefault();
            handleSpotifySearch(searchInput);
            setSearchInput('');
            navigate('results', { state: data });
        } else if (e.key === 'Enter' && searchInput === '') {
            e.preventDefault();
        }
    };

    return (
        <search className={styles.searchDiv}>
            <LoginToSpotify />
            <form className={styles.searchContainer} onKeyDown={handleKeyDown}>
                <input
                    className={styles.searchInput}
                    type='text'
                    id='searchBar'
                    autoComplete='off'
                    value={searchInput}
                    onChange={handleInputChange}
                ></input>
                <input
                    className={styles.searchButton}
                    type='button'
                    id='searchButton'
                    value='Search'
                    onClick={handleSearch}
                ></input>
            </form>
            { /* <SearchResults results={searchData} onAddResult={addSearchResultToPlaylist} /> */ }
            { /* <Playlist tracks={playlistTracks} onRemoveResult={removeSearchResultFromPlaylist} /> */}
        </search>
    )
}
