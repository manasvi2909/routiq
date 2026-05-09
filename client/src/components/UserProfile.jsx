import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User, Mail, Upload, X, Check } from 'lucide-react';
import api from '../services/api';
import './UserProfile.css';

function UserProfile() {
  const { user, setUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  
  const fileInputRef = useRef(null);

  // Initialize form values when modal opens
  useEffect(() => {
    if (isOpen && user) {
      setUsername(user.username || '');
      setEmail(user.email || '');
      setAvatar(user.avatar || null);
      setError('');
      setSuccess('');
    }
  }, [isOpen, user]);

  if (!user) return null;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setError('Image size should be less than 2MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result); // Base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsSaving(true);

    try {
      const response = await api.put('/auth/profile', {
        username,
        email,
        avatar
      });

      setUser(response.data.user);
      setSuccess('Profile updated successfully!');
      setTimeout(() => {
        setIsOpen(false);
      }, 1500);
    } catch (err) {
      console.error('Error saving profile:', err);
      setError(err.response?.data?.error || 'Failed to update profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const firstLetter = user.username?.charAt(0)?.toUpperCase() || 'U';

  return (
    <div className="user-profile-container">
      {/* Navbar Profile Icon */}
      <button 
        className="navbar-profile-trigger" 
        onClick={() => setIsOpen(true)}
        title="My Profile"
      >
        {user.avatar ? (
          <img src={user.avatar} className="navbar-profile-img" alt="My Profile" />
        ) : (
          <div className="navbar-profile-letter">
            {firstLetter}
          </div>
        )}
      </button>

      {/* Profile Edit Modal */}
      {isOpen && (
        <div className="profile-modal-overlay">
          <div className="profile-modal-content glass-panel">
            <button className="profile-modal-close" onClick={() => setIsOpen(false)}>
              <X size={20} />
            </button>

            <div className="profile-modal-header">
              <span className="eyebrow">My Identity</span>
              <h2>Edit Profile</h2>
            </div>

            <form onSubmit={handleSave} className="profile-modal-form">
              {/* Profile Avatar Upload Block */}
              <div className="profile-avatar-upload-section">
                <div className="avatar-preview-wrapper">
                  {avatar ? (
                    <img src={avatar} className="avatar-preview-img" alt="Preview" />
                  ) : (
                    <div className="avatar-preview-letter">{firstLetter}</div>
                  )}
                  <button 
                    type="button" 
                    className="avatar-upload-overlay-btn"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload size={16} />
                  </button>
                </div>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  accept="image/*" 
                  style={{ display: 'none' }}
                />
                <span className="upload-tip-text">Click icon to upload custom image (max 2MB)</span>
              </div>

              {/* Error and Success States */}
              {error && <div className="profile-form-error">{error}</div>}
              {success && (
                <div className="profile-form-success">
                  <Check size={16} style={{ marginRight: '0.4rem' }} /> {success}
                </div>
              )}

              {/* Form Inputs */}
              <div className="profile-form-group">
                <label><User size={14} style={{ marginRight: '0.4rem' }} /> Name</label>
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder="Enter your name"
                />
              </div>

              <div className="profile-form-group">
                <label><Mail size={14} style={{ marginRight: '0.4rem' }} /> Email Address</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email"
                />
              </div>

              <div className="profile-form-actions">
                <button 
                  type="button" 
                  className="profile-btn-cancel" 
                  onClick={() => setIsOpen(false)}
                  disabled={isSaving}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="profile-btn-save"
                  disabled={isSaving}
                >
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
