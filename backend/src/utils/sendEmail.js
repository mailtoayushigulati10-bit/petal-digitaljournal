
const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendOTP = async (email, otp) => {

  await resend.emails.send({

    from: "onboarding@resend.dev",

    to: email,

    subject: "Petal Email Verification",

    html: `
      <h2>Your OTP is ${otp}</h2>
      <p>This OTP expires in 5 minutes.</p>
    `

  });

};

module.exports = { sendOTP };
