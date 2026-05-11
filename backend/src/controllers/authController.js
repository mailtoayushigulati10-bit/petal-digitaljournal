const User = require("../models/User");

const PendingUser =
  require("../models/PendingUser");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const { sendOTP } =
  require("../utils/sendEmail");

// ================= REGISTER =================

exports.register = async (req, res) => {

  try {

    const {
      username,
      email,
      password
    } = req.body;

    // CHECK VERIFIED EMAIL

    const existingEmail =
      await User.findOne({
        email
      });

    if (existingEmail) {

      return res.status(400).json({
        message: "Email already exists"
      });

    }

    // CHECK VERIFIED USERNAME

    const existingUsername =
      await User.findOne({
        username
      });

    if (existingUsername) {

      return res.status(400).json({
        message: "Username already taken"
      });

    }

    // HASH PASSWORD

    const hashedPassword =
      await bcrypt.hash(password, 10);

    // GENERATE OTP

    const otp = Math.floor(

      100000 + Math.random() * 900000

    ).toString();

    // STORE IN PENDING USERS

    await PendingUser.findOneAndUpdate(

      { email },

      {
        username,
        email,
        password: hashedPassword,
        otp,
        otpExpiry:
          Date.now() + 5 * 60 * 1000
      },

      {
        upsert: true,
        new: true
      }

    );

    // SEND OTP

    await sendOTP(email, otp);

    res.status(201).json({

      message:
        "OTP sent to email. Verify account."

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

    const pendingUser =
      await PendingUser.findOne({
        email
      });

    if (!pendingUser) {

      return res.status(400).json({
        message:
          "No pending registration found"
      });

    }

    // CHECK OTP

    if (pendingUser.otp !== otp) {

      return res.status(400).json({
        message: "Invalid OTP"
      });

    }

    // CHECK OTP EXPIRY

    if (
      pendingUser.otpExpiry < Date.now()
    ) {

      return res.status(400).json({
        message: "OTP expired"
      });

    }

    // CREATE REAL USER

    const user = await User.create({

      username:
        pendingUser.username,

      email:
        pendingUser.email,

      password:
        pendingUser.password,

      isVerified: true

    });

    // DELETE PENDING USER

    await PendingUser.deleteOne({
      email
    });

    res.json({

      message:
        "Email verified successfully",

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

    const {
      identifier,
      password
    } = req.body;

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

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {

      return res.status(400).json({
        message:
          "Invalid credentials"
      });

    }

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