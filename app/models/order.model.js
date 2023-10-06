module.exports = (sequelize, Sequelize) => {
  const Order = sequelize.define("order", {
    orderDate: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW
    },
    customerId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'customers', // name of the table, not the model
        key: 'id',
      }
    }
  });

  return Order;
};
