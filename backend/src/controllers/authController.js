const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendOTP } = require("../utils/sendEmail");

exports.register = async (req, res) => {

  try {

    const {
      username,
      email,
      password
    } = req.body;

    // CHECK EMAIL

    const existingEmail = await User.findOne({
      email
    });

    if (existingEmail) {
      return res.status(400).json({
        message: "Email already exists"
      });
    }

    // CHECK USERNAME

    const existingUsername = await User.findOne({
      username
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

    // CREATE USER

    const user = await User.create({

      username,

      email,

      password: hashedPassword,

      otp,

      otpExpiry: Date.now() + 5 * 60 * 1000

    });

    // SEND OTP EMAIL

    await sendOTP(email, otp);

    res.status(201).json({
      message: "OTP sent to email. Verify account."
    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

};

exports.verifyOTP = async (req, res) => {

  try {

    const {
      email,
      otp
    } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found"
      });
    }

    if (user.otp !== otp) {
      return res.status(400).json({
        message: "Invalid OTP"
      });
    }

    if (user.otpExpiry < Date.now()) {
      return res.status(400).json({
        message: "OTP expired"
      });
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpiry = null;

    await user.save();

    res.json({
      message: "Email verified successfully"
    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

};

exports.login = async (req, res) => {

  try {

    const {
      identifier,
      password
    } = req.body;

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

    // TOKEN

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

};