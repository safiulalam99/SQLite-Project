const db = require("../models");
const Order = db.orders;
const Op = db.Sequelize.Op;

// Create and Save a new Order
exports.create = (req, res) => {
    // Validate request
    if (!req.body.customerId) {
      res.status(400).send({
        message: "Customer ID can not be empty!",
        message: err
      });
      return;
    }

    // Create an Order
    const order = {
      customerId: req.body.customerId,
      orderDate: req.body.orderDate || Date.now()
    };

    // Save Order in the database
    Order.create(order)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Some error occurred while creating the Order.",
          error: err.message
        });
      });
};

// Retrieve all Orders from the database.
exports.findAll = (req, res) => {
    Order.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Some error occurred while retrieving orders.",
          error: err.message
        });
      });
};

// Find a single Order with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Order.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Order with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Order with id=" + id,
          error: err.message
        });
      });
};

// Update an Order by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Order.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Order was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Order with id=${id}. Maybe Order was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Order with id=" + id,
          error: err.message
        });
      });
};

// Delete an Order with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Order.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Order was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Order with id=${id}. Maybe Order was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Order with id=" + id,
          error: err.message
        });
      });
};

// Delete all Orders from the database.
exports.deleteAll = (req, res) => {
    Order.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Orders were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || "Some error occurred while removing all orders.",
          error: err.message
        });
      });
};
