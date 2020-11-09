/* eslint-disable global-require */
const path = require('path');

// import .env variables
if (process.env.NODE_ENV !== 'production') {
  require('dotenv-safe').config({
    allowEmptyValues: true,
    path: path.join(process.cwd(), '.env'),
    sample: path.join(process.cwd(), '.env.example'),
  });
}

module.exports = {
  env: process.env.NODE_ENV,
  serviceName: 'Bookz-backend',
  sanitizedFields: [],
};
