const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middlewares/auth');

// POST /game/tap — tugmani bosib coin yig‘ish
router.post('/tap', auth, async (req, res) => {
  try {
    const user = await User.findOne({ telegramId: req.user.telegramId });
    if (!user) return res.status(404).json({ error: 'User not found' });
    if (user.energy <= 0) return res.status(400).json({ error: 'No energy' });

    // Hisoblash: XP va coinlar
    const baseCoins = user.level * 10;
    let boostBonus = 0;
    if (user.boostLevel === 1) boostBonus = 15;
    if (user.boostLevel === 2) boostBonus = 25;
    const totalCoins = baseCoins + boostBonus;

    user.coins += totalCoins;
    user.xp += 10;
    user.energy -= 1;

    // Level up
    const xpNeeded = user.level * 100;
    if (user.xp >= xpNeeded) {
      user.level += 1;
      user.xp -= xpNeeded;
      // Mukofot
      user.coins += user.level * 100;
    }
    await user.save();
    res.json({ coins: user.coins, xp: user.xp, level: user.level, energy: user.energy });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /game/energy — energiyani to‘ldirish (kuniga cheklov bilan)
router.post('/energy', auth, async (req, res) => {
  try {
    const user = await User.findOne({ telegramId: req.user.telegramId });
    if (!user) return res.status(404).json({ error: 'User not found' });
    const now = Date.now();
    const fiveHours = 5 * 60 * 60 * 1000;
    if (now - user.lastRechargeReset >= fiveHours) {
      user.energyRechargeCount = 0;
      user.lastRechargeReset = now;
    }
    if (user.energyRechargeCount >= 3) {
      return res.status(400).json({ error: 'No more recharges for now' });
    }
    user.energy = 100;
    user.energyRechargeCount += 1;
    await user.save();
    res.json({ energy: user.energy, energyRechargeCount: user.energyRechargeCount });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /game/boost — boostni oshirish
router.post('/boost', auth, async (req, res) => {
  try {
    const user = await User.findOne({ telegramId: req.user.telegramId });
    if (!user) return res.status(404).json({ error: 'User not found' });
    let cost = 0;
    if (user.boostLevel === 0) cost = 1000;
    else if (user.boostLevel === 1) cost = 2000;
    else return res.status(400).json({ error: 'Max boost level' });
    if (user.coins < cost) return res.status(400).json({ error: 'Not enough coins' });
    user.coins -= cost;
    user.boostLevel += 1;
    await user.save();
    res.json({ boostLevel: user.boostLevel, coins: user.coins });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router; 