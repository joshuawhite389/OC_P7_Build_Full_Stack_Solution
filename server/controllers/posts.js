const Posts = require('../models/posts');
const User = require('../models/users');
const fs = require('fs');

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

// Get one post
exports.getOnePost = (req, res, next) => {
  Posts.findOne({
    where: {
      post_id: req.params.id,
    },
  })
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

// create new post
exports.addPost = async (req, res) => {
  const user = await User.findOne({
    where: {
      user_id: req.body.user_id,
    },
  });

  const username = user.username;
  const url = req.protocol + '://' + req.get('host');
  console.log('req.protocol:', req.protocol);
  console.log('req.get("host"):', req.get('host'));

  if (req.file) {
    console.log('req.file.filename: ', req.file.filename);
    const imageUrl = url + '/images/' + req.file.filename;
    // If there is an image, create a new post with the image
    const newPost = await Posts.create({
      user_id: req.body.user_id,
      username: username,
      title: req.body.title,
      content: req.body.content,
      image_url: imageUrl,
    });
    console.log('with a picture', newPost.image_url);
  } else {
    // If there is no image, create a new post without the image
    await Posts.create({
      user_id: req.body.user_id,
      username: username,
      title: req.body.title,
      content: req.body.content,
    });
    console.log('without a picture');
  }

  const result = await Posts.findAll();
  res.status(201).json(result);
};

// delete post
exports.deletePost = async (req, res) => {
  try {
    const post = await Posts.findOne({
      where: {
        post_id: req.body.post_id,
      },
    });

    // If post is not found, return 404 and stop further execution
    if (!post) {
      return res.status(404).json({
        message: 'Post not found',
      });
    }

    // Delete the post if found
    await Posts.destroy({
      where: {
        post_id: req.body.post_id,
      },
    });

    // Fetch all remaining posts after deletion
    const result = await Posts.findAll();

    // Send response with the remaining posts
    return res.status(200).json(result);
  } catch (error) {
    // Catch and handle any errors
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};
