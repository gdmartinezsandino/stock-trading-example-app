const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const login = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    console.log("📩 Received login request:", { email, password });

    const user = await User.findOne({ email });
    console.log("🔍 User found in DB:", user);

    if (!user) {
      console.log("❌ Invalid email");
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("🔑 Password match:", isMatch);

    if (!isMatch) {
      console.log("❌ Incorrect password");
      return res.status(400).json({ message: 'Password is not correct' });
    }

    const payload = {
      user: {
        id: user._id,
        email: user.email,
      }
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log("✅ Token generated:", token);

    res.json({ token });
  } 
  catch (error) {
    console.error("❌ Error in login process:", error);
    res.status(500).json({ message: 'Error in the login process' });
  }
}

module.exports = { login };
