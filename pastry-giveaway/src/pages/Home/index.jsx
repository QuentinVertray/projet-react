// src/pages/Home/index.jsx
import React from 'react';
import { Link } from 'react-router';
import { useGetPastriesQuery } from '../../services/api';
import './style.scss';

const Home = () => {
    const { data: pastries, isLoading, isError } = useGetPastriesQuery();

    if (isLoading) return <p>Chargement des pâtisseries...</p>;
    if (isError) return <p>Erreur lors du chargement</p>;

    return (
        <div className="home">
            <section className="home-hero">
                <h1>Bienvenue sur le jeu de la pâtisserie !</h1>
                <p>Testez votre chance et remportez de délicieuses pâtisseries !</p>
                <Link to="/play" className="play-button">Jouer</Link>
            </section>
            <section className="home-pastries">
                <h2>Pâtisseries restantes :</h2>
                {pastries && pastries.length > 0 ? (
                    pastries.map((pastry) => (
                        <div key={pastry.id} className="pastry-item">
                            <img src={pastry.imageUrl || 'https://placehold.co/300x200'} alt={pastry.name} />
                            <h3>{pastry.name}</h3>
                            <p>Quantité : {pastry.quantity}</p>
                        </div>
                    ))
                ) : (
                    <p>Aucune pâtisserie disponible</p>
                )}
            </section>
        </div>
    );
};

export default Home;
