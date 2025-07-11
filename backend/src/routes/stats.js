const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET /stats — umumiy statistika
router.get('/', async (req, res) => {
  try {
    const users = await User.countDocuments();
    const coins = await User.aggregate([{ $group: { _id: null, total: { $sum: "$coins" } } }]);
    const referrals = await User.aggregate([{ $group: { _id: null, total: { $sum: { $size: "$referrals" } } } }]);
    res.json({
      users,
      coins: coins[0] ? coins[0].total : 0,
      referrals: referrals[0] ? referrals[0].total : 0
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router; 