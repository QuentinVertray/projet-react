// src/utils/gameLogic.js
export const rollDice = () => {
    return Array.from({ length: 5 }, () => Math.floor(Math.random() * 6) + 1);
};

export const checkCombination = (dice) => {
    const counts = {};
    dice.forEach((die) => {
        counts[die] = (counts[die] || 0) + 1;
    });
    for (let num in counts) {
        if (counts[num] >= 4) return 'carre';
        if (counts[num] === 3) return 'brelan';
    }
    return null;
};
