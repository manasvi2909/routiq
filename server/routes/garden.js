const express = require('express');
const { pool } = require('../database/init');
const authenticate = require('../middleware/auth');
const { getPlantCatalog } = require('../services/plantCatalog');

const router = express.Router();

router.get('/', authenticate, async (req, res) => {
  try {
    const userResult = await pool.query(
      'SELECT plants_fully_grown FROM users WHERE id = $1',
      [req.user.id]
    );

    const plantsFullyGrown = userResult.rows[0]?.plants_fully_grown || 0;

    const gardenResult = await pool.query(
      `SELECT id, habit_id, habit_name, plant_type, milestone_number, reward_given, grown_at
       FROM garden_plants
       WHERE user_id = $1
       ORDER BY grown_at DESC`,
      [req.user.id]
    );

    res.json({
      plants_fully_grown: plantsFullyGrown,
      unlocked_catalog: getPlantCatalog(plantsFullyGrown),
      garden_plants: gardenResult.rows
    });
  } catch (error) {
    console.error('Get garden error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
