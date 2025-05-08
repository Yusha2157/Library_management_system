import React, { useState, useEffect } from 'react';
import axios from '../utils/axios';
import './Library.css';

const Library = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/books');
      setBooks(response.data.Books || []);
      setError(null);
    } catch (err) {
      setError('Failed to fetch books. Please try again later.');
      console.error('Error fetching books:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredBooks = Array.isArray(books) ? books.filter(book => {
    const matchesSearch = book.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.isbn.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || book.status === filterStatus;
    return matchesSearch && matchesStatus;
  }) : [];

  if (loading) {
    return (
      <div className="library-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="library-container">
      <div className="library-header">
        <h1>Library Catalog</h1>
        <div className="search-filter-container">
          <input
            type="text"
            placeholder="Search books..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Books</option>
            <option value="available">Available</option>
            <option value="borrowed">Borrowed</option>
          </select>
        </div>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="books-grid">
        {filteredBooks.map((book) => (
          <div key={book._id} className="book-card">
            <div className="book-info">
              <h3>{book.name}</h3>
              <p className="book-author">By {book.author}</p>
              <p className="book-isbn">ISBN: {book.isbn}</p>
              <p className="book-status" data-status={book.status}>
                Status: {book.status}
              </p>
            </div>
          </div>
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <div className="no-books">
          No books found matching your search criteria.
        </div>
      )}
    </div>
  );
};

export default Library; 