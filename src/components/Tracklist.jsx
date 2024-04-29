import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export default function Tracklist({ searchData, addSearchResultToPlaylist }) {
    return (
        <div>
            {searchData.map((result) => (
                <div key={result.id}>
                    <img src={`${result.album.images[2].url}`} alt="album artwork" />
                    <div>
                        <div>
                            <h3>{result.name}</h3>
                            <p>{`${result.artists[0].name} | ${result.album.name}`}</p>
                        </div>
                        <button onClick={() => addSearchResultToPlaylist(result)}>
                            <FontAwesomeIcon icon={faPlus} />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
