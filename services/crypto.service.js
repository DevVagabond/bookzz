const bcrypt = require('bcrypt');

const encryptData = (data) => new Promise((resolve, reject) => {
  bcrypt.hash(data, (err, hash) => {
    if (err) return reject(err);
    resolve(hash);
  });
});

module.exports = { encryptData };
