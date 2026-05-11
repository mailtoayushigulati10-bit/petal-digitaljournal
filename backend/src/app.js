const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");

const app = express();

app.use(cors({
  origin: "https://petal-digitaljournal-ot99.vercel.app",
  credentials: true
}))
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

module.exports = app;