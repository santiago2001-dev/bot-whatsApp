// database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize( process.env.DB, process.env.USER_DB, process.env.PASS_DB, {
  host: process.env.HOST_DB,
  dialect: 'mysql',
  logging: false, 
});

module.exports = sequelize;
