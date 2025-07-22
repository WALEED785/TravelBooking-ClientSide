import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/Navbar.css';
import logo from '../images/Travel Logo.png';
import { toast } from 'react-toastify';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');


  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.info('Logged out successfully');
    navigate('/');
  };


  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid d-flex flex-wrap justify-content-between align-items-center">

        {/* Logo */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src={logo} alt="Travel Logo" className="logo-img" />
        </Link>

        {/* Toggler for mobile */}
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

        {/* Nav Links */}
        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul className="navbar-nav nav-bg px-3 d-flex align-items-center">
            <li className="nav-item">
              <Link className="nav-link custom-link" to="/">Destination</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link custom-link" to="/plaintrip">Plan your Trip</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link custom-link" to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link custom-link" to="/search">AI Search</Link>
            </li>
            {token ? (
            <li className="nav-item">
              <Link className="nav-link custom-link" to="/profile">Profile</Link>
            </li>) : ("")}

            {/* Login/Logout Toggle */}
            <li className="nav-item">
              {token ? (
                <button className="nav-link custom-link btn btn-link text-decoration-none" onClick={handleLogout}>
                  Logout
                </button>
              ) : (
                <Link className="nav-link custom-link" to="/login">Login</Link>
              )}
            </li>
          </ul>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
