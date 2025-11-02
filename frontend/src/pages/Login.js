import React, { useState } from 'react';
import './login.css';

export default function Login(){
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [showPassword,setShowPassword]=useState(false);

  const onSubmit=(e)=>{
    e.preventDefault();
    console.log('login', {email,password});
  };

  return (
    <div className="auth-shell">
      <div className="card">
        <h1>Login</h1>
        <form className="form-grid" onSubmit={onSubmit}>
          <label>Email
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="user@example.com" required/>
          </label>
          <label>Password
            <div className="pw-wrap">
              <input type={showPassword? 'text':'password'} value={password} onChange={e=>setPassword(e.target.value)} placeholder="Your password" required/>
              <button type="button" className="toggle" onClick={()=>setShowPassword(s=>!s)}>{showPassword? 'Hide':'Show'}</button>
            </div>
          </label>
          <div className="row">
            <label className="inline">
              <input type="checkbox"/> Remember me
            </label>
            <a className="muted" href="#">Forgot password?</a>
          </div>
          <button className="primary" type="submit">Login</button>
          <p className="muted">New to Fusion Fest? <a href="/register">Create an account</a></p>
        </form>
      </div>
    </div>
  );
}
