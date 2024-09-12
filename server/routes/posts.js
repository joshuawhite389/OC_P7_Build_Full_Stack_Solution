const express = require("express");
const router = express.Router();

const userController = require("../controllers/posts");

router.get("/", userController.getPosts);
router.get("/:id", userController.getOnePost);
router.post("/newPost", userController.addPost);
router.delete("/deletePost", userController.deletePost);

module.exports = router;