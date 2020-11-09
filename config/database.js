/* eslint-disable global-require */
const debug = require('debug')('migration');
const path = require('path');

// import .env variables
if (process.env.NODE_ENV !== 'production') {
  require('dotenv-safe').config({
    allowEmptyValues: true,
    path: path.join(process.cwd(), '.env'),
    sample: path.join(process.cwd(), '.env.example'),
  });
}
// .load({
//   path: path.join(process.cwd(), '.env'),
//   sample: path.join(process.cwd(), '.env.example')
// });
debug(process.env.DB_URL, new Date().toISOString());
module.exports = {
  url: process.env.NODE_ENV === 'test' ? `${process.env.DB_URL}_test` : process.env.DB_URL,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  logging: debug,
};
