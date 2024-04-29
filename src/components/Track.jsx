import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus } from '@fortawesome/free-solid-svg-icons';

export default function Track({ playlistTracks, removeSearchResultFromPlaylist }) {    
    return (
        <div>
            {playlistTracks.map((item) => (
                <div key={item.id}>
                    <img src={`${item.album.images[2].url}`} alt="album artwork" />
                    <div>
                        <div>
                            <h3>{item.name}</h3>
                            <p>{`${item.artists[0].name} | ${item.album.name}`}</p>
                        </div>
                        <button onClick={() => removeSearchResultFromPlaylist(item)}>
                            <FontAwesomeIcon icon={faMinus} />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}
