// src/pages/Play/index.jsx
import React from 'react';
import DiceRoll from '../../components/DiceRoll';
import './style.scss';

const Play = () => {
    return (
        <div className="play">
            <h1>Jeu de la pâtisserie</h1>
            <DiceRoll />
        </div>
    );
};

export default Play;
