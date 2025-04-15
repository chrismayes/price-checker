import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Account from './pages/Account';
import About from './pages/About';
import ContactUs from './pages/ContactUs';
import Login from './pages/Login';
import ResetPasswordForm from './pages/ResetPasswordForm';
import ConfirmEmail from './pages/ConfirmEmail';
import Stores from './pages/Stores';
import Groceries from './pages/Groceries';
import ShoppingLists from './pages/ShoppingLists';
import GoingShopping from './pages/GoingShopping';
import ViewStore from './pages/ViewStore';
import PrivateRoute from './components/PrivateRoute';
import ScrollToTop from './components/ScrollToTop';

const AppRoutes: React.FC = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/account" element={<PrivateRoute><Account /></PrivateRoute>} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/reset-password" element={<ResetPasswordForm />} />
        <Route path="/confirm-email" element={<ConfirmEmail />} />
        <Route path="/stores" element={<PrivateRoute><Stores /></PrivateRoute>} />
        <Route path="/groceries" element={<PrivateRoute><Groceries /></PrivateRoute>} />
        <Route path="/shopping-lists" element={<PrivateRoute><ShoppingLists /></PrivateRoute>} />
        <Route path="/going-shopping" element={<PrivateRoute><GoingShopping /></PrivateRoute>} />
        <Route path="/stores/:id" element={<PrivateRoute><ViewStore /></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
