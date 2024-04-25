import React from 'react';
import styles from '../styles/Tracklist.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export default function Tracklist({ searchData, addSearchResultToPlaylist }) {
    return (
        <div className={styles.tracklistContainer}>
            {searchData.map((result) => (
                <div key={result.id} className={styles.tracklistInputs}>
                    <img src={`${result.album.images[2].url}`} alt="album artwork" />
                    <div className={styles.tracklistDataAndPlusButton}>
                        <div className={styles.tracklistSongArtistAndAlbum}>
                            <h3>{result.name}</h3>
                            <p>{`${result.artists[0].name} | ${result.album.name}`}</p>
                        </div>
                        <button className={styles.plusButton} onClick={() => addSearchResultToPlaylist(result)}>
                            <FontAwesomeIcon icon={faPlus} />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
