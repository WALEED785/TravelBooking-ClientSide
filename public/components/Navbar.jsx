import React from 'react';
import { Link } from 'react-router-dom'; // ✅ Import Link from react-router-dom
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/Navbar.css'; // Your custom styles
import logo from '../images/Travel Logo.png';

const Navbar = () => {
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
          <Link className="nav-link custom-link" to="/magzine">Magazine</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link custom-link" to="/visa">Visas</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link custom-link" to="/about">About</Link>
        </li>

        {/* Mobile View Button */}
        <li className="nav-item d-lg-none text-center">
          <Link to="/plaintrip" className="play-button">PLAN YOUR</Link>
        </li>
      </ul>
    </div>

    {/* Desktop View Button */}
    <div className="d-none d-lg-flex align-items-center">
      <Link to="/plaintrip" className="play-button">PLAN YOUR TRIP</Link>
    </div>
  </div>
</nav>

  );
};

export default Navbar;
