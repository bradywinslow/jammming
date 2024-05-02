import React, { useState } from 'react';
import SearchBar from '../SearchBar.jsx';
import SearchResults from '../SearchResults.jsx';
import Playlist from '../Playlist.jsx';
import { useLocation } from 'react-router-dom';
import { Flex } from '@chakra-ui/react';

export default function CreatePlaylist() {
    const [playlistTracks, setPlaylistTracks] = useState([]);

    const { state } = useLocation();
    const searchData = state;

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
        <Flex alignItems='center' justify='center' flexDirection='column'>
            <SearchBar />
            <SearchResults searchData={searchData} addSearchResultToPlaylist={addSearchResultToPlaylist}/>
            <Playlist playlistTracks={playlistTracks} removeSearchResultFromPlaylist={removeSearchResultFromPlaylist}/>
        </Flex>
    )
}
