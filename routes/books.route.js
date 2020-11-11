const express = require('express');

const router = express.Router();

const { book } = require('../controllers');
const { auth, multer } = require('../services');

router.post('/publish', auth.validateAuthToken, book.publishBook);
router.get('/list', auth.validateAuthToken, book.getPublishedBooks);
router.get('/details/:bookId', auth.validateAuthToken, book.getBookDetails);
router.put('/update/:bookId', auth.validateAuthToken, book.updateBookDetails);
router.post('/images/upload', auth.validateAuthToken, multer.array('photos', 5), book.uploadImage);

module.exports = router;
