var express = require('express');
var router = express.Router();

// Request
const authRequest = require('../request/auth');

// Controller
const authController = require('../controllers/auth');

/* Authorization */
router.post('/login', authRequest.login, authController.login);

module.exports = router;
