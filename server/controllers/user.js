const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const { read } = require('fs');

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

    res
      .status(200)
      .json({ userId: user.user_id, token, username: user.username });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// delete the user from the database
exports.deleteAccount = async (req, res, next) => {
  try {
    const userId = req.params.id; // Use req.params for URL parameters

    // Check if the user exists
    const user = await User.findOne({ where: { user_id: userId } });

    if (!user) {
      return res.status(401).json({ error: 'User not found!' });
    }

    // Delete the user
    await User.destroy({ where: { user_id: userId } });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get the posts that the user has read
exports.getReadPosts = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await User.findOne({ where: { user_id: userId } });
    const readPosts = user.read_posts;
    res.status(200).json({ readPosts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// add the post to the user's read_posts
exports.addReadPost = async (req, res, next) => {
  try {
    const userId = req.body.userId;
    const user = await User.findOne({ where: { user_id: userId } });
    const post_id = req.body.post_id;
    let readPosts = user.read_posts;
    if (!readPosts) {
      readPosts = post_id;
    } else {
      let readPostsArray = readPosts.split(',');
      if (!readPostsArray.includes(post_id)) {
        readPostsArray.push(post_id);
        readPosts = readPostsArray.join(',');
      }
    }
    await User.update(
      { read_posts: readPosts },
      { where: { user_id: userId } }
    );
    res.status(200).json({ message: 'Post added to read_posts' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
