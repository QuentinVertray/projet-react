// src/components/DiceRoll/index.jsx
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { rollDice, checkCombination } from '../../utils/gameLogic';
import { winPastry, resetLastWonPastry } from '../../store/slices/gameSlice';
import './style.scss';

const DiceRoll = () => {
    const dispatch = useDispatch();
    const pastries = useSelector(state => state.game.pastries);
    const lastWonPastry = useSelector(state => state.game.lastWonPastry);

    const maxAttempts = 3;
    const [attempts, setAttempts] = useState(maxAttempts);
    const [dice, setDice] = useState([1, 1, 1, 1, 1]);
    const [result, setResult] = useState(null);

    // Réinitialiser la dernière pâtisserie gagnée lors du démontage du composant
    useEffect(() => {
        return () => {
            dispatch(resetLastWonPastry());
        };
    }, [dispatch]);

    const handleRoll = () => {
        if (attempts <= 0) return;

        const newDice = rollDice();
        setDice(newDice);
        setAttempts(prev => prev - 1);

        const combination = checkCombination(newDice);

        if (combination) {
            const quantity = combination === 'brelan' ? 1 : 2;

            // Vérifier s'il reste des pâtisseries
            const availablePastries = pastries.filter(p => p.quantity > 0);

            if (availablePastries.length > 0) {
                // Sélectionner une pâtisserie aléatoire parmi celles disponibles
                const randomIndex = Math.floor(Math.random() * availablePastries.length);
                const selectedPastry = availablePastries[randomIndex];

                // Mettre à jour le store Redux
                dispatch(winPastry({ pastryId: selectedPastry.id, quantity }));

                setResult(`BRAVO, vous gagnez ${quantity} ${selectedPastry.name} !`);
            } else {
                setResult('Désolé, il n\'y a plus de pâtisseries disponibles !');
            }
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
            {lastWonPastry && (
                <div className="won-pastry">
                    <img
                        src={lastWonPastry.imageUrl || 'https://placehold.co/300x200'}
                        alt={lastWonPastry.name}
                    />
                    <p>Vous avez gagné {lastWonPastry.wonQuantity} {lastWonPastry.name} !</p>
                </div>
            )}
        </div>
    );
};

export default DiceRoll;
