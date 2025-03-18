// src/services/api.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL, credentials: 'include' }),
    tagTypes: ['Pastry'],
    endpoints: (builder) => ({
        getPastries: builder.query({
            query: () => 'game/pastries',
            providesTags: ['Pastry'],
        }),
        login: builder.mutation({
            query: (credentials) => ({
                url: 'login',
                method: 'POST',
                body: credentials,
                credentials: 'include',
            }),
        }),
    }),
});

export const { useGetPastriesQuery, useLoginMutation } = api;
