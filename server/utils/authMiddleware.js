const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token is missing or invalid' });
  }


  const token = authHeader.split(' ')[1];
  const decoded = jwt.decode(token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user; // Attach user info to request
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token is not valid' });
  }
};
