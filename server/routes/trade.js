const express = require('express');

const { createTrade } = require('../controllers/tradeController');
const authMiddleware = require('../utils/authMiddleware');

const router = express.Router();
// router.post('/', authMiddleware, createTrade);
router.post('/', authMiddleware, (req, res, next) => {
  console.log("🔍 Received Token:", req.headers.authorization);
  next();
}, createTrade);

module.exports = router;
