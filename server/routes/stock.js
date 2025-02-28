const express = require('express');
const { getStockHistory, getStockInfo } = require('../controllers/stockController');

const router = express.Router();
router.get('/history/:symbol', getStockHistory);
router.get('/info/:symbol', getStockInfo);

module.exports = router;
