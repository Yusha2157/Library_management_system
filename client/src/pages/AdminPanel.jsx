import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../utils/axios';
import './AdminPanel.css';

const AdminPanel = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('/books');
      setBooks(response.data.Books || []);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch books');
      setLoading(false);
      console.error('Error fetching books:', err);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h1>Book Management</h1>
        <Link to="/admin/books/add" className="add-book-button">
          Add New Book
        </Link>
      </div>

      <div className="books-grid">
        {books.map((book) => (
          <div key={book._id} className="book-card">
            <h3>{book.name}</h3>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>ISBN:</strong> {book.isbn}</p>
            <p><strong>Category:</strong> {book.category}</p>
            <p><strong>Status:</strong> <span className={`status ${book.status}`}>{book.status}</span></p>
            <p><strong>RFID Tag:</strong> {book.rfid_tag}</p>
            {book.description && (
              <p className="description"><strong>Description:</strong> {book.description}</p>
            )}
          </div>
        ))}
      </div>

      {books.length === 0 && (
        <div className="no-books">
          No books found. Add some books to get started!
        </div>
      )}
    </div>
  );
};

export default AdminPanel; 