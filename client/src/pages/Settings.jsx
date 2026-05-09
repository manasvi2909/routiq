import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Check, Flame, ShieldAlert, Sparkles, Heart, BrainCircuit } from 'lucide-react';
import './Settings.css';

function Settings() {
  const [reminderTime, setReminderTime] = useState('09:00');
  const [reminderEnabled, setReminderEnabled] = useState(true);
  const [coachingPersonality, setCoachingPersonality] = useState('analytical');
  const [frictionThreshold, setFrictionThreshold] = useState(3);
  
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [coachingSaved, setCoachingSaved] = useState(false);

  // Password change states
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pwLoading, setPwLoading] = useState(false);
  const [pwError, setPwError] = useState('');
  const [pwSuccess, setPwSuccess] = useState(false);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPwError('');
    setPwSuccess(false);

    if (newPassword !== confirmPassword) {
      setPwError('New passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      setPwError('Password must be at least 6 characters long');
      return;
    }

    setPwLoading(true);
    try {
      await api.put('/auth/change-password', {
        currentPassword,
        newPassword
      });
      setPwSuccess(true);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      console.error('Password change error:', err);
      setPwError(err.response?.data?.error || 'Failed to update password');
    } finally {
      setPwLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await api.get('/auth/me');
      const user = res.data?.user;
      if (user) {
        if (user.reminder_time) setReminderTime(user.reminder_time.substring(0, 5));
        setReminderEnabled(user.reminder_enabled ?? true);
        setCoachingPersonality(user.coaching_personality || 'analytical');
        setFrictionThreshold(user.friction_threshold || 3);
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  const handleSaveProtocol = async () => {
    setLoading(true);
    setSaved(false);
    try {
      await api.put('/auth/reminder-settings', {
        reminder_time: reminderTime,
        reminder_enabled: reminderEnabled
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error('Error saving protocol settings:', error);
      alert('Error during calibration');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveCoaching = async () => {
    setLoading(true);
    setCoachingSaved(false);
    try {
      await api.put('/auth/coaching-settings', {
        coaching_personality: coachingPersonality,
        friction_threshold: Number(frictionThreshold)
      });
      setCoachingSaved(true);
      setTimeout(() => setCoachingSaved(false), 3000);
    } catch (error) {
      console.error('Error saving coaching settings:', error);
      alert('Error during calibration');
    } finally {
      setLoading(false);
    }
  };

  const personalities = [
    {
      id: 'analytical',
      name: 'Analytical',
      icon: <BrainCircuit size={20} />,
      desc: 'Relies on numbers, Pearson stress correlations, and day-of-week willpower metrics.',
    },
    {
      id: 'strict',
      name: 'Strict',
      icon: <Flame size={20} />,
      desc: 'High accountability, tough-love, strict routines, and zero willpower dilutions.',
    },
    {
      id: 'supportive',
      name: 'Supportive',
      icon: <Heart size={20} />,
      desc: 'Focuses on empathy, validation, self-compassion, and gentle 2-minute adaptations.',
    },
    {
      id: 'calm',
      name: 'Calm',
      icon: <Sparkles size={20} />,
      desc: 'Mindful, slow-paced guidance centering on identity-based routines and visual plant care.',
    },
    {
      id: 'mentor',
      name: 'Mentor',
      icon: <ShieldAlert size={20} />,
      desc: 'Strategic advisor providing habit stacking schedules, friction reduction, and planning.',
    },
  ];

  return (
    <div className="settings-page">
      <h1>Ritual Calibration</h1>

      {/* Protocol Markers Card */}
      <div className="settings-card">
        <div className="settings-header">
          <div className="settings-ornament" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div>
            <h2>Protocol Markers</h2>
            <p>Define the temporal highlights for your daily entries</p>
          </div>
        </div>

        <div className="settings-content">
          <div className="setting-item">
            <label className="toggle-label">
              <span className="toggle-text">Active Journey Reminders</span>
              <input
                type="checkbox"
                checked={reminderEnabled}
                onChange={(e) => setReminderEnabled(e.target.checked)}
                className="toggle-input"
              />
              <span className="toggle-slider"></span>
            </label>
          </div>

          {reminderEnabled && (
            <div className="setting-item">
              <label className="time-label">
                Archival Threshold (Time)
              </label>
              <input
                type="time"
                value={reminderTime}
                onChange={(e) => setReminderTime(e.target.value)}
                className="time-input"
              />
            </div>
          )}

          <button
            onClick={handleSaveProtocol}
            disabled={loading}
            className="save-btn"
          >
            {loading ? 'Calibrating...' : saved ? (
              <>
                <Check size={18} />
                Journal Updated
              </>
            ) : 'Update Protocol'}
          </button>
        </div>
      </div>

      {/* Oracle Companion Personality Calibration */}
      <div className="settings-card">
        <div className="settings-header">
          <div className="settings-ornament settings-ornament-alt" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div>
            <h2>Oracle AI Personality Calibration</h2>
            <p>Configure the coaching style of your behavioral companion</p>
          </div>
        </div>

        <div className="settings-content">
          <div className="personality-grid">
            {personalities.map((p) => (
              <div
                key={p.id}
                className={`personality-card ${coachingPersonality === p.id ? 'active' : ''}`}
                onClick={() => setCoachingPersonality(p.id)}
              >
                <div className="personality-card-header">
                  <div className="personality-icon-wrapper">
                    {p.icon}
                  </div>
                  <h3>{p.name}</h3>
                </div>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>

          <div className="setting-item slider-setting">
            <div className="slider-header">
              <label className="time-label">Friction Sensitivity Threshold: {frictionThreshold} habits</label>
              <span className="slider-hint">Trigger warnings when managing more than this many routines</span>
            </div>
            <input
              type="range"
              min="2"
              max="6"
              value={frictionThreshold}
              onChange={(e) => setFrictionThreshold(e.target.value)}
              className="range-input"
            />
          </div>

          <button
            onClick={handleSaveCoaching}
            disabled={loading}
            className="save-btn"
          >
            {loading ? 'Calibrating...' : coachingSaved ? (
              <>
                <Check size={18} />
                Oracle Calibrated
              </>
            ) : 'Update Oracle Settings'}
          </button>
        </div>
      </div>

      {/* Security & Access Card */}
      <div className="settings-card">
        <div className="settings-header">
          <div className="settings-ornament settings-ornament-alt" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div>
            <h2>Security & Access</h2>
            <p>Modify your security keys for this archive</p>
          </div>
        </div>

        <div className="settings-content">
          <form onSubmit={handleChangePassword} className="password-form" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {pwError && <div className="pw-error-msg" style={{ background: 'rgba(220, 53, 69, 0.08)', border: '1px solid rgba(220, 53, 69, 0.15)', color: '#dc3545', padding: '0.6rem 0.9rem', borderRadius: '8px', fontSize: '0.78rem' }}>{pwError}</div>}
            {pwSuccess && <div className="pw-success-msg" style={{ background: 'rgba(40, 167, 69, 0.08)', border: '1px solid rgba(40, 167, 69, 0.15)', color: '#28a745', padding: '0.6rem 0.9rem', borderRadius: '8px', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Check size={16} /> Password updated successfully!</div>}
            
            <div className="setting-item password-field">
              <label className="time-label">Current Password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                className="text-input"
                placeholder="••••••••"
                style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '12px', border: '1px solid var(--color-border)', background: 'var(--surface-subtle)' }}
              />
            </div>

            <div className="setting-item password-field">
              <label className="time-label">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="text-input"
                placeholder="••••••••"
                style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '12px', border: '1px solid var(--color-border)', background: 'var(--surface-subtle)' }}
              />
            </div>

            <div className="setting-item password-field">
              <label className="time-label">Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="text-input"
                placeholder="••••••••"
                style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '12px', border: '1px solid var(--color-border)', background: 'var(--surface-subtle)' }}
              />
            </div>

            <button
              type="submit"
              disabled={pwLoading}
              className="save-btn"
            >
              {pwLoading ? 'Calibrating Security...' : 'Update Password'}
            </button>
          </form>
        </div>
      </div>

      {/* The Botanical Ethos Card */}
      <div className="settings-card">
        <div className="settings-header">
          <div className="settings-ornament settings-ornament-alt" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div>
            <h2>The Botanical Ethos</h2>
            <p>On persistent growth and intentional living</p>
          </div>
        </div>
        <div className="settings-content">
          <p>
            RoutiQ is a sanctuary designed for the meticulous documentation of personal evolution. 
            By treating each habit as a botanical specimen in a mental arboretum, 
            we foster a relationship with time that is both disciplined and serene.
          </p>
          <p>
            Every sequence recorded is a thread in the tapestry of your becoming. 
            We invite you to witness your own bloom with grace and patience.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Settings;
