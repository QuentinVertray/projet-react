// src/components/Navigation/index.jsx
import React from 'react';
import { Link } from 'react-router';
import './style.scss';

const Navigation = () => {
    return (
        <nav className="navigation">
            <ul>
                <li><Link to="/Home">Accueil</Link></li>
                <li><Link to="/Login">Connexion</Link></li>
                <li><Link to="/Contact">Contact</Link></li>
            </ul>
        </nav>
    );
};

export default Navigation;
