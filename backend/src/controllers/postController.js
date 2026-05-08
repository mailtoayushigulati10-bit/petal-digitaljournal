const Post = require("../models/Post");
const cloudinary = require("../config/cloudinary");

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