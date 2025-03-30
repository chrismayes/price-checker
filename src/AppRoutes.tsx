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
import ScrollToTop from './components/ScrollToTop';
import ResetPasswordForm from './pages/ResetPasswordForm';


const AppRoutes: React.FC = () => {
  return (
    <>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/browse" element={<PrivateRoute><BrowseGroceries /></PrivateRoute>} />
        <Route path="/check" element={<PrivateRoute><CheckGrocery /></PrivateRoute>} />
        <Route path="/account" element={<PrivateRoute><Account /></PrivateRoute>} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/reset-password" element={<ResetPasswordForm />} />
        {/* Redirect any unknown routes to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
