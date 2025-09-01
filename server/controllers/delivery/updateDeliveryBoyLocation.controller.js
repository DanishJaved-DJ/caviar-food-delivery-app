import DeliveryLocation from "../../models/deliveryAssignment.model.js";

export const updateDeliveryBoyLocation = async (req, res) => {
  try {
    const { lat, lng } = req.body;

    const location = await DeliveryLocation.findOneAndUpdate(
      { deliveryBoy: req.userId },
      { lat, lng },
      { new: true, upsert: true }
    );

    return res.status(200).json(location);
  } catch (error) {
    return res.status(500).json({ message: `update location error: ${error}` });
  }
};
