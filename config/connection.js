const Sequelize = require('sequelize');

const URI = process.env.JAWSDB_URL || process.env.MYSQLURI

const sequelize = new Sequelize(URI);

module.exports = sequelize;