import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from '../utils/axios';

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [books, setBooks] = useState([]);

  // Check if user is already logged in on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserData();
    } else {
      setLoading(false);
    }
  }, []);

  // Fetch current user data
  const fetchUserData = async () => {
    try {
      const response = await axios.get('/auth/userInfo');
      setUser(response.data); // The backend already sends the correct user object with isAdmin
      setBooks(response.data.Books || []);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching user data:', err);
      logout();
      setLoading(false);
    }
  };

  // Register user
  const register = async (userData) => {
    try {
      setError(null);
      const response = await axios.post('/auth/new', userData);
      const { token } = response.data;
      localStorage.setItem('token', token);
      await fetchUserData();
      return { success: true };
    } catch (err) {
      console.error('Registration error:', err);
      const errorMessage = err.response?.data?.message || 'Registration failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Login user
  const login = async (credentials) => {
    try {
      setError(null);
      const response = await axios.post('/auth/login', credentials);
      const { token } = response.data;
      localStorage.setItem('token', token);
      await fetchUserData();
      return { success: true };
    } catch (err) {
      console.error('Login error:', err);
      const errorMessage = err.response?.data?.message || 'Login failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Logout user
  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    setError(null);
  };

  // Get user's borrowed books
  const getBorrowedBooks = async () => {
    try {
      const response = await axios.get('/auth/userInfo');
      return response.data.borrowedBooks || [];
    } catch (err) {
      console.error('Error fetching borrowed books:', err);
      return [];
    }
  };

  const filteredBooks = Array.isArray(books) ? books.filter(book => {
    // ... filtering logic ...
  }) : [];

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        logout,
        getBorrowedBooks,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};