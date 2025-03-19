// src/pages/Login/index.jsx
import React from 'react';
import LoginForm from '../../components/LoginForm';
import './style.scss';

const Login = () => {
    return (
        <div className="login-page">
            <div className="login-hero">
                <h2>Connexion</h2>
            </div>
            <LoginForm />
        </div>
    );
};

export default Login;
