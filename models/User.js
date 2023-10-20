const Sequelize = require("sequelize");
const sequelize = require("../config/database");
const Order = require('./Order');



// Define User model
const User = sequelize.define(
  "user",
  {
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    indexes: [
      // Create a unique index on email
      {
        unique: true,
        fields: ["firstName"],
      },
    ],
  }
);


User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'id' });

// Synchronize the database
sequelize
  .sync()
  .then(() => {
    console.log("Database initialized");
  })
  .catch((err) => {
    console.error("Unable to initialize database:", err);
  });

module.exports = User;
