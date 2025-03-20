// src/pages/Play/index.jsx
import React, { useState, useCallback } from 'react';
import { useWinPastriesMutation } from '../../services/api';
import dice1 from '../../assets/dice-1.png';
import dice2 from '../../assets/dice-2.png';
import dice3 from '../../assets/dice-3.png';
import dice4 from '../../assets/dice-4.png';
import dice5 from '../../assets/dice-5.png';
import dice6 from '../../assets/dice-6.png';
import './style.scss';

const diceImages = [dice1, dice2, dice3, dice4, dice5, dice6];

const Play = () => {
    const [diceValues, setDiceValues] = useState([1, 2, 3, 4, 5]);
    const [rollsLeft, setRollsLeft] = useState(3);
    const [gameResult, setGameResult] = useState(null);
    const [isRolling, setIsRolling] = useState(false);

    const [winPastries] = useWinPastriesMutation();

    const rollDice = useCallback(() => {
        if (rollsLeft > 0 && !isRolling) {
            setIsRolling(true);
            const animationInterval = setInterval(() => {
                setDiceValues(
                    Array.from({ length: 5 }, () => Math.floor(Math.random() * 6) + 1)
                );
            }, 100);

            setTimeout(async () => {
                clearInterval(animationInterval);
                const newDiceValues = Array.from(
                    { length: 5 },
                    () => Math.floor(Math.random() * 6) + 1
                );
                setDiceValues(newDiceValues);
                await checkResult(newDiceValues);
                setRollsLeft(prev => prev - 1);
                setIsRolling(false);
            }, 1000);
        }
    }, [rollsLeft, isRolling]);

    const checkResult = async (values) => {
        const counts = {};
        values.forEach((value) => {
            counts[value] = (counts[value] || 0) + 1;
        });

        let hasThreeOfAKind = false;
        let hasFourOfAKind = false;

        Object.values(counts).forEach((count) => {
            if (count >= 3) hasThreeOfAKind = true;
            if (count >= 4) hasFourOfAKind = true;
        });

        if (hasFourOfAKind) {
            try {
                const quantityWon = 2;
                const result = await winPastries(quantityWon).unwrap();
                setGameResult({
                    win: true,
                    message: "Félicitations ! Vous avez obtenu un carré et gagné 2 pâtisseries !",
                    pastry: result,
                    wonQuantity: quantityWon,
                });
            } catch (err) {
                console.error(err);
            }
        } else if (hasThreeOfAKind) {
            try {
                const quantityWon = 1;
                const result = await winPastries(quantityWon).unwrap();
                setGameResult({
                    win: true,
                    message: "Bravo ! Vous avez obtenu un brelan et gagné 1 pâtisserie !",
                    pastry: result,
                    wonQuantity: quantityWon,
                });
            } catch (err) {
                console.error(err);
            }
        } else if (rollsLeft === 1) {
            setGameResult({
                win: false,
                message: "Dommage, vous avez perdu.",
            });
        }
    };

    return (
        <div className="play-container">
            <h2>Lancez les dés et tentez de gagner des pâtisseries !</h2>

            <div className="game-rules">
                <h3>Règles du jeu</h3>
                <p>
                    Vous avez droit à 3 lancers. Obtenez un brelan (3 dés identiques) pour
                    gagner 1 pâtisserie ou un carré (4 dés identiques) pour gagner 2 pâtisseries !
                </p>
            </div>

            <div className="dice-container">
                {diceValues.map((value, index) => (
                    <div key={index} className={`dice ${isRolling ? 'rolling' : ''}`}>
                        <img src={diceImages[value - 1]} alt={`Dé avec la valeur ${value}`} />
                    </div>
                ))}
            </div>

            <div className="game-controls">
                <p>Lancers restants : {rollsLeft}</p>
                <button
                    className="roll-button"
                    onClick={rollDice}
                    disabled={rollsLeft === 0 || isRolling || (gameResult && gameResult.win)}
                >
                    {isRolling ? 'Lancement...' : 'Lancer les dés'}
                </button>

                {gameResult && gameResult.win && gameResult.pastry && (
                    <div className="game-result win">
                        <p>{gameResult.message}</p>
                        <p>Votre pâtisserie gagnée : {gameResult.pastry.name}</p>
                        <img
                            src={(gameResult.pastry.image || gameResult.pastry.imageUrl) || 'https://placehold.co/300x200'}
                            alt={gameResult.pastry.name}
                        />
                        <p>Quantité restante : {gameResult.pastry.quantity}</p>
                    </div>
                )}

                {gameResult && !gameResult.win && (
                    <div className="game-result lose">
                        <p>{gameResult.message}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Play;
