// src/App.jsx
import React, { lazy, Suspense } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { Routes, Route } from 'react-router';
import Navigation from './components/Navigation';
import './index.css';

const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Play = lazy(() => import('./pages/Play'));
const Contact = lazy(() => import('./pages/Contact'));
const Admin = lazy(() => import('./pages/Admin'));

function App() {
  return (
    <>
        <Provider store={store}>
            <Navigation />
            <Suspense fallback={<p>Chargement...</p>}>
                <Routes>
                    <Route path="/Home" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/play" element={<Play />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/admin" element={<Admin />} />
                </Routes>
            </Suspense>
        </Provider>
    </>
  )
}

export default App
