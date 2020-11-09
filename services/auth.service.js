const jwt = require('jsonwebtoken');

const validateAuthToken = async (req, res, next) => {
  try {
    const decoded = jwt.verify(req.headers['x-auth-token'], process.env.SECRET_KEY);
    delete decoded.user.password;
    req.user = decoded;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { validateAuthToken };
