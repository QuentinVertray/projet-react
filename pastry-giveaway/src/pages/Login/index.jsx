// src/pages/Login/index.jsx
import React, { useState } from 'react';
import './style.scss';

const Login = () => {
    const [email, setEmail] = useState('alice@alice.fr');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logique de connexion (appel API, etc.)
        console.log('Connexion avec', email, password);
    };

    return (
        <div className="login-page">
            <div className="login-hero">
                <h2>Connexion</h2>
            </div>

            {/* Conteneur du formulaire */}
            <div className="form-container">
                <h3>Identifiez-vous</h3>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Votre e-mail :</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="alice@alice.fr"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label htmlFor="password">Votre mot de passe :</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="********"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
