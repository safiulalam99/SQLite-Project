const db = require("../models");
const customer = db.customers;
const Op = db.Sequelize.Op;

// Create and Save a new customer
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name || !req.body.email) {  // validate email as well
    res.status(400).send({
      message: "Name and email can not be empty!"
    });
    return;
  }

  // Create a customer
  const customer = {
    name: req.body.name,
    email: req.body.email  // include email in the customer object
  };

  // Save customer in the database
  db.customers.create(customer)  // change from customer.create to db.customers.create
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.log(err);  // Log the actual error to the console
      res.status(500).send({
        message: "Some error occurred while creating the customer.",
        error: err.errors  // Optionally send back the error array for debugging
      });
    });
};



// Retrieve all customer from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;
  
    customer.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Some error occurred while retrieving customer.",
      });
      });
};

// Find a single customer with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    customer.findByPk(id)
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
          message: "Error retrieving customer with id=" + id,
          error: err.message
        });
      });
};

// Update a customer by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    customer.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "customer was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update customer with id=${id}. Maybe customer was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating customer with id=" + id,
          error: err.message
        });
      });
};

// Delete a customer with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    customer.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "customer was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete customer with id=${id}. Maybe customer was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete customer with id=" + id,
          error: err.message
        });
      });
};

// Delete all customer from the database.
exports.deleteAll = (req, res) => {
    customer.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} customer were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all customer.",
          error: err.message
        });
      });
};