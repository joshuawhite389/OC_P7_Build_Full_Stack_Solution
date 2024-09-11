const express = require("express");
const router = express.Router();

const userController = require("../controllers/posts");

router.get("/", userController.getPosts);
router.post("/newPost", userController.addPost);

module.exports = router;