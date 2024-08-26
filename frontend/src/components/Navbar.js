import React from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated, logout } from '../services/auth';

function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Home</Link></li>
        {isAuthenticated() ? (
          <>
            <li><Link to="/" onClick={logout}>Logout</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;