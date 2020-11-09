const express = require('express');

const router = express.Router();

const { user } = require('../controllers');
const { auth } = require('../services');

router.post('/signup', user.signUp);
router.post('/login', user.login);
router.get('/me', auth.validateAuthToken, user.me);

module.exports = router;
