const multer = require('multer');
const multerS3 = require('multer-s3');
const { v4: uuidv4 } = require('uuid');
const { s3 } = require('./s3.service');

const upload = multer({
  storage: multerS3({
    s3,
    bucket: 'bookzz',
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key(req, file, cb) {
      cb(null, `${req.user.user.id}/${Date.now().toString()}-${uuidv4()}`);
    },
  }),
});

module.exports = upload;
