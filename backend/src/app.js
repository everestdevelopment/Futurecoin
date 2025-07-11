require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB ulanishi
const connectDB = require('./config/database');
connectDB();

// Test route
app.get('/', (req, res) => {
  res.send('Futurecoin backend is running!');
});

// API routes
app.use('/auth', require('./routes/auth'));
app.use('/user', require('./routes/user'));
app.use('/game', require('./routes/game'));
app.use('/leaderboard', require('./routes/leaderboard'));
app.use('/wallet', require('./routes/wallet'));
app.use('/stats', require('./routes/stats'));
app.use('/claim-date', require('./routes/claimDate'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 