// src/components/DiceRoll/index.jsx
import React, { useState } from 'react';
import { rollDice, checkCombination } from '../../utils/gameLogic';
import './style.scss';

const DiceRoll = () => {
    const maxAttempts = 3;
    const [attempts, setAttempts] = useState(maxAttempts);
    const [dice, setDice] = useState([1, 1, 1, 1, 1]);
    const [result, setResult] = useState(null);

    const handleRoll = () => {
        if (attempts <= 0) return;
        const newDice = rollDice();
        setDice(newDice);
        setAttempts(prev => prev - 1);
        const combination = checkCombination(newDice);
        if (combination === 'brelan') {
            setResult('BRAVO, vous gagnez 1 pâtisserie !');
        } else if (combination === 'carre') {
            setResult('BRAVO, vous gagnez 2 pâtisseries !');
        } else {
            setResult('PERDU, essayez encore.');
        }
    };

    return (
        <div className="dice-roll">
            <div className="dice-container">
                {dice.map((die, index) => (
                    <div key={index} className="die">{die}</div>
                ))}
            </div>
            <p>Nombre d'essais restants : {attempts}</p>
            <button onClick={handleRoll} disabled={attempts === 0}>
                Lancer les dés
            </button>
            {result && <p className="result">{result}</p>}
        </div>
    );
};

export default DiceRoll;