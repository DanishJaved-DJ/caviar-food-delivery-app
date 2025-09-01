import bcrypt from "bcryptjs";
import genToken from "../../config/token.js";
import User from "../../models/user.model.js";

const signIn = async (req, res) => {
  try {
    const { password, email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect Password!" });
    }

    const token = await genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 10 * 365 * 24 * 60 * 60 * 1000,
      secure: false,
      sameSite: "Strict",
    });

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: `Signin error: ${error}` });
  }
};

export default signIn;
