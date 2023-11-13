import React from 'react';
import { useState, useEffect } from "react"
import { Link } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Logo from "../assets/speekgeeklogo.png";
import '../css/navbar.css';

export default function Navbar() {
    const [loggedIn, setLoggedIn] = useState(false);
    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            console.log(user);
            if (user) {
                setLoggedIn(true);
                console.log("Logged in ");
            } else {
                setLoggedIn(false);
                console.log("Logged out");
            }
        });
        
        // Cleanup the listener when the component unmounts
        return () => {
            unsubscribe();
        };
    }, []);
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    <img src={Logo} alt="SpeekGeek Logo" />
                </Link>
                <div className="navbar-buttons">
                    <div className="center-buttons">
                        <Link to="/Speaktool/problemset" className="navbar-button behavioral-button">Behavioral Practice</Link>
                        <Link to="/Speaktool/leetcode" className="navbar-button leetcode-button">Technical Practice</Link>
                    </div>
                    {loggedIn === false ? (
                        <Link to="/signup" className="navbar-button login-button">Get Started</Link>
                    ) : (
                        <Link to="/logout" className="navbar-button login-button">Log Out</Link>
                    )}
                </div>

            </div>
        </nav>
    );
};
