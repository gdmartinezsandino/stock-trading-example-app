const Trade = require('../models/Trade');
const User = require('../models/User');

const createTrade = async (req, res) => {
  try {
    const { symbol, type, quantity, price } = req.body;
    const user = req.user;

    if (!symbol || !type || !quantity || !price) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const tradeQuantity = Number(quantity);
    const tradePrice = Number(price);

    if (isNaN(tradeQuantity) || isNaN(tradePrice)) {
      return res.status(400).json({ message: 'Invalid quantity or price' });
    }

    const userData = await User.findById(user.id);
    if (!userData) return res.status(404).json({ message: 'User not found' });

    if (type === 'buy') {

      if (userData.balance < tradePrice * tradeQuantity) {
        return res.status(400).json({ message: 'Not enough funds' });
      }
      userData.balance = parseFloat((userData.balance - tradePrice * tradeQuantity).toFixed(2));
      userData.shares += tradeQuantity;
    } else if (type === 'sell') {

      if (userData.shares < tradeQuantity) {
        return res.status(400).json({ message: 'Not enough shares' });
      }
      userData.balance = parseFloat((userData.balance + tradePrice * tradeQuantity).toFixed(2));
      userData.shares -= tradeQuantity;
    }

    await userData.save();

    const trade = new Trade({
      user: userData._id,
      type,
      symbol,
      price: tradePrice,
      quantity: tradeQuantity,
      date: new Date(),
    });

    await trade.save();

    res.status(201).json({
      message: 'Trade successful',
      trade,
      balance: userData.balance,
      shares: userData.shares,
    });
  } catch (error) {
    console.error('Error in createTrade:', error);
    res.status(500).json({ message: 'Error processing trade' });
  }
};


module.exports = { createTrade };
