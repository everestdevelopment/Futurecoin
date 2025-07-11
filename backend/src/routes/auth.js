const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const crypto = require('crypto');
const axios = require('axios');

// Memory cache for phone codes (in production, use Redis or DB)
const phoneCodeCache = {};

// Telegram sign check
function checkTelegramAuth(data) {
  const secret = crypto.createHash('sha256').update(process.env.TELEGRAM_BOT_TOKEN).digest();
  const { hash, ...fields } = data;
  const sorted = Object.keys(fields).sort().map(key => `${key}=${fields[key]}`).join('\n');
  const hmac = crypto.createHmac('sha256', secret).update(sorted).digest('hex');
  return hmac === hash;
}

// Yangi: Telefon raqamga kod yuborish
router.post('/send-code', async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone) return res.status(400).json({ error: 'Telefon raqam kerak' });
    // 6 xonali kod generatsiya
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    phoneCodeCache[phone] = { code, created: Date.now() };
    // Telegram bot orqali yuborish (foydalanuvchi botga /start bosgan bo‘lishi kerak)
    // Botdan user_id ni olish uchun oldindan DB yoki mapping bo‘lishi kerak
    // Bu yerda faqat test uchun: botga /start bosgan userlar mappingini qo‘lda saqlash kerak
    // Misol uchun: phoneToTelegramId[phone] = telegram_user_id
    const phoneToTelegramId = global.phoneToTelegramId || {};
    const telegramUserId = phoneToTelegramId[phone];
    if (!telegramUserId) {
      return res.status(400).json({ error: 'Bu raqamga kod yuborish uchun avval botga /start bosing' });
    }
    const text = `Futurecoin uchun tasdiqlash kodi: ${code}`;
    await axios.post(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      chat_id: telegramUserId,
      text
    });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Kod yuborishda xatolik' });
  }
});

// Yangi: Kodni tekshirish va login/ro‘yxatdan o‘tish
router.post('/verify-code', async (req, res) => {
  try {
    const { phone, code } = req.body;
    if (!phone || !code) return res.status(400).json({ error: 'Telefon va kod kerak' });
    const cache = phoneCodeCache[phone];
    if (!cache || cache.code !== code) {
      return res.status(400).json({ error: 'Kod noto‘g‘ri yoki eskirgan' });
    }
    // Kodni bir marta ishlatish uchun o‘chirib tashlaymiz
    delete phoneCodeCache[phone];
    // Telegram user_id va ismini olish
    const phoneToTelegramId = global.phoneToTelegramId || {};
    const telegramUserId = phoneToTelegramId[phone];
    if (!telegramUserId) {
      return res.status(400).json({ error: 'Telegram user topilmadi' });
    }
    // Telegramdan user info olish
    const tgRes = await axios.get(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/getChat?chat_id=${telegramUserId}`);
    const tgUser = tgRes.data.result;
    // Foydalanuvchini DBda yaratish yoki olish
    let user = await User.findOne({ telegramId: telegramUserId });
    if (!user) {
      user = new User({
        telegramId: telegramUserId,
        username: tgUser.username,
        firstName: tgUser.first_name,
        lastName: tgUser.last_name,
        phone
      });
      await user.save();
    }
    // JWT token berish
    const token = jwt.sign({ telegramId: user.telegramId }, process.env.JWT_SECRET, { expiresIn: '30d' });
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ error: 'Kod tekshirishda xatolik' });
  }
});

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