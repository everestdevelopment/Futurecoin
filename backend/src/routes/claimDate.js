const express = require('express');
const router = express.Router();

// GET /claim-date — claim ochilish sanasi
router.get('/', (req, res) => {
  res.json({ claimOpenDate: process.env.CLAIM_OPEN_DATE });
});

module.exports = router; 