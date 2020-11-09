module.exports = {
  username: 'root',
  password: process.env.SQL_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_URL,
  dialect: 'mysql',
};
