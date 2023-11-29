// models/Order.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');


const Order = sequelize.define('order', {
    item: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1 
        },
    },
},
);

module.exports = Order;

