import React from 'react';
import Tracklist from '../components/Tracklist.jsx';

export default function SearchResults({ searchData, addSearchResultToPlaylist }) {
    return (
        <div>
            <h2>Search Results</h2>
            <Tracklist searchData={searchData} addSearchResultToPlaylist={addSearchResultToPlaylist} />
        </div>
    );
}
