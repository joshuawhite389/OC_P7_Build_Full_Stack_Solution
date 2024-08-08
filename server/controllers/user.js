const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// use bcrypt to hash the password and save the user to the database
exports.signup = (req, res, next) => {
  res.status(201).json({ message: "User created!" });
};

// use bcrypt to compare the password and send a token to the user
exports.login = (req, res, next) => {
  res.status(201).json({ message: "User logged in!" });
  console.log(req.body);
};
