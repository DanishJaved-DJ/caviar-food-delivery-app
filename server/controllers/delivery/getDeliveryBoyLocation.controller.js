import DeliveryLocation from "../../models/deliveryAssignment.model.js";

export const getDeliveryBoyLocation = async (req, res) => {
  try {
    const { deliveryBoyId } = req.params;
    const location = await DeliveryLocation.findOne({ deliveryBoy: deliveryBoyId });

    return res.status(200).json(location);
  } catch (error) {
    return res.status(500).json({ message: `get delivery boy location error: ${error}` });
  }
};
