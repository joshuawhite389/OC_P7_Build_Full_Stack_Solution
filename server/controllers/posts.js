const Posts = require("../models/posts");
const User = require('../models/users');
const fs = require("fs");

// Get all posts
exports.getPosts = (req, res, next) => {
  Posts.findAll()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

// create new post
exports.addPost = async (req, res) => {

  const user = await User.findOne({
    where: {
      user_id: req.body.user_id,
    }
  });

  const username = user.username;

  await Posts.create({
      user_id: req.body.user_id,
      username: username,
      title: req.body.title,
      content: req.body.content,
  });

  const result = await Posts.findAll();
  res.status(201).json(result);
}