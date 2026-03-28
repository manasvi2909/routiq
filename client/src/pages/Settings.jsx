import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Check } from 'lucide-react';
import './Settings.css';

function Settings() {
  const [reminderTime, setReminderTime] = useState('09:00');
  const [reminderEnabled, setReminderEnabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      await api.get('/auth/me');
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  const handleSave = async () => {
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
      console.error('Error saving settings:', error);
      alert('Error during calibration');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="settings-page">
      <h1>Ritual Calibration</h1>

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
            onClick={handleSave}
            disabled={loading}
            className="save-btn"
          >
            {loading ? 'Calibrating...' : saved ? (
              <>
                <Check size={18} />
                Journal Updated
              </>
            ) : 'Update Calibration'}
          </button>
        </div>
      </div>

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
