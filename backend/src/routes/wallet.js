const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middlewares/auth');

// POST /wallet/connect — TON wallet ulash
router.post('/connect', auth, async (req, res) => {
  try {
    const { wallet } = req.body;
    if (!wallet) return res.status(400).json({ error: 'Wallet address required' });
    const user = await User.findOne({ telegramId: req.user.telegramId });
    if (!user) return res.status(404).json({ error: 'User not found' });
    user.wallet = wallet;
    await user.save();
    res.json({ wallet: user.wallet });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /wallet/claim — coinlarni pulga/tokenlarga almashtirish
router.post('/claim', auth, async (req, res) => {
  try {
    const claimOpenDate = new Date(process.env.CLAIM_OPEN_DATE + 'T00:00:00Z');
    const now = new Date();
    if (now < claimOpenDate) {
      return res.status(403).json({ error: `Claim ochiladi: ${process.env.CLAIM_OPEN_DATE}` });
    }
    const user = await User.findOne({ telegramId: req.user.telegramId });
    if (!user) return res.status(404).json({ error: 'User not found' });
    if (!user.wallet) return res.status(400).json({ error: 'Wallet not connected' });
    if (user.coins < 1000) return res.status(400).json({ error: 'Kamida 1000 coin kerak' });
    // Admin foydalanuvchi claim qilolmaydi
    if (user.username && process.env.TELEGRAM_ADMIN_USERNAME && user.username === process.env.TELEGRAM_ADMIN_USERNAME) {
      return res.status(403).json({ error: 'Admin uchun claim qilish mumkin emas' });
    }
    // Claim qilish logikasi (tokenlarni yuborish, admin tekshiruvi va h.k.)
    // Hozircha faqat coinlarni 0 ga tushiramiz
    const claimed = user.coins;
    user.coins = 0;
    await user.save();
    res.json({ claimed });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router; 