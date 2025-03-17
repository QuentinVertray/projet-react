// src/pages/Home/index.jsx
import React from 'react';
import Navigation from '../../components/Navigation';
import PastryList from '../../components/PastryList';
import './style.scss';

const Home = () => {
    return (
        <div className="home">
            {/* Navigation en haut de la page */}
            <Navigation />

            {/* Section Hero */}
            <section className="home-hero">
                <h1>Bienvenue sur le jeu de la pâtisserie !</h1>
                <p>Testez votre chance et remportez de délicieuses pâtisseries !</p>
                <button className="play-button">Jouer</button>
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

