import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from './assets/logo_piggy_bank.png';
import './navigation.css';
import { FaUserCircle } from 'react-icons/fa';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';

function NaviGation() {
  const [state, setState] = useState({ right: false });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState(''); // State to hold the user's email
  const navigate = useNavigate();

  // Check for auth token and fetch user details if logged in
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    console.log('Token:', token); // Log the token for debugging
    setIsLoggedIn(!!token);

    if (token) {
      fetchUserEmail(token);
    }
  }, []);

  const fetchUserEmail = async (token) => {
    try {
      const response = await fetch('http://localhost:8080/api/users/me', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('User Data:', data); // Log the fetched data for debugging
        setEmail(data.email); // Assuming `data.email` contains the user's email
      } else {
        console.error('Failed to fetch user data:', response.statusText);
        setEmail('No Email Found'); // Fallback if email is not found
      }
    } catch (error) {
      console.error('Error fetching user email:', error);
      setEmail('Error fetching email'); // Error fallback
    }
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    setEmail(''); // Reset email on logout
    navigate('/'); // Redirect to home after logout
  };

  const handleLogin = () => {
    navigate('/login'); // Redirect to login page
  };

  const list = () => (
    <Box
      id="profile"
      sx={{ width: 350 }}
      role="presentation"
      onClick={toggleDrawer('right', false)}
      onKeyDown={toggleDrawer('right', false)}
    >
      <div className="profile-icon" id="nav">
        <FaUserCircle size={40} title="Profile" />
      </div>
      {/* Display email or fallback text if not available */}
      <h1 id="nameee">{email || 'No Email Found'}</h1>

      <Divider />
      <List id="drawer-list">
        {isLoggedIn && (
          <ListItem id="ProfileListContainer" disablePadding>
            <button
              className="btn btn-secondary"
              type="button"
              onClick={handleLogout}
            >
              Logout
            </button>
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />
      <nav id="navbar" className="navbar navbar-expand-lg bg-body-tertiary">
        <div id="header" className="container-fluid">
          <a className="navbar-brand" href="/">
            <img
              id="logo"
              src={logo}
              alt="Logo"
              width="80"
              className="d-inline-block align-text-top"
            />
          </a>
          <h id="title" className="navbar-brand">
            PIGGY BANK
          </h>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/" id="nav_home">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/contact" id="nav_contact">
                  Contact
                </Link>
              </li>
              <li className="nav-item">
                <p
                  id="nav_mc"
                  onClick={() => {
                    if (isLoggedIn) {
                      navigate('/cashbook');
                    } else {
                      navigate('/login');
                    }
                  }}
                  style={{ cursor: 'pointer', margin: 0 }}
                >
                  My Cashbooks
                </p>
              </li>
            </ul>
          </div>

          <div className="gap-3 col-1">
            {isLoggedIn ? (
              <div id="navLogout"></div>
            ) : (
              <p id="navLogin" onClick={handleLogin}>
                Login
              </p>
            )}
          </div>
        </div>
      </nav>

      <div>
        <div
          className="profile-icon"
          id="nav"
          onClick={toggleDrawer('right', true)}
        >
          <FaUserCircle size={40} title="Profile" />
        </div>
        <Drawer
          anchor="right"
          open={state.right}
          onClose={toggleDrawer('right', false)}
        >
          {list()}
        </Drawer>
      </div>
    </>
  );
}

export default NaviGation;
