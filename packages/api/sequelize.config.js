require('ts-node/register');
require('module-alias/register');
const dotenv = require('dotenv');
dotenv.config();
const { config } = require('./src/config');

module.exports = {
  development: {
    username: config.db.user,
    password: config.db.password,
    database: config.db.database,
    host: config.db.host,
    port: config.db.port,
    dialect: 'postgres'
  },
}; 