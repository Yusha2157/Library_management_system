import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import './AddBook.css';

const AddBook = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    author: '',
    isbn: '',
    description: '',
    category: '',
    status: 'available',
    rfid_tag: '',
    publication_year: new Date().getFullYear()
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      // Validate required fields
      if (!formData.name || !formData.rfid_tag || !formData.isbn) {
        throw new Error('Please fill in all required fields');
      }

      console.log('Submitting book data:', formData);
      console.log('Using token:', token);

      const response = await axios.post('/admin/addBook', formData);
      console.log('Server response:', response.data);
      
      if (response.data.message === "Book Created Successfully!") {
        navigate('/admin/books');
      } else {
        setError(response.data.message || 'Failed to add book');
      }
    } catch (err) {
      console.error('Error adding book:', err);
      console.error('Error details:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status
      });
      setError(err.response?.data?.message || err.message || 'Failed to add book. Please try again.');
      if (err.message === 'No authentication token found') {
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-book-container">
      <div className="add-book-header">
        <h1>Add New Book</h1>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="add-book-form">
        <div className="form-group">
          <label htmlFor="name">Book Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            placeholder="Enter book name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleInputChange}
            placeholder="Enter author name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="isbn">ISBN *</label>
          <input
            type="text"
            id="isbn"
            name="isbn"
            value={formData.isbn}
            onChange={handleInputChange}
            required
            placeholder="Enter ISBN"
          />
        </div>

        <div className="form-group">
          <label htmlFor="publication_year">Publication Year</label>
          <input
            type="number"
            id="publication_year"
            name="publication_year"
            value={formData.publication_year}
            onChange={handleInputChange}
            min="1800"
            max={new Date().getFullYear()}
            placeholder="Enter publication year"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows="4"
            placeholder="Enter book description"
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
          >
            <option value="">Select a category</option>
            <option value="fiction">Fiction</option>
            <option value="non-fiction">Non-Fiction</option>
            <option value="science">Science</option>
            <option value="technology">Technology</option>
            <option value="history">History</option>
            <option value="biography">Biography</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="rfid_tag">RFID Tag *</label>
          <input
            type="text"
            id="rfid_tag"
            name="rfid_tag"
            value={formData.rfid_tag}
            onChange={handleInputChange}
            required
            placeholder="Enter RFID tag"
          />
        </div>

        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleInputChange}
          >
            <option value="available">Available</option>
            <option value="borrowed">Borrowed</option>
          </select>
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={() => navigate('/admin/books')}
            className="cancel-button"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="submit-button"
          >
            {loading ? 'Adding Book...' : 'Add Book'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBook; 