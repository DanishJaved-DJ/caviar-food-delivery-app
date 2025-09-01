import bcrypt from "bcryptjs";
import genToken from "../../config/token.js";
import User from "../../models/user.model.js";

const signUp = async (req, res) => {
  try {
    const { fullName, email, password, role, mobile } = req.body;

    const findByEmail = await User.findOne({ email });
    if (findByEmail) {
      return res.status(400).json({ message: "Email already exists!" });
    }

    if (password && password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      email,
      role,
      mobile,
      password: hashedPassword,
    });

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
    return res.status(500).json({ message: `Signup error: ${error}` });
  }
};

export default signUp;
