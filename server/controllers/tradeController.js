const Trade = require('../models/Trade');
const User = require('../models/User');

const createTrade = async (req, res) => {
  const { symbol, type, quantity, price } = req.body;
  const user = req.user;

  try {
    const userData = await User.findById(user._id);
    if (!userData) return res.status(404).json({ message: 'User not found' });

    if (type === 'buy') {
      if (userData.balance < price * quantity) {
        return res.status(400).json({ message: 'Not enough funds' });
      }
      userData.balance -= price * quantity;
      userData.shares += quantity;
    } 
    else if (type === 'sell') {
      if (userData.shares < quantity) {
        return res.status(400).json({ message: 'Not enough shares' });
      }
      userData.balance += price * quantity;
      userData.shares -= quantity;
    }

    // Save updated user data
    await userData.save();

    // ✅ Save the trade in the database
    const trade = new Trade({
      user: userData._id,
      type,
      symbol,
      price,
      quantity,
    });
    await trade.save();

    res.status(201).json({ 
      message: 'Trade successful', 
      trade, 
      balance: userData.balance, 
      shares: userData.shares 
    });
  } 
  catch (error) {
    res.status(500).json({ message: 'Error processing trade' });
  }
};


module.exports = { createTrade };
