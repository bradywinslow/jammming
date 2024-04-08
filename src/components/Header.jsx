import React from 'react';
import styles from '../styles/Header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';

export default function Header() {
    return (
        <div className={styles.header}>
            <h1 className={styles.title}><FontAwesomeIcon icon={faMusic} className={styles.faMusic} /> Jammming <FontAwesomeIcon icon={faMusic} className={styles.faMusic} /></h1>
        </div>
    )
}
