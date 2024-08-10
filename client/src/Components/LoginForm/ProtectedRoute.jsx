import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated');

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
