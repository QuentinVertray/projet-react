// src/components/LoginForm/index.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../../services/api';
import { loginSuccess } from '../../store/slices/authSlice';
import './style.scss';

const LoginForm = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('alice@alice.fr');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Utilisation du hook RTK Query
    const [login, { isLoading, isError, error }] = useLoginMutation();

    // Réinitialiser le message d'erreur lorsque l'utilisateur modifie les champs
    useEffect(() => {
        if (errorMessage) setErrorMessage('');
    }, [email, password]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Appel à l'API d'authentification
            const userData = await login({ email, password }).unwrap();
            // Mise à jour du state global
            dispatch(loginSuccess(userData));
            console.log('Connexion réussie avec', email);
        } catch (err) {
            // Gestion des erreurs
            console.error('Échec de connexion:', err);
            setErrorMessage(
                err.data?.message ||
                'Identifiants incorrects. Veuillez réessayer.'
            );
        }
    };

    return (
        <div className="form-container">
            <h3>Identifiez-vous</h3>
            {errorMessage && (
                <div className="error-message">{errorMessage}</div>
            )}
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Votre e-mail :</label>
                <input
                    type="email"
                    id="email"
                    placeholder="alice@alice.fr"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                />

                <label htmlFor="password">Votre mot de passe :</label>
                <input
                    type="password"
                    id="password"
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                />

                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Connexion...' : 'Login'}
                </button>
            </form>
        </div>
    );
};

export default LoginForm;
