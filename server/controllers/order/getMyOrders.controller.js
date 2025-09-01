import Order from "../../models/order.model.js";

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ customer: req.userId })
      .populate("shop")
      .populate("items.item")
      .sort({ createdAt: -1 });

    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ message: `get my orders error: ${error}` });
  }
};
