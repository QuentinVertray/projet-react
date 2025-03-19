// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import { api } from '../services/api';
import authReducer from './slices/authSlice';
import gameReducer from './slices/gameSlice';

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        auth: authReducer,
        game: gameReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
});
