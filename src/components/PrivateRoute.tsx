import React from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: React.ReactElement;
}

// A wrapper component to protect routes that require authentication
const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  // Check if the user is authenticated by verifying the presence of an access token in localStorage
  const isAuthenticated = Boolean(localStorage.getItem('access_token'));

  // If authenticated, render the child component; otherwise, redirect to the login page
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
