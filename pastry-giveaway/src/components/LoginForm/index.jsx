// src/components/LoginForm/index.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../../services/api';
import { loginSuccess } from '../../store/slices/authSlice';
import './style.scss';

const LoginForm = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('alice@alice.fr');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const [login, { isLoading }] = useLoginMutation();

    useEffect(() => {
        if (errorMessage) setErrorMessage('');
    }, [email, password, errorMessage]);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        try {
            const userData = await login({ email, password }).unwrap();
            dispatch(loginSuccess(userData));
            console.log('Connexion réussie avec', email);
        } catch (err) {
            console.error('Échec de connexion:', err);
            setErrorMessage(err.data?.message || 'Identifiants incorrects. Veuillez réessayer.');
        }
    }, [dispatch, email, login, password]);

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
