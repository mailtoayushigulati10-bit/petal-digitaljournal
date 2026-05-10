const nodemailer = require("nodemailer");

// CREATE TRANSPORTER
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // MUST be App Password
  },
});

// VERIFY CONNECTION (IMPORTANT DEBUG STEP)
transporter.verify((error, success) => {
  if (error) {
    console.log("❌ Email transporter error:", error);
  } else {
    console.log("✅ Email transporter ready");
  }
});

// SEND OTP FUNCTION
const sendOTP = async (email, otp) => {
  await transporter.sendMail({
    from: `"Petal App" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Email Verification OTP",
    html: `
      <div>
        <h2>Your OTP Code</h2>
        <p><b>${otp}</b></p>
        <p>This OTP expires in 5 minutes.</p>
      </div>
    `,
  });
};

module.exports = { sendOTP };