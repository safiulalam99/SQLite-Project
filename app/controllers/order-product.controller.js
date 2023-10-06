const db = require("../models");
const Op = db.Sequelize.Op;

// List of All Customers and Their Orders
exports.listAllCustomersAndOrders = (req, res) => {
  db.customers.findAll({
    include: [{
      model: db.orders,
      as: "orders",
      include: [{
        model: db.products,
        as: "products"
      }]
    }]
  })
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message: "Some error occurred while retrieving data.",
      error: err.message
    });
  });
};

// Specific Customer and Their Orders
exports.findCustomerAndOrders = (req, res) => {
  const id = req.params.id;

  db.customers.findByPk(id, {
    include: [{
      model: db.orders,
      as: "orders",
      include: [{
        model: db.products,
        as: "products"
      }]
    }]
  })
  .then(data => {
    if (data) {
      res.send(data);
    } else {
      res.status(404).send({
        message: `Cannot find customer with id=${id}.`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Error retrieving data with id=" + id,
      error: err.message
    });
  });
};

// List of All Orders and Their Associated Products
exports.listAllOrdersAndProducts = (req, res) => {
  db.orders.findAll({
    include: [{
      model: db.products,
      as: "products"
    }]
  })
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message: "Some error occurred while retrieving data.",
      error: err.message
    });
  });
};

// Specific Order and Its Associated Products
exports.findOrderAndProducts = (req, res) => {
  const id = req.params.id;

  db.orders.findByPk(id, {
    include: [{
      model: db.products,
      as: "products"
    }]
  })
  .then(data => {
    if (data) {
      res.send(data);
    } else {
      res.status(404).send({
        message: `Cannot find order with id=${id}.`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Error retrieving data with id=" + id,
      error: err.message
    });
  });
};

// Create and Save a new OrderProduct
exports.create = (req, res) => {
  // Validate request
  if (!req.body.orderId || !req.body.productId || !req.body.quantity) {
      res.status(400).send({
          message: "Order ID, Product ID, and Quantity can not be empty!"
      });
      return;
  }

  // Create an OrderProduct
  const orderProduct = {
      orderId: req.body.orderId,
      productId: req.body.productId,
      quantity: req.body.quantity
  };

  // Save OrderProduct in the database
  OrderProduct.create(orderProduct)
      .then(data => {
          res.send(data);
      })
      .catch(err => {
          res.status(500).send({
              message: err.message || "Some error occurred while creating the OrderProduct."
          });
      });
};