import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Categories from './components/Categories';
import Articles from './components/Articles';
import Navbar from './components/Navbar';
import SignUp from './components/SignUp';
import Login from './components/Login';

const App = () => {
  // Vérifier si l'utilisateur est connecté (par exemple, avec un token dans localStorage)
  const isAuthenticated = localStorage.getItem('token');

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Route par défaut : si l'utilisateur n'est pas connecté, rediriger vers /login */}
        <Route path="/" element={isAuthenticated ? <Navigate to="/categories" /> : <Navigate to="/login" />} />
        
        {/* Page des catégories (affichée si l'utilisateur est authentifié) */}
        <Route path="/categories" element={isAuthenticated ? <Categories /> : <Navigate to="/login" />} />

        {/* Autres pages */}
        <Route path="/category/:id" element={<Articles />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
