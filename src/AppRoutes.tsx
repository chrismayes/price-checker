// src/AppRoutes.tsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import BrowseGroceries from './pages/BrowseGroceries';
import CheckGrocery from './pages/CheckGrocery';
import Account from './pages/Account';
import About from './pages/About';
import ContactUs from './pages/ContactUs';
import Header from './components/Header';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';

const AppRoutes: React.FC = () => {
  return (
    <>
      {/* Breadcrumbs will update automatically based on the current URL */}
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/browse" element={<PrivateRoute><BrowseGroceries /></PrivateRoute>} />
        <Route path="/check" element={<PrivateRoute><CheckGrocery /></PrivateRoute>} />
        <Route path="/account" element={<PrivateRoute><Account /></PrivateRoute>} />
        {/* Redirect any unknown routes to home */}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
