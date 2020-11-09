const express = require('express');

const router = express.Router();
const userRoute = require('./users');

/* GET home page. */
router.use('/user', userRoute);

module.exports = router;
