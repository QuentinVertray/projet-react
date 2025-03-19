// src/App.jsx
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { BrowserRouter, Routes, Route } from 'react-router';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Login from './pages/Login';
import Play from './pages/Play';
import './index.css';

function App() {
  return (
    <>
        <Provider store={store}>
            <Navigation />
            <Routes>
                <Route path="/Home" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/play" element={<Play />} />
            </Routes>
        </Provider>
    </>
  )
}

export default App
