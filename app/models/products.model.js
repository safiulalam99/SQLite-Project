module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("product", {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.TEXT
        },
        price: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false
        },
        stock_quantity: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        category: {
            type: Sequelize.STRING,
            defaultValue: "inventory"

        }
    });

    return Product;
};
