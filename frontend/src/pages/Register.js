import React, { useState } from 'react';
import './register.css';

export default function Register(){
  const [role,setRole]=useState('user');
  return (
    <div className="auth-shell">
      <div className="card">
        <h1>Register for Fusion Fest</h1>
        <form className="form-grid">
          <label>Full Name<input placeholder="Must be 6+ characters (e.g., Prasuna)"/></label>
          <label>Email<input placeholder="user@example.com" type="email"/></label>
          <label>Phone (10 digits)<input placeholder="9876543210"/></label>
          <label>Password<input placeholder="Must be 8+ characters" type="password"/></label>
          <fieldset className="role">
            <legend>I am registering as:</legend>
            <label><input type="radio" name="role" checked={role==='user'} onChange={()=>setRole('user')} /> Customer (Looking for services)</label>
            <label><input type="radio" name="role" checked={role==='vendor'} onChange={()=>setRole('vendor')} /> Worker (Providing services)</label>
          </fieldset>
          <button className="primary" type="button">Register</button>
          <p className="muted">Already have an account? <a href="/login">Login here</a></p>
        </form>
      </div>
    </div>
  );
}
