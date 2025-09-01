import DeliveryLocation from "../../models/deliveryAssignment.model.js";

export const myLocation = async (req, res) => {
  try {
    const location = await DeliveryLocation.findOne({ deliveryBoy: req.userId });
    return res.status(200).json(location);
  } catch (error) {
    return res.status(500).json({ message: `my location error: ${error}` });
  }
};
