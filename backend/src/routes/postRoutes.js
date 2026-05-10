const router = require("express").Router();

const authMiddleware =
require("../middleware/authMiddleware");

const upload =
require("../middleware/upload");

const {

  createPost,

  getPosts,

  deletePost,

  updatePost

} = require("../controllers/postController");

// CREATE POST

router.post(

  "/",

  authMiddleware,

  upload.single("media"),

  createPost

);

// GET ALL POSTS

router.get("/", getPosts);

// DELETE POST

router.delete(

  "/:id",

  authMiddleware,

  deletePost

);

// EDIT POST

router.put(

  "/:id",

  authMiddleware,

  updatePost

);

module.exports = router;