import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import React from 'react';
import Cookies from 'universal-cookie';

const ProtectedRoute = ({ children }) => {
  const cookies = new Cookies();
  const token = cookies.get('jwtToken'); // Get the token from cookies

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
