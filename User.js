const Sequelize = require('sequelize');
const sequelize = require("./database");


// Define User model
const User = sequelize.define('user', {
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
});

// Synchronize the database
sequelize.sync()
    .then(() => {
        console.log('Database initialized');
    })
    .catch((err) => {
        console.error('Unable to initialize database:', err);
    });

module.exports = User;
