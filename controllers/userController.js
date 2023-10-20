// controllers/userController.js
const User = require('../models/User');

exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    next(error); 
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.send(user);
  } catch (error) {
    next(error); 
  }
};

exports.getUsersByFirstName = async (req, res, next) => {
  try {
    const firstName = req.query.firstName;
    if (!firstName) {
      res.status(400).json({ error: "Missing 'first' parameter" });
      return;
    }
    const users = await User.findAll({
      where: {
        firstName: firstName,
      },
    });
    res.send(users);
  } catch (error) {
    next(error); 
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const { firstName, lastName } = req.query;
    const where = {};
    if (firstName) where.firstName = firstName;
    if (lastName) where.lastName = lastName;
    
    const users = await User.findAll({ where });
    res.send(users);
  } catch (error) {
    next(error); 
  }
};
