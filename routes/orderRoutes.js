// routes/orderRoutes.js
const express = require('express');
const orderController = require('../controllers/orderController');

const router = express.Router();

router.post('/', orderController.createOrder);
router.get('/', orderController.getOrders);
router.get('/:id', orderController.getOrder);
router.put('/:id', orderController.updateOrder);
router.get('/join/with-users', orderController.getOrdersWithUsers);

module.exports = router;
