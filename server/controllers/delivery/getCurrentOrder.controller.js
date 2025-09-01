import Order from "../../models/order.model.js";

export const getCurrentOrder = async (req, res) => {
  try {
    const order = await Order.findOne({ deliveryBoy: req.userId, status: { $ne: "DELIVERED" } })
      .populate("shop")
      .populate("customer");

    return res.status(200).json(order || null);
  } catch (error) {
    return res.status(500).json({ message: `get current order error: ${error}` });
  }
};
