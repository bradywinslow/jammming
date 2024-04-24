import React from 'react';
import Header from '../components/Header.jsx';
import { Outlet } from 'react-router-dom';

export default function Root() {
    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}
