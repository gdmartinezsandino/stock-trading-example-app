const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const login = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Password is not correct' });
    }

    const payload = {
      user: {
        id: user._id,
        email: user.email,
      }
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token });
  } 
  catch (error) {
    res.status(500).json({ message: 'Error in the login process' });
  }
}

const getUserData = async (req, res) => {
  console.log('getUserData');
  try {
    const user = req.user;
    const userData = await User.findById(user.id);
    if (!userData) return res.status(404).json({ message: 'User not found' });

    res.status(201).json({
      message: 'Get user data successful',
      user: userData,
    });
  }
  catch(error) {
    res.status(500).json({ message: 'Error getting user data' });
  }
}

module.exports = { 
  login, 
  getUserData,
};
