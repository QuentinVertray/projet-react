// src/pages/Login/index.jsx
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import LoginForm from '../../components/LoginForm';
import './style.scss';

const Login = () => {
    const { isAuthenticated } = useSelector(state => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/admin');
        }
    }, [isAuthenticated, navigate]);

    return (
        <div className="login-container">
            <LoginForm />
        </div>
    );
};

export default Login;
