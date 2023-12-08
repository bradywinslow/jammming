import React from 'react';
import styles from '../styles/Tracklist.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export default function Tracklist({ results }) {
    return (
        <div className={styles.tracklistContainer}>
            {results.map((result) => (
                <div key={result.id} className={styles.tracklistInputs}>
                    <div className={styles.tracklistSongArtistAndAlbum}>
                        <h3>{result.song}</h3>
                        <p>{`${result.artist} | ${result.album}`}</p>
                    </div>
                    <button className={styles.plusButton}>
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                </div>
            ))}
        </div>
    );
}
