// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav style={styles.navbar}>
      <ul style={styles.navList}>
        <li style={styles.navItem}>
          <Link to="/medications" style={styles.link}>Medications</Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/dashboard" style={styles.link}>Dashboard</Link>
        </li>
        {!localStorage.getItem('token') ? (
          <>
            <li style={styles.navItem}>
              <Link to="/register" style={styles.link}>Register</Link>
            </li>
            <li style={styles.navItem}>
              <Link to="/login" style={styles.link}>Login</Link>
            </li>
          </>
        ) : (
          <li style={styles.navItem}>
            <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: '#4CAF50',
    padding: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navList: {
    listStyleType: 'none',
    display: 'flex',
    gap: '1rem',
    margin: 0,
    padding: 0,
  },
  navItem: {
    margin: 0,
  },
  link: {
    textDecoration: 'none',
    color: 'white',
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: 'white',
    color: '#4CAF50',
    border: 'none',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};

export default Navbar;