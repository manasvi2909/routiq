const express = require('express');
const cors = require('cors');
const { initDatabase } = require('./database/init');
const authRoutes = require('./routes/auth');
const habitRoutes = require('./routes/habits');
const logRoutes = require('./routes/logs');
const moodRoutes = require('./routes/mood');
const reportRoutes = require('./routes/reports');
const notificationRoutes = require('./routes/notifications');
const subtaskRoutes = require('./routes/subtasks');
const gardenRoutes = require('./routes/garden');
const chatRoutes = require('./routes/chat');
const reminderService = require('./services/reminderService');

require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/habits', habitRoutes);
app.use('/api/logs', logRoutes);
app.use('/api/mood', moodRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/subtasks', subtaskRoutes);
app.use('/api/garden', gardenRoutes);
app.use('/api/chat', chatRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Live Database Patch Endpoint
app.get('/api/fix-db', async (req, res) => {
  try {
    const { pool } = require('./database/init');
    await pool.query(`
      ALTER TABLE users ADD COLUMN IF NOT EXISTS coaching_personality VARCHAR(30) DEFAULT 'analytical';
      ALTER TABLE users ADD COLUMN IF NOT EXISTS friction_threshold INTEGER DEFAULT 3;
      CREATE TABLE IF NOT EXISTS oracle_memories (
          id SERIAL PRIMARY KEY,
          user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
          content TEXT NOT NULL,
          embedding REAL[],
          category VARCHAR(50),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    res.json({ success: true, message: 'Live database successfully patched with latest schema!' });
  } catch (error) {
    console.error('Migration error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Robust listen block
const startServer = (port) => {
  console.log('Attempting to listen on', port);
  const server = app.listen(port, '127.0.0.1', () => {
    console.log(`Server started on ${port}`);
  });

  server.on('error', (err) => {
    console.error('Server listen error:', err && err.code ? err.code : err);
    if (err && err.code === 'EADDRINUSE') {
      console.warn(`Port ${port} in use — trying ${port + 1}...`);
      setTimeout(() => startServer(port + 1), 200);
    } else {
      console.error('Fatal server error:', err);
      process.exit(1);
    }
  });
};

// Initialize database and start server (local only, not on Vercel serverless)
const startApp = async () => {
  try {
    // Start reminder service (cron jobs — local only)
    reminderService.start();
    
    await initDatabase();
    console.log('Database initialized, starting server...');
    
    const initialPort = process.env.PORT ? Number(process.env.PORT) : 5600;
    startServer(initialPort);
  } catch (error) {
    console.error('Failed to start application:', error);
  }
};

// On Vercel, don't call startApp (no listen, no cron).
// Vercel imports `app` directly via module.exports.
if (!process.env.VERCEL) {
  startApp();
}

module.exports = app;
