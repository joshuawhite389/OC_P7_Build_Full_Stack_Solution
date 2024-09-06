const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/users');

// use bcrypt to hash the password and save the user to the database
exports.signup = async (req, res, next) => {
  try {
    // Check if the username already exists
    const existingUser = await User.findOne({
      where: { username: req.body.username },
    });

    if (existingUser) {
      console.log('Username already exists');
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Hash the password
    const hash = await bcrypt.hash(req.body.password, 10);

    // Create a new user if the username is unique
    const user = await User.create({
      username: req.body.username,
      password: hash,
    });

    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// use bcrypt to compare the password and send a token to the user
exports.login = async (req, res, next) => {
  try {
    // Check if the user exists
    const user = await User.findOne({ where: { username: req.body.username } });

    if (!user) {
      return res.status(401).json({ error: 'User not found!' });
    }

    // Compare the password
    const valid = await bcrypt.compare(req.body.password, user.password);

    if (!valid) {
      return res.status(401).json({ error: 'Incorrect password!' });
    }

    // Generate JWT token using user_id 
    const token = jwt.sign({ userId: user.user_id }, 'RANDOM_TOKEN_SECRET', {
      expiresIn: '24h',
    });

    res.status(200).json({ userId: user.user_id, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
