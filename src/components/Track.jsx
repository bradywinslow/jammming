import React from 'react';
import { tracks } from '../Constants/global.js';
import styles from '../styles/Track.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus } from '@fortawesome/free-solid-svg-icons';

export default function Track() {
    return (
        <div className={styles.trackContainer}>
            {tracks.map((item) => (
                <div key={item.id} className={styles.trackInputs}>
                    <div className={styles.trackSongArtistAndAlbum}>
                        <h3>{item.song}</h3>
                        <p>{`${item.artist} | ${item.album}`}</p>
                    </div>
                    <button className={styles.minusButton}>
                        <FontAwesomeIcon icon={faMinus} />
                    </button>
                </div>
            ))}
        </div>
    )
}
