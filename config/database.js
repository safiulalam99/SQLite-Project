// Database.js
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("test-db", "user", "pass", {
  dialect: "sqlite",
  host: "./database.db",
  logging: console.log,
});

module.exports = sequelize;
