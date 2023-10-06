function checkIdParam(req, res, next) {
  const id = req.params.id;
  if (!id || isNaN(Number(id))) {
    res.status(400).json({
      message: "Invalid or missing 'id' parameter. 'id' must be a number.",
    });
    return;
  }
  next();
}

module.exports = (app) => {
  const query = require("../controllers/order-product.controller.js");

  var router = require("express").Router();

  // Create routes for each query
  router.get("/allCustomersAndOrders", query.listAllCustomersAndOrders);
  router.get(
    "/customerAndOrders/:id",
    checkIdParam,
    query.findCustomerAndOrders
  );
  router.get("/allOrdersAndProducts", query.listAllOrdersAndProducts);
  router.get("/orderAndProducts/:id", checkIdParam, query.findOrderAndProducts);
  router.post("/", query.create);

  app.use("/api/data", router);
};
