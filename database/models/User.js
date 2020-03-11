const Sequelize = require("sequelize");
const db = require("../db");

module.exports = db.sequelize.define(
  'users',
  {
    UserID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    FirstName: {
      type: Sequelize.STRING
    },
    LastName: {
      type: Sequelize.STRING
    },
    Email: {
      type: Sequelize.STRING
    },
    Password: {
      type: Sequelize.STRING
    },
    JoinDate: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    HomeAirport: {
      type: Sequelize.STRING
    }
  },
  {
    timestamps: false
  }
)
