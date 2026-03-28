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

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
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

// Initialize database and start server
const startApp = async () => {
  try {
    // Start reminder service
    reminderService.start();
    
    await initDatabase();
    console.log('Database initialized, starting server...');
    
    const initialPort = process.env.PORT ? Number(process.env.PORT) : 5600;
    startServer(initialPort);
  } catch (error) {
    console.error('Failed to start application:', error);
    // On Vercel, we don't want to exit(1) during cold start if possible, 
    // but a database failure is fatal for the API.
  }
};

startApp();

module.exports = app;
