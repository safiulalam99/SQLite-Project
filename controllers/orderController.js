// controllers/orderController.js
const Order = require('../models/Order');
const User = require('../models/User');

exports.createOrder = async (req, res) => {
    try {
        const order = await Order.create(req.body);
        res.send(order);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.findAll();
        res.send(orders);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getOrder = async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id);
        if (order) {
            res.send(order);
        } else {
            res.status(404).send('Order not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updateOrder = async (req, res) => {
    try {
        const order = await Order.update(req.body, {
            where: { id: req.params.id },
            returning: true,
            plain: true
        });
        res.send("updated");
    } catch (error) {
        res.status(500).send(error.message);
    }
};
