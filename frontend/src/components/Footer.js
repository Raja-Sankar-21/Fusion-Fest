import React from 'react';
import './footer.css';

export default function Footer(){
  const year = new Date().getFullYear();
  return (
    <footer className="ff-footer">
      <div className="ff-footer__inner">
        <div className="ff-footer__brand">Fusion Fest</div>
        <nav className="ff-footer__nav">
          <a href="/events">Events</a>
          <a href="/favourites">Favourites</a>
          <a href="/bookings">Bookings</a>
          <a href="/help">Help</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="ff-footer__copy">© {year} Fusion Fest</div>
      </div>
      <div className="ff-footer__sections">
        <section id="about" className="ff-footer__section">
          <div className="ff-footer__section-title">About</div>
          <p className="ff-footer__text">Fusion Fest helps you plan events with curated packages and trusted vendors.</p>
        </section>
        <section id="contact" className="ff-footer__section">
          <div className="ff-footer__section-title">Contact</div>
          <p className="ff-footer__text">Email: hello@fusionfest.example</p>
          <p className="ff-footer__text">Phone: +91 90000 00000</p>
        </section>
      </div>
    </footer>
  );
}
