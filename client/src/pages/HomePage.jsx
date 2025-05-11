// src/pages/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import './HomePage.css';

const HomePage = () => {
  const { user } = useAuth();

  return (
    <div className="home-container">
      <div className="home-content">
        <div className="home-header">
          <h1>Welcome to the Library Management System</h1>
          <p>Manage books, track availability, and more with our smart RFID system.</p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-content">
              <h3>Browse Books</h3>
              <p>Explore our catalog of books and check availability.</p>
              <div className="feature-action">
                <Link to="/library" className="feature-link">
                  View Library
                </Link>
              </div>
            </div>
          </div>

          {user && (
            <div className="feature-card">
              <div className="feature-content">
                <h3>My Profile</h3>
                <p>Manage your account and view your borrowing history.</p>
                <div className="feature-action">
                  <Link to="/profile" className="feature-link">
                    View Profile
                  </Link>
                </div>
              </div>
            </div>
          )}

          {user?.isAdmin && (
            <div className="feature-card">
              <div className="feature-content">
                <h3>Admin Dashboard</h3>
                <p>Manage books, users, and system settings.</p>
                <div className="feature-action">
                  <Link to="/admin" className="feature-link">
                    Go to Dashboard
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;