const express = require('express');

const router = express.Router();
const userRoute = require('./users');
const bookRoute = require('./books.route');

/* GET home page. */
router.use('/user', userRoute);
router.use('/books', bookRoute);

module.exports = router;
