import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminProtectedRoute = ({ children }) => {
 // Check if the adminToken exists in LocalStorage
  const isAdminLoggedIn = localStorage.getItem('adminToken');

 // If the token is missing (not logged in), redirect to the Admin Login page
  if (!isAdminLoggedIn) {
    return <Navigate to="/admin" replace />;
  }

  // If the token exists (logged in), allow access to the protected route
  return children;
};

export default AdminProtectedRoute;