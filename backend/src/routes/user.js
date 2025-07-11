const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middlewares/auth');

// GET /user/profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findOne({ telegramId: req.user.telegramId });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router; 