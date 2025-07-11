const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  telegramId: { type: String, required: true, unique: true },
  username: { type: String },
  coins: { type: Number, default: 0 },
  xp: { type: Number, default: 0 },
  level: { type: Number, default: 1 },
  energy: { type: Number, default: 100 },
  boostLevel: { type: Number, default: 0 },
  wallet: { type: String, default: '' },
  referrals: [{ type: String }], // Telegram ID of referred users
  referralBy: { type: String, default: '' }, // Who referred this user
  energyRechargeCount: { type: Number, default: 0 },
  lastRechargeReset: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

userSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('User', userSchema); 