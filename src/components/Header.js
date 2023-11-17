import React from 'react';
import styles from '../styles/Header.module.css';

export default function Header() {
    return (
        <header className={styles.header}>
            <h1>Ja<span className={styles.mmm}>mmm</span>ing</h1>
        </header>
    )
}
