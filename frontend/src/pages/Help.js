import React from 'react';
import './help.css';

export default function Help() {
  return (
    <div className="help-shell">
      <h1>Help & Support</h1>
      <p className="muted">Find answers to common questions</p>
      <div className="faq">
        <details>
          <summary>How do I book an event?</summary>
          <div className="ans">Go to Events, choose a category, fill the form in the popup and click Submit. For Corporate events, select a vendor and click Book Now.</div>
        </details>
        <details>
          <summary>Can I cancel or modify my booking?</summary>
          <div className="ans">Open My Bookings. You can remove a booking saved locally. For confirmed vendor bookings, contact the vendor directly from the confirmation email/SMS.</div>
        </details>
        <details>
          <summary>What payment methods do you accept?</summary>
          <div className="ans">Online payments (UPI, cards, netbanking) are supported at confirmation. For now, demo bookings are stored locally and do not charge you.</div>
        </details>
        <details>
          <summary>Do you provide on-site coordination?</summary>
          <div className="ans">Yes. You can include on-site coordination in the Services list when booking, or request it from the vendor after booking.</div>
        </details>
        <details>
          <summary>How is pricing estimated?</summary>
          <div className="ans">The Starting Cost is an estimate. Final pricing depends on venue, guest count, services, and date. Vendors will confirm quotes after reviewing your details.</div>
        </details>
      </div>
    </div>
  );
}
