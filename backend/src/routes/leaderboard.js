const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET /leaderboard — eng ko‘p coin yig‘ganlar
router.get('/', async (req, res) => {
  try {
    const topUsers = await User.find().sort({ coins: -1 }).limit(20).select('telegramId username coins level');
    res.json({ leaderboard: topUsers });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router; 