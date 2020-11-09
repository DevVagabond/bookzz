const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const helper = require('../utils/helper');
// const { APIError } = require('../utils/APIError');

const signUp = async (req, res, next) => {
  try {
    const password = bcrypt.hashSync(req.body.password, 10);
    req.body.password = password;
    await User.create(req.body);
    return helper.OK(res, 'Signup completed successfully');
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      return helper.OK(res, 'Username or password is incorrect', null, 400);
    }
    const matchPassword = bcrypt.compareSync(req.body.password, user.password);
    if (!matchPassword) {
      return helper.OK(res, 'Username or password is incorrect', null, 400);
    }
    const accessToken = jwt.sign({ user }, process.env.SECRET_KEY);
    return helper.OK(res, 'Login successfully', { accessToken });
  } catch (err) {
    next(err);
  }
};

const me = async (req, res) => helper.OK(res, 'success', req.user);

module.exports = { signUp, login, me };
