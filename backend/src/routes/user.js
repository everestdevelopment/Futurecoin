import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Yangi user yaratish yoki mavjudini yangilash
router.post('/upsert', async (req, res) => {
  try {
    const { telegramId, name, coins, level, xp, energy, maxEnergy, boostLevel } = req.body;
    const user = await User.findOneAndUpdate(
      { telegramId },
      { $set: { name, coins, level, xp, energy, maxEnergy, boostLevel, updatedAt: new Date() } },
      { upsert: true, new: true }
    );
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Bitta userni olish
router.get('/:telegramId', async (req, res) => {
  try {
    const user = await User.findOne({ telegramId: req.params.telegramId });
    if (!user) return res.status(404).json({ error: 'User topilmadi' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Top 10 user (eng ko‘p coin yig‘ganlar)
router.get('/top/coins', async (req, res) => {
  try {
    const users = await User.find().sort({ coins: -1 }).limit(10);
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Jami userlar soni
router.get('/count/all', async (req, res) => {
  try {
    const count = await User.countDocuments();
    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router; 