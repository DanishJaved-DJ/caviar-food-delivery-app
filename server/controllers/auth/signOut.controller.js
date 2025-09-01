const signOut = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "Sign out successfully" });
  } catch (error) {
    return res.status(500).json({ message: `Signout error: ${error}` });
  }
};

export default signOut;
