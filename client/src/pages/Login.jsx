import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Auth.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Registry access denied');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <Link to="/" className="auth-home-link">
          Return to landing
        </Link>
        <div className="auth-brand">
          <div className="auth-brand-lockup">
            <span className="auth-brand-mark" aria-hidden="true" />
            <span className="auth-brand-name">RoutiQ</span>
          </div>
          <h1>Welcome <br /><span className="brand-highlight">Auspiciously</span></h1>
          <p className="subtitle">Re-enter your botanical archive</p>
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>The Curator's Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="e.g. curator@sanctuary.me"
            />
          </div>
          
          <div className="form-group">
            <label>Master Cipher (Password)</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>
          
          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? 'Consulting Files...' : 'Unlock Registry'}
          </button>
        </form>
        
        <p className="auth-link">
          New to the sanctuary? <Link to="/register">Create an account</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
