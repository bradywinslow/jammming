import React from 'react';
import { tracklist } from '../Constants/global.js';
import styles from '../styles/Tracklist.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export default function Tracklist() {
    return (
        <div className={styles.tracklistContainer}>
            {tracklist.map((item) => (
                <div key={item.id} className={styles.tracklistInputs}>
                    <div className={styles.tracklistSongArtistAndAlbum}>
                        <h3>{item.song}</h3>
                        <p>{`${item.artist} | ${item.album}`}</p>
                    </div>
                    <button className={styles.plusButton}>
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                </div>
            ))}
        </div>
    )
}
