import { Link } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          <div className="navbar-left">
            <Link to="/" className="navbar-brand">
              Library Management
            </Link>
          </div>

          <div className="navbar-right">
            {user ? (
              <>
                <Link to="/profile" className="navbar-link">
                  Profile
                </Link>
                {user.isAdmin && (
                  <Link to="/admin" className="navbar-link">
                    Admin Panel
                  </Link>
                )}
                <button onClick={logout} className="navbar-button logout">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="navbar-link">
                  Login
                </Link>
                <Link to="/register" className="navbar-button register">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 