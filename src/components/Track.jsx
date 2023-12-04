import React from 'react';
import { tracklist } from '../Constants/global.js';
import styles from '../styles/Track.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus } from '@fortawesome/free-solid-svg-icons';

export default function Track() {
    return (
        <div className={styles.trackInput}>
            {tracklist.map((item) => (
                <div className={styles.songArtistAndAlbum}>
                    <h3>{item.song}</h3>
                    <p>{`${item.artist} | ${item.album}`}</p>
                </div>
            ))}
            <button className={styles.minusButton}>
                <FontAwesomeIcon icon={faMinus} />
            </button>
        </div>
    )
}
