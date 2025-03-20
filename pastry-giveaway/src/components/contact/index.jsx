// src/components/contact/index.jsx
import React, { useState } from 'react';
import './style.scss';

const Contact = () => {
    const [formData, setState] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setState({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('sending');
        // Simuler l'envoi d'un email
        setTimeout(() => {
            setStatus('sent');
            setState({
                name: '',
                email: '',
                message: ''
            });
        }, 1000);
    };

    return (
        <div className="contact-container">
            <h2>Contactez-nous</h2>

            <div className="contact-info">
                <h3>Pâtisserie 3WA</h3>
                <p>123 Rue des Gourmandises</p>
                <p>75001 Paris</p>
                <p>Téléphone: 01 23 45 67 89</p>
                <p>Email: contact@patisserie3wa.fr</p>
                <p>Horaires: Du lundi au samedi, de 8h à 19h</p>
            </div>

            <div className="contact-form">
                <h3>Envoyez-nous un message</h3>
                {status === 'sent' && (
                    <div className="success-message">
                        Votre message a été envoyé avec succès! Nous vous répondrons dans les plus brefs délais.
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Nom</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="message">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows="5"
                            required
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="submit-button"
                        disabled={status === 'sending'}
                    >
                        {status === 'sending' ? 'Envoi en cours...' : 'Envoyer'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Contact;
