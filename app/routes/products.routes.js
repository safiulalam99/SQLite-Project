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
    const products = require("../controllers/products.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Product
    router.post("/", products.create);
  
    // Retrieve all Products
    router.get("/", products.findAll);
  
    // Retrieve a single Product with id
    router.get("/:id", checkIdParam, products.findOne);
  
    // Update a Product with id
    router.put("/:id", products.update);
  
    // Delete a Product with id
    router.delete("/:id", products.delete);
  
    // Delete all Products
    router.delete("/", products.deleteAll);
  
    app.use('/api/products', router);
};
