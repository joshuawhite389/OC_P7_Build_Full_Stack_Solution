const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/users');

// use bcrypt to hash the password and save the user to the database
exports.signup = (req, res, next) => {
  const user = User.create({
    username: req.body.username,
    password: req.body.password,
  });
  res.send({
    token: 'test123',
  });
};

// use bcrypt to compare the password and send a token to the user
exports.login = (req, res, next) => {
  res.send({
    token: 'test123',
  });
};
