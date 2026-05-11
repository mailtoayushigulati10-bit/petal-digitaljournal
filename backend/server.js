
const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");

const mongoose = require("mongoose");
require("dotenv").config();

const app = require("./src/app");

mongoose.connect(process.env.MONGO_URI)

.then(() => {
  console.log("MongoDB Connected");
})

.catch(err => console.log(err));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

