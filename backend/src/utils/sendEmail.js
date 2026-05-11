const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  port: 587,
  secure: false,
  tls: {
    rejectUnauthorized: false,
  },
});

const sendOTP = async (email, otp) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Petal Email Verification",
    html: `
      <h2>Your OTP is ${otp}</h2>
      <p>This OTP expires in 5 minutes.</p>
    `,
  });
};

module.exports = { sendOTP };