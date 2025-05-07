// src/context/BookContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all books
  const fetchBooks = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get('/api/getallbooks');
      setBooks(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch books');
      setLoading(false);
    }
  };

  // Add a new book (admin only)
  const addBook = async (bookData) => {
    try {
      setError(null);
      const response = await axios.post('/api/addBook', bookData);
      setBooks([...books, response.data]);
      return { success: true, book: response.data };
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add book');
      return { success: false, error: err.response?.data?.message || 'Failed to add book' };
    }
  };

  // Update book data (admin only)
  const updateBook = async (id, bookData) => {
    try {
      setError(null);
      const response = await axios.put(`/api/updatebook/${id}`, bookData);
      setBooks(books.map(book => book.id === id ? response.data : book));
      return { success: true, book: response.data };
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update book');
      return { success: false, error: err.response?.data?.message || 'Failed to update book' };
    }
  };

  // Load books on mount
  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <BookContext.Provider
      value={{
        books,
        loading,
        error,
        fetchBooks,
        addBook,
        updateBook
      }}
    >
      {children}
    </BookContext.Provider>
  );
};