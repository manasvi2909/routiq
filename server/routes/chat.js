const express = require('express');
const authenticate = require('../middleware/auth');
const { generateInsights, generateLocalResponse } = require('../services/chatService');

const router = express.Router();

// ── POST /api/chat — conversational endpoint ────────────────────────
router.post('/', authenticate, async (req, res) => {
  try {
    const { message, history = [] } = req.body;
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Call our completely local reflection engine
    const reply = await generateLocalResponse(req.user.id, message, history);

    // Artificial delay to show the "thinking" indicator in the UI
    await new Promise(resolve => setTimeout(resolve, 1200));

    res.json({ reply });
  } catch (error) {
    console.error('Chat error:', error?.message || error);
    res.status(500).json({
      error: 'Failed to generate response',
      reply: 'The Oracle could not process your request. Please try again in a moment.',
    });
  }
});

// ── GET /api/chat/insights — auto-generated insight cards ───────────
router.get('/insights', authenticate, async (req, res) => {
  try {
    const insights = await generateInsights(req.user.id);
    res.json({ insights });
  } catch (error) {
    console.error('Insights error:', error);
    res.status(500).json({ error: 'Failed to generate insights', insights: [] });
  }
});

module.exports = router;
