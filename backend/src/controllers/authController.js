
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendOTP } = require("../utils/sendEmail");

// TEMPORARY STORAGE FOR PENDING USERS
const pendingUsers = {};

// ================= REGISTER =================

exports.register = async (req, res) => {

  try {

    const { username, email, password } = req.body;

    // CHECK ONLY VERIFIED EMAILS

    const existingEmail = await User.findOne({
      email,
      isVerified: true
    });

    if (existingEmail) {
      return res.status(400).json({
        message: "Email already exists"
      });
    }

    // CHECK ONLY VERIFIED USERNAMES

    const existingUsername = await User.findOne({
      username,
      isVerified: true
    });

    if (existingUsername) {
      return res.status(400).json({
        message: "Username already taken"
      });
    }

    // HASH PASSWORD

    const hashedPassword = await bcrypt.hash(password, 10);

    // GENERATE OTP

    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    console.log("Generated OTP:", otp);

    // STORE TEMP USER

    pendingUsers[email] = {

      username,

      email,

      password: hashedPassword,

      otp,

      otpExpiry: Date.now() + 5 * 60 * 1000

    };

    // SEND OTP

    try {

      await sendOTP(email, otp);

      console.log("EMAIL SENT SUCCESSFULLY");

    } catch (emailError) {

      console.log("EMAIL ERROR:", emailError);

      return res.status(500).json({
        message: "Failed to send OTP email",
        error: emailError.message
      });

    }

    res.status(201).json({
      message: "OTP sent to email. Verify account."
    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

};

// ================= VERIFY OTP =================

exports.verifyOTP = async (req, res) => {

  try {

    const { email, otp } = req.body;

    const pendingUser = pendingUsers[email];

    if (!pendingUser) {
      return res.status(400).json({
        message: "No pending registration found"
      });
    }

    // CHECK OTP

    if (pendingUser.otp !== otp) {
      return res.status(400).json({
        message: "Invalid OTP"
      });
    }

    // CHECK OTP EXPIRY

    if (pendingUser.otpExpiry < Date.now()) {
      return res.status(400).json({
        message: "OTP expired"
      });
    }

    // CREATE FINAL VERIFIED USER

    const user = await User.create({

      username: pendingUser.username,

      email: pendingUser.email,

      password: pendingUser.password,

      isVerified: true

    });

    // REMOVE TEMP USER

    delete pendingUsers[email];

    res.json({
      message: "Email verified successfully",
      user
    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

};

// ================= LOGIN =================

exports.login = async (req, res) => {

  try {

    const { identifier, password } = req.body;

    // LOGIN WITH EMAIL OR USERNAME

    const user = await User.findOne({
      $or: [
        { email: identifier },
        { username: identifier }
      ]
    });

    if (!user) {
      return res.status(400).json({
        message: "User not found"
      });
    }

    // CHECK VERIFIED

    if (!user.isVerified) {
      return res.status(401).json({
        message: "Please verify email first"
      });
    }

    // CHECK PASSWORD

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    // GENERATE TOKEN

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user
    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

}

