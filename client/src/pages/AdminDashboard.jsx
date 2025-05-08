import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../utils/axios';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalBooks: 0,
    availableBooks: 0,
    borrowedBooks: 0,
    totalUsers: 0,
    activeBorrows: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/admin/stats');
      setStats(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch dashboard statistics');
      console.error('Error fetching stats:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-dashboard">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <div className="quick-actions">
          <Link to="/admin/books/add" className="action-button">
            Add New Book
          </Link>
          <Link to="/admin/users" className="action-button">
            Manage Users
          </Link>
        </div>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Books</h3>
          <p className="stat-value">{stats.totalBooks}</p>
        </div>
        <div className="stat-card">
          <h3>Available Books</h3>
          <p className="stat-value">{stats.availableBooks}</p>
        </div>
        <div className="stat-card">
          <h3>Borrowed Books</h3>
          <p className="stat-value">{stats.borrowedBooks}</p>
        </div>
        <div className="stat-card">
          <h3>Total Users</h3>
          <p className="stat-value">{stats.totalUsers}</p>
        </div>
        <div className="stat-card">
          <h3>Active Borrows</h3>
          <p className="stat-value">{stats.activeBorrows}</p>
        </div>
      </div>

      <div className="dashboard-sections">
        <div className="section-card">
          <h2>Quick Links</h2>
          <div className="quick-links">
            <Link to="/admin/books" className="link-button">
              Manage Books
            </Link>
            <Link to="/admin/borrows" className="link-button">
              View Borrows
            </Link>
            <Link to="/admin/reports" className="link-button">
              Generate Reports
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 