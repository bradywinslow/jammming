import React from 'react';
import styles from '../styles/Track.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus } from '@fortawesome/free-solid-svg-icons';

export default function Track({ tracks, onRemoveResult }) {    
    return (
        <div className={styles.trackContainer}>
            {tracks.map((item) => (
                <div key={item.id} className={styles.trackInputs}>
                    <div className={styles.trackSongArtistAndAlbum}>
                        <h3>{item.name}</h3>
                        <p>{`${item.artists[0].name} | ${item.album.name}`}</p>
                    </div>
                    <button className={styles.minusButton} onClick={() => onRemoveResult(item)}>
                        <FontAwesomeIcon icon={faMinus} />
                    </button>
                </div>
            ))}
        </div>
    )
}
