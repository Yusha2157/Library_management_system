import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!user || !user.isAdmin) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default AdminRoute; 