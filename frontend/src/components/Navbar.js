import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './navbar.css';

export default function Navbar() {
  return (
    <nav className="ff-nav">
      <div className="ff-nav__brand">
        <Link to="/" className="ff-nav__logo">FUSION <span>FEST</span></Link>
      </div>
      <div className="ff-nav__links">
        <NavLink to="/events" className={({isActive})=>`ff-nav__link ${isActive?'active':''}`}>Events</NavLink>
        <NavLink to="/bookings" className={({isActive})=>`ff-nav__link ${isActive?'active':''}`}>My Bookings</NavLink>
        <NavLink to="/favourites" className={({isActive})=>`ff-nav__link ${isActive?'active':''}`}>Favorites</NavLink>
        <NavLink to="/help" className={({isActive})=>`ff-nav__link ${isActive?'active':''}`}>Help</NavLink>
      </div>
      <div className="ff-nav__auth">
        <NavLink to="/login" className="ff-btn ff-btn--ghost">Login</NavLink>
        <NavLink to="/register" className="ff-btn">Get Started</NavLink>
      </div>
    </nav>
  );
}
