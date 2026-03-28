import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import './Auth.css';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await api.post('/auth/register', formData);
      alert('Your registry spot has been reserved. Please sign in.');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.error || 'Registry failed');
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
          <h1>Begin <br /><span className="brand-highlight">Growth</span></h1>
          <p className="subtitle">Join the botanical registry</p>
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nom de Plume (Username)</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              required
              placeholder="e.g. CuratorName"
            />
          </div>

          <div className="form-group">
            <label>The Curator's Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              placeholder="e.g. curator@sanctuary.me"
            />
          </div>
          
          <div className="form-group">
            <label>Master Cipher (Password)</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              placeholder="••••••••"
            />
          </div>
          
          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? 'Reserving...' : 'Initiate Registry'}
          </button>
        </form>
        
        <p className="auth-link">
          Already part of the sanctuary? <Link to="/login">Sign in here</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
