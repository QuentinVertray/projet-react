// src/components/PastryList/index.jsx
import React from 'react';
import { useGetPastriesQuery } from '../../services/api';
import './style.scss';

const PastryList = () => {
    const { data: pastries, error, isLoading } = useGetPastriesQuery();

    if (isLoading) return <div>Chargement des pâtisseries...</div>;
    if (error) return <div>Erreur lors du chargement des pâtisseries</div>;

    return (
        <div className="pastry-list">
            {pastries && pastries.length > 0 ? (
                pastries.map((pastry) => (
                    <div key={pastry.id} className="pastry-item">
                        <img
                            src={pastry.imageUrl || 'https://via.placeholder.com/150'}
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
