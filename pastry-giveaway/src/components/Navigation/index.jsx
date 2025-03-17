// src/components/Navigation/index.jsx
import React from 'react';
import './style.scss';

const Navigation = () => {
    return (
        <nav className="navigation">
            <ul>
                <li><a href="/">Accueil</a></li>
                <li><a href="/login">Connexion</a></li>
                <li><a href="/contact">Contact</a></li>
            </ul>
        </nav>
    );
};

export default Navigation;
