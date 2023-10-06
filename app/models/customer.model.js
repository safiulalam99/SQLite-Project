module.exports = (sequelize, Sequelize) => {
    const Customer = sequelize.define("customer", {
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      }
    });
  
    return Customer;
  };