import React from 'react';
import { tracklist } from '../Constants/global.js';
import styles from '../styles/Track.module.css';

export default function Track() {
    return (
        <div>
            <div className={styles.trackInput}>
                {tracklist.map((item) => (
                    <>
                        <div>
                            <h2>{item.song}</h2>
                        </div>
                        <div>
                            <p>{item.artist}</p>
                            <p>{item.album}</p>
                        </div>
                    </>
                ))}
            </div>
        </div>
    )
}
