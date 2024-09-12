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

// delete post
exports.deletePost = async (req, res) => {
  const post = await Posts.findOne({
    where: {
      post_id: req.body.post_id,
    }
  });

  if (post) {
    await Posts.destroy({
      where: {
        post_id: req.body.post_id,
      }
    });
  } else {
    res.status(404).json({
      message: 'Post not found'
    });
  }

  const result = await Posts.findAll();
  res.status(200).json(result);
}