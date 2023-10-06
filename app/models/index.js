const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.customers = require("./customer.model.js")(sequelize, Sequelize);
db.orders = require("./order.model.js")(sequelize, Sequelize);
db.products = require("./products.model.js")(sequelize, Sequelize);
db.orderProducts = require("./order-product.model.js")(sequelize, Sequelize);

db.sequelize.sync({ force: true })
  .then(() => {
    // Now define relationships
    db.customers.hasMany(db.orders, { as: "orders", foreignKey: 'customerId' });
    db.orders.belongsTo(db.customers, { foreignKey: 'customerId', as: "customer" });
    
    
    db.orders.belongsToMany(db.products, { through: db.orderProducts, as: "products", foreignKey: "orderId" });
    db.products.belongsToMany(db.orders, { through: db.orderProducts, as: "orders", foreignKey: "productId" });
  })
  .catch(err => {
    console.log("Failed to sync db: " + err.message);
  });

module.exports = db;