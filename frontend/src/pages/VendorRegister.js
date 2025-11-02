import React from 'react';
import './vendorRegister.css';

export default function VendorRegister(){
  return (
    <div className="auth-shell">
      <div className="card wide">
        <h2>Vendor Onboarding</h2>
        <p className="muted">Tell customers about your experience and style...</p>
        <form className="form-grid two">
          <label>Primary Service Location<input placeholder="e.g., Chennai, Bengaluru, Virtual"/></label>
          <label>Max Service Distance (in Km)<input type="number" min={0} defaultValue={0} onInput={(e)=>{ if (e.target.value === '') return; e.target.value = Math.max(0, Number(e.target.value)); }}/></label>
          <label>Starting Cost (₹)<input placeholder="e.g., 10000"/></label>
          <div className="chips">
            <div className="chips-title">Work Preferences / Services Offered (Select at least one):</div>
            <label><input type="checkbox"/> Catering</label>
            <label><input type="checkbox"/> Decoration</label>
            <label><input type="checkbox"/> Photography</label>
            <label><input type="checkbox"/> Venue Services</label>
            <label><input type="checkbox"/> DJ/Music</label>
            <label><input type="checkbox"/> Other Planning</label>
          </div>
          <div className="portfolio">
            <div>Portfolio Upload (Optional):</div>
            <input type="file" multiple/>
            <small>(Placeholder for future file upload)</small>
          </div>
          <div style={{display:'flex',gap:12}}>
            <button className="primary" type="button">Save</button>
            <button className="ghost" type="button">Skip</button>
          </div>
        </form>
      </div>
    </div>
  );
}
