import './App.css';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import ProtectedRoute from './routes/ProtectedRoute';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Profile from './pages/Profile';
import Library from './pages/Library';
import AdminDashboard from './pages/AdminDashboard';
import AdminPanel from './pages/AdminPanel';
import AddBook from './pages/AddBook';
import AdminRoute from './routes/AdminRoute';

function App() {
  return (
    <AuthProvider>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/library" element={<Library />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/books"
              element={
                <AdminRoute>
                  <AdminPanel />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/books/add"
              element={
                <AdminRoute>
                  <AddBook />
                </AdminRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;
