import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApiSlice = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/',
        credentials: 'include' // Important pour la gestion des cookies JWT
    }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: '/login',
                method: 'POST',
                body: credentials,
                credentials: 'include' // Pour gérer les cookies
            }),
        }),
        logout: builder.query({
            query: () => ({
                url: '/logout',
                method: 'GET',
                credentials: 'include'
            }),
        }),
        checkAuth: builder.query({
            query: () => ({
                url: '/me',
                method: 'GET',
                credentials: 'include'
            }),
        }),
    }),
});

export const {
    useLoginMutation,
    useLazyLogoutQuery,
    useCheckAuthQuery,
} = authApiSlice;
