import Order from "../../models/order.model.js";

export const getDeliveryBoyAssignments = async (req, res) => {
  try {
    const orders = await Order.find({ deliveryBoy: req.userId, status: "ASSIGNED" })
      .populate("shop")
      .populate("customer");

    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ message: `get assignments error: ${error}` });
  }
};
