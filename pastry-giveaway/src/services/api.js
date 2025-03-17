// src/services/api.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    tagTypes: ['Pastry'],
    endpoints: (builder) => ({
        getPastries: builder.query({
            query: () => 'api/pastries',
            providesTags: ['Pastry'],
        }),
        // Vous pouvez ajouter d'autres endpoints ici
    }),
});

export const { useGetPastriesQuery } = api;
