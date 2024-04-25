import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
    const navigate = useNavigate();

    function navigateToHomePage() {
        navigate('/');
    }
    
    return (
        <>
            <div>404 Not Found</div>
            <div>
                <button onClick={navigateToHomePage}>Home Page</button>
            </div>
        </>
    )
}
