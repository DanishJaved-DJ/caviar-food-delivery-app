import sendMail from "../../config/mail.js";
import User from "../../models/user.model.js";

const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    user.resetOtp = otp;
    user.otpExpires = Date.now() + 5 * 60 * 1000;
    user.isOtpVerified = false;

    await user.save();
    await sendMail(email, otp);

    return res.status(200).json({ message: "Email successfully sent" });
  } catch (error) {
    return res.status(500).json({ message: `Send OTP error: ${error}` });
  }
};

export default sendOtp;
