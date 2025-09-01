import Order from "../../models/order.model.js";

export const getOwnerOrders = async (req, res) => {
  try {
    const orders = await Order.find({ shopOwner: req.userId })
      .populate("customer")
      .populate("items.item")
      .sort({ createdAt: -1 });

    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ message: `get owner orders error: ${error}` });
  }
};
