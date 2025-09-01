import Order from "../../models/order.model.js";

export const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId)
      .populate("customer")
      .populate("shop")
      .populate("items.item");

    if (!order) return res.status(404).json({ message: "Order not found" });

    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json({ message: `get order by id error: ${error}` });
  }
};
