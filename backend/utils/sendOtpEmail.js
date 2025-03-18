const nodemailer = require("nodemailer");

const sendOtpEmail = async (email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "ahmadalnajjar609@gmail.com", // 🔹 Replace with your Gmail
        pass: "nmog ktld zikl fole", // 🔹 Replace with App Password (not your actual password)
      },
    });

    const mailOptions = {
      from: "",
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP for signup is: ${otp}. It is valid for 10 minutes.`,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ OTP Email sent to ${email}`);
  } catch (error) {
    console.error("❌ Error sending OTP email:", error);
  }
};

module.exports = sendOtpEmail;
