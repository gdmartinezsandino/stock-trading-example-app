const express = require('express');
const { login, getUserData } = require('../controllers/userController');
const authMiddleware = require('../utils/authMiddleware');

const router = express.Router();
router.post('/login', login);
router.get('/me', authMiddleware, getUserData);

module.exports = router;
