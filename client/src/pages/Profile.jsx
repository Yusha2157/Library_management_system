import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import axios from "../utils/axios";
import './Profile.css';

export default function Profile() {
  const { user } = useAuth();
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBorrowedBooks = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get('/auth/userInfo');
        const books = response.data.borrowedBooks || [];
        
        // Fetch book details for each borrowed book
        const booksWithDetails = await Promise.all(
          books.map(async (book) => {
            try {
              const bookResponse = await axios.get(`/books/${book.bookId}`);
              return {
                ...book,
                ...bookResponse.data
              };
            } catch (err) {
              console.error('Error fetching book details:', err);
              return book;
            }
          })
        );
        
        setBorrowedBooks(booksWithDetails);
      } catch (error) {
        console.error('Error fetching borrowed books:', error);
        setError('Failed to load borrowed books');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchBorrowedBooks();
    }
  }, [user]);

  if (!user) {
    return (
      <div className="profile-container">
        <p className="login-message">Please log in to view your profile.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="profile-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-card">
        <h1>My Profile</h1>
        <div className="profile-info">
          <div className="info-group">
            <p className="info-label">Name</p>
            <p className="info-value">{user.name}</p>
          </div>
          <div className="info-group">
            <p className="info-label">Email</p>
            <p className="info-value">{user.email}</p>
          </div>
          <div className="info-group">
            <p className="info-label">Role</p>
            <p className="info-value">{user.isAdmin ? 'Admin' : 'User'}</p>
          </div>
        </div>
      </div>

      <div className="profile-card">
        <h2>Borrowed Books</h2>
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        {borrowedBooks.length === 0 ? (
          <p className="no-books">You haven't borrowed any books yet.</p>
        ) : (
          <div className="books-grid">
            {borrowedBooks.map((book) => (
              <div key={book.bookId} className="book-card">
                <h3>{book.name}</h3>
                <p>Author: {book.author}</p>
                <p>ISBN: {book.isbn}</p>
                <p>Borrowed on: {new Date(book.borrowedAt).toLocaleDateString()}</p>
                {book.status && (
                  <p>Status: {book.status}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}