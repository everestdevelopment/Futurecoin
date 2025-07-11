const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const crypto = require('crypto');

// Telegram sign check
function checkTelegramAuth(data) {
  const secret = crypto.createHash('sha256').update(process.env.TELEGRAM_BOT_TOKEN).digest();
  const { hash, ...fields } = data;
  const sorted = Object.keys(fields).sort().map(key => `${key}=${fields[key]}`).join('\n');
  const hmac = crypto.createHmac('sha256', secret).update(sorted).digest('hex');
  return hmac === hash;
}

// POST /auth/telegram
router.post('/telegram', async (req, res) => {
  try {
    const { telegramId, username, referralBy, hash, ...rest } = req.body;
    // Telegram sign tekshiruvi (agar hash kelgan bo‘lsa)
    if (hash && !checkTelegramAuth({ telegramId, username, hash, ...rest })) {
      return res.status(401).json({ error: 'Telegram sign xato' });
    }
    if (!telegramId) return res.status(400).json({ error: 'telegramId required' });
    let user = await User.findOne({ telegramId });
    if (!user) {
      user = new User({ telegramId, username, referralBy });
      await user.save();
      // Referral bonus
      if (referralBy) {
        const refUser = await User.findOne({ telegramId: referralBy });
        if (refUser) {
          refUser.referrals.push(telegramId);
          refUser.coins += 100; // Referral bonus
          await refUser.save();
        }
      }
    }
    const token = jwt.sign({ telegramId: user.telegramId }, process.env.JWT_SECRET, { expiresIn: '30d' });
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router; 