import User from "../../models/user.model.js";

const updateUserLocation = async (req, res) => {
  try {
    const { latitude, longitude } = req.body;
    const userId = req.userId; // populated by JWT middleware

    if (typeof latitude !== "number" || typeof longitude !== "number") {
      return res.status(400).json({
        success: false,
        message: "Invalid coordinates",
      });
    }

    // Update user location in DB
    await User.findByIdAndUpdate(
      userId,
      {
        location: {
          type: "Point",
          coordinates: [longitude, latitude],
        },
      },
      { new: true }
    );

    // Emit real-time event via Socket.IO (optional)
    const io = req.app.get("io");
    if (io) {
      io.emit("user:location:update", {
        userId,
        latitude,
        longitude,
        at: new Date(),
      });
    }

    return res.json({
      success: true,
      message: "Location updated",
    });
  } catch (err) {
    console.error("Update location error:", err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export default updateUserLocation;
