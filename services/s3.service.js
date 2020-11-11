const AWS = require('aws-sdk');

AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3();
const upload = (params) => new Promise((resolve, reject) => {
  s3.upload(params, (err, data) => (err ? reject(err) : resolve(data)));
});
const getSignedUrl = (params) => new Promise((resolve, reject) => {
  s3.getSignedUrl('getObject', params, (err, data) => (err ? reject(err) : resolve(data)));
});

module.exports = {
  upload,
  getSignedUrl,
  s3,
};
