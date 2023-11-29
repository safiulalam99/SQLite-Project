// routes/userRoutes.js

const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.get('/', userController.getUsersByFirstName);
router.put('/:id', userController.updateUser);

module.exports = router;
