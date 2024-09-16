const express = require("express");
const router = express.Router();

const multer = require("../middleware/multer-config");
const auth = require("../middleware/auth");

const userController = require("../controllers/posts");

router.get("/", auth, userController.getPosts);
router.get("/:id", auth, userController.getOnePost);
router.post("/newPost", auth, multer, userController.addPost);
router.delete("/deletePost", auth, userController.deletePost);
router.post("/updatePost", auth, multer, userController.updatePost);

module.exports = router;