// src/pages/Admin/index.jsx
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import {
    useGetPastriesQuery,
    useAddPastryMutation,
    useUpdatePastryMutation,
    useDeletePastryMutation,
} from '../../services/api';
import './style.scss';

const Admin = () => {
    const { isAuthenticated } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingPastry, setEditingPastry] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        quantity: 0,
        image: '',
        choice: false,
    });

    const { data: pastries, isLoading, isError } = useGetPastriesQuery();
    const [addPastry] = useAddPastryMutation();
    const [updatePastry] = useUpdatePastryMutation();
    const [deletePastry] = useDeletePastryMutation();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const resetForm = () => {
        setFormData({
            name: '',
            quantity: 0,
            image: '',
            choice: false,
        });
        setEditingPastry(null);
        setShowAddForm(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingPastry) {
                await updatePastry({ id: editingPastry.id, ...formData }).unwrap();
            } else {
                await addPastry(formData).unwrap();
            }
            resetForm();
        } catch (error) {
            console.error('Erreur lors de la sauvegarde:', error);
        }
    };

    const handleEdit = (pastry) => {
        setEditingPastry(pastry);
        setFormData({
            name: pastry.name,
            quantity: pastry.quantity,
            image: pastry.image || '',
            choice: pastry.choice || false,
        });
        setShowAddForm(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cette pâtisserie ?')) {
            try {
                await deletePastry(id).unwrap();
            } catch (error) {
                console.error('Erreur lors de la suppression:', error);
            }
        }
    };

    if (isLoading) return <div>Chargement des pâtisseries...</div>;
    if (isError) return <div>Erreur lors du chargement des pâtisseries</div>;

    return (
        <div className="admin-container">
            <h2>Administration des Pâtisseries</h2>

            <div className="admin-actions">
                <button
                    className="add-button"
                    onClick={() => setShowAddForm(!showAddForm)}
                >
                    {showAddForm ? 'Annuler' : 'Ajouter une pâtisserie'}
                </button>
            </div>

            {showAddForm && (
                <div className="pastry-form">
                    <h3>
                        {editingPastry ? 'Modifier une pâtisserie' : 'Ajouter une pâtisserie'}
                    </h3>
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
                            <label htmlFor="quantity">Quantité</label>
                            <input
                                type="number"
                                id="quantity"
                                name="quantity"
                                value={formData.quantity}
                                onChange={handleChange}
                                min="0"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="image">URL de l'image</label>
                            <input
                                type="text"
                                id="image"
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group checkbox">
                            <label>
                                <input
                                    type="checkbox"
                                    name="choice"
                                    checked={formData.choice}
                                    onChange={handleChange}
                                />
                                Disponible
                            </label>
                        </div>

                        <div className="form-actions">
                            <button type="submit" className="save-button">
                                {editingPastry ? 'Mettre à jour' : 'Ajouter'}
                            </button>
                            <button
                                type="button"
                                className="cancel-button"
                                onClick={resetForm}
                            >
                                Annuler
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="pastries-list">
                <h3>Liste des pâtisseries</h3>
                <table>
                    <thead>
                    <tr>
                        <th>Image</th>
                        <th>Nom</th>
                        <th>Quantité</th>
                        <th>Disponible</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {pastries &&
                        pastries.map((pastry) => (
                            <tr key={pastry.id}>
                                <td>
                                    <img
                                        src={'https://placehold.co/30x20'}
                                        alt={pastry.name}
                                        width="50"
                                        height="50"
                                    />
                                </td>
                                <td>{pastry.name}</td>
                                <td>{pastry.quantity}</td>
                                <td>{pastry.choice ? 'Oui' : 'Non'}</td>
                                <td>
                                    <button
                                        className="edit-button"
                                        onClick={() => handleEdit(pastry)}
                                    >
                                        Modifier
                                    </button>
                                    <button
                                        className="delete-button"
                                        onClick={() => handleDelete(pastry.id)}
                                    >
                                        Supprimer
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Admin;
