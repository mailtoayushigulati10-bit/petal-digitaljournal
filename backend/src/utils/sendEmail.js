const nodemailer =
  require("nodemailer");

const transporter =
  nodemailer.createTransport({

    service: "gmail",

    auth: {
      user:
        process.env.EMAIL_USER,

      pass:
        process.env.EMAIL_PASS
    }

  });

exports.sendOTP =
  async (email, otp) => {

    await transporter.sendMail({

      from:
        process.env.EMAIL_USER,

      to: email,

      subject:
        "Your Petal OTP 🌸",

      html: `
        <div style="font-family:sans-serif">
          <h2>Your OTP is:</h2>
          <h1>${otp}</h1>
          <p>Valid for 5 minutes.</p>
        </div>
      `

    });

  };
