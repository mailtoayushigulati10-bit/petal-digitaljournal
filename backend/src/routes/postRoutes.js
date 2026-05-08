const router = require("express").Router();

const authMiddleware = require("../middleware/authMiddleware");

const upload = require("../middleware/upload");

const {
  createPost,
  getPosts
} = require("../controllers/postController");

router.post(
  "/",
  authMiddleware,
  upload.single("media"),
  createPost
);

router.get("/", getPosts);

module.exports = router;