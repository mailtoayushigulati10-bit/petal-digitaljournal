const router = require("express").Router();

const {
  register,
  login,
  verifyOTP
} = require("../controllers/authController");

// REGISTER

router.post("/register", register);

// VERIFY OTP

router.post("/verify", verifyOTP);

// LOGIN

router.post("/login", login);

module.exports = router;