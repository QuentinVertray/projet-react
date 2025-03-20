// src/services/api.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL, credentials: 'include' }),
    tagTypes: ['Pastry', 'User'],
    endpoints: (builder) => ({
        getPastries: builder.query({
            query: () => 'game/pastries',
            providesTags: ['Pastry'],
        }),
        winPastries: builder.mutation({
            query: (quantity) => ({
                url: `game/win-pastries/${quantity}`,
                method: 'GET',
            }),
            invalidatesTags: ['Pastry'],
        }),
        login: builder.mutation({
            query: (credentials) => ({
                url: 'login',
                method: 'POST',
                body: credentials,
            }),
        }),
        addPastry: builder.mutation({
            query: (pastry) => ({
                url: 'pastry',
                method: 'POST',
                body: pastry,
                credentials: 'include'
            }),
            invalidatesTags: ['Pastry']
        }),
        updatePastry: builder.mutation({
            query: ({ id, ...pastry }) => ({
                url: `pastry/${id}`,
                method: 'PUT',
                body: pastry,
                credentials: 'include'
            }),
            invalidatesTags: ['Pastry']
        }),
        deletePastry: builder.mutation({
            query: (id) => ({
                url: `pastry/${id}`,
                method: 'DELETE',
                credentials: 'include'
            }),
            invalidatesTags: ['Pastry']
        }),
    }),
});

export const {
    useGetPastriesQuery,
    useWinPastriesMutation,
    useLoginMutation,
    useAddPastryMutation,
    useUpdatePastryMutation,
    useDeletePastryMutation
} = apiSlice;
