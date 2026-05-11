const express = require("express");

const cors = require("cors");

const authRoutes =
  require("./routes/authRoutes");

const postRoutes =
  require("./routes/postRoutes");

const app = express();

app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true
  })
);

app.use("/api/auth", authRoutes);

app.use("/api/posts", postRoutes);

module.exports = app;