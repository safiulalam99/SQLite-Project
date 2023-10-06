// routes/product.routes.js

function checkIdParam(req, res, next) {
    const id = req.params.id;
    if (!id || isNaN(Number(id))) {
        res.status(400).json({
            message: "Invalid or missing 'id' parameter. 'id' must be a number."
        });
        return;
    }
    next();
}

module.exports = app => {
    const customer = require("../controllers/customer.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Product
    router.post("/", customer.create);
  
    // Retrieve all customer
    router.get("/", customer.findAll);
  
    // Retrieve a single Product with id
    router.get("/:id", checkIdParam, customer.findOne);
  
    // Update a Product with id
    router.put("/:id", customer.update);
  
    // Delete a Product with id
    router.delete("/:id", customer.delete);
  
    // Delete all customer
    router.delete("/", customer.deleteAll);
  
    app.use('/api/customer', router);
};
