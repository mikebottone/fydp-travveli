const Sequelize = require("sequelize");
const db = require("../db");

module.exports = db.sequelize.define(
  'user-favourites',
  {
    UserID: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    ActivityID: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    Time: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    }
  },
  {
    timestamps: false
  }
)
