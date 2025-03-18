// src/pages/Home/index.jsx
import React from 'react';
import { Link } from 'react-router';
import PastryList from '../../components/PastryList';
import './style.scss';

const Home = () => {
    return (
        <div className="home">
            {/* Section Hero */}
            <section className="home-hero">
                <h1>Bienvenue sur le jeu de la pâtisserie !</h1>
                <p>Testez votre chance et remportez de délicieuses pâtisseries !</p>
                <Link to="/play" className="play-button">Jouer</Link>
            </section>

            {/* Section Liste des Pâtisseries */}
            <section className="home-pastries">
                <h2>Pâtisseries restantes :</h2>
                <PastryList />
            </section>
        </div>
    );
};

export default Home;

