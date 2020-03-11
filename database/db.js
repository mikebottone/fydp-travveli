const Sequelize = require('sequelize');
const db = {};
const sequelize = new Sequelize('heroku_2e52a7e26390f81', 'ba709ddde64af9', '096f03b7',{
  host: 'us-cdbr-iron-east-04.cleardb.net',
  dialect: 'mysql',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
