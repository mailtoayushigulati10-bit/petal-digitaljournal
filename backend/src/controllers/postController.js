const Post = require("../models/Post");

const cloudinary = require("../config/cloudinary");

// CREATE POST

exports.createPost = async (req, res) => {

  try {

    const result = await cloudinary.uploader.upload(

      req.file.path,

      {
        resource_type: "auto"
      }

    );

    const post = await Post.create({

      user: req.user.id,

      caption: req.body.caption,

      media: result.secure_url,

      song: req.body.song

    });

    res.status(201).json(post);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

};

// GET POSTS

exports.getPosts = async (req, res) => {

  try {

    const posts = await Post.find()

      .populate("user")

      .sort({ createdAt: -1 });

    res.json(posts);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

};

// DELETE POST

exports.deletePost = async (req, res) => {

  try {

    const post = await Post.findById(
      req.params.id
    );

    if (!post) {

      return res.status(404).json({
        message: "Post not found"
      });

    }

    // only owner can delete

    if (
      post.user.toString() !== req.user.id
    ) {

      return res.status(401).json({
        message: "Unauthorized"
      });

    }

    await Post.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Post deleted"
    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

};

// UPDATE POST

exports.updatePost = async (req, res) => {

  try {

    const post = await Post.findById(
      req.params.id
    );

    if (!post) {

      return res.status(404).json({
        message: "Post not found"
      });

    }

    // only owner can edit

    if (
      post.user.toString() !== req.user.id
    ) {

      return res.status(401).json({
        message: "Unauthorized"
      });

    }

    const updatedPost =
      await Post.findByIdAndUpdate(

        req.params.id,

        {
          caption: req.body.caption,
          song: req.body.song
        },

        {
          new: true
        }

      );

    res.json(updatedPost);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

};