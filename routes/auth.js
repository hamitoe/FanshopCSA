const express = require('express')
const authController = require('../backend/services/auth');
const router = express.Router();

router.post('/register', authController.register)

module.exports = router;