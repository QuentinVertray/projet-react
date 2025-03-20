// src/components/Navigation/index.jsx
import React from 'react';
import { NavLink } from 'react-router';
import './style.scss';

const Navigation = () => (
    <nav className="navigation">
        <ul>
            <li><NavLink to="/Home" activeclassname="active">Accueil</NavLink></li>
            <li><NavLink to="/login" activeclassname="active">Connexion</NavLink></li>
            <li><NavLink to="/contact" activeclassname="active">Contact</NavLink></li>
        </ul>
    </nav>
);

export default Navigation;

