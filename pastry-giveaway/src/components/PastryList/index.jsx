// src/components/PastryList/index.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import './style.scss';

const PastryList = () => {
    const pastries = useSelector(state => state.game.pastries);

    return (
        <div className="pastry-list">
            {pastries && pastries.length > 0 ? (
                pastries.map((pastry) => (
                    <div key={pastry.id} className="pastry-item">
                        <img
                            src={pastry.imageUrl || 'https://placehold.co/300x200'}
                            alt={pastry.name}
                        />
                        <h3>{pastry.name}</h3>
                        <p>Quantité : {pastry.quantity}</p>
                    </div>
                ))
            ) : (
                <div>Aucune pâtisserie disponible</div>
            )}
        </div>
    );
};

export default PastryList;