const Stock = require('../models/Stock');

const getStockHistory = async (req, res) => {
  try {
    const stockHistory = await Stock.find({ symbol: req.params.symbol }).limit(50);
    res.json(stockHistory);
  }
  catch(error) {
    res.status(500).json({ message: 'Error retriving stock history' });
  }
}

const getStockInfo = async (req, res) => {
  try {
    const stock = await Stock.findOne({ symbol: req.params.symbol });
    if (!stock) {
      return res.status(404).json({ message: 'Stock not found' });
    }
  }
  catch(error) {
    res.status(500).json({ message: 'Error retrieving stock info' });
  }
}

module.exports = { getStockHistory, getStockInfo };
