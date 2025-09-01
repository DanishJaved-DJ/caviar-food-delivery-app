import genToken from "../../config/token.js";
import User from "../../models/user.model.js";

const googleAuth = async (req, res) => {
  try {
    const { fullName, email, role, mobile } = req.body;

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        fullName,
        email,
        role,
        mobile,
      });
    }

    const token = await genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 10 * 365 * 24 * 60 * 60 * 1000,
      secure: false,
      sameSite: "Strict",
    });

    return res.status(201).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: `Google auth error: ${error}` });
  }
};

export default googleAuth;
