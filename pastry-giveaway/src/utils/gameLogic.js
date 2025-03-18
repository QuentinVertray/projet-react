// src/utils/gameLogic.js
export const rollDice = () => {
    // Génère 5 dés avec des valeurs entre 1 et 6
    return Array.from({ length: 5 }, () => Math.floor(Math.random() * 6) + 1);
};

export const checkCombination = (dice) => {
    // Compte les occurrences de chaque valeur
    const counts = {};
    dice.forEach((die) => {
        counts[die] = (counts[die] || 0) + 1;
    });
    // Si 4 ou 5 dés identiques : carré ; si exactement 3 identiques : brelan
    for (let num in counts) {
        if (counts[num] >= 4) return 'carre';
        if (counts[num] === 3) return 'brelan';
    }
    return null;
};