// src/store/slices/gameSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    pastries: [
        { id: 1, name: 'Éclair au chocolat', quantity: 5, imageUrl: 'https://placehold.co/300x200' },
        { id: 2, name: 'Tarte aux fraises', quantity: 3, imageUrl: 'https://placehold.co/300x200' },
        { id: 3, name: 'Macaron à la pistache', quantity: 7, imageUrl: 'https://placehold.co/300x200' }
    ],
    lastWonPastry: null
};

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        winPastry: (state, action) => {
            const { pastryId, quantity } = action.payload;
            // Trouver la pâtisserie
            const pastryIndex = state.pastries.findIndex(p => p.id === pastryId);
            if (pastryIndex !== -1) {
                // Mettre à jour la quantité (en s'assurant qu'elle ne descende pas en dessous de 0)
                const newQuantity = Math.max(0, state.pastries[pastryIndex].quantity - quantity);
                state.pastries[pastryIndex].quantity = newQuantity;
                // Enregistrer la dernière pâtisserie gagnée
                state.lastWonPastry = {
                    ...state.pastries[pastryIndex],
                    wonQuantity: quantity
                };
            }
        },
        resetLastWonPastry: (state) => {
            state.lastWonPastry = null;
        }
    }
});

export const { winPastry, resetLastWonPastry } = gameSlice.actions;
export default gameSlice.reducer;
