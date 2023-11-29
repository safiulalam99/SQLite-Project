const Sequelize = require("sequelize");
const sequelize = require("../config/database");
const Order = require("./Order");

const User = sequelize.define(
  "user",
  {
    // userSeq: {
    //   type: Sequelize.UUID,
    //   defaultValue: Sequelize.UUIDV4,
    //   allowNull: false,
    // },

    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [2, 100], 
    }
    },

  },
  {
    indexes: [
      {
        unique: true,
        fields: ["firstName"],
      },
    ],
  }
);

User.hasMany(Order, { foreignKey: "userId" });
Order.belongsTo(User, { foreignKey: "userId" });

sequelize
  .sync()
  .then(() => {
    console.log("Database initialized");
  })
  .catch((err) => {
    console.error("Unable to initialize database:", err);
  });

module.exports = User;
