import Order from "../../models/order.model.js";

export const updateOwnerOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await Order.findById(orderId);

    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = status;
    await order.save();

    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json({ message: `update order status error: ${error}` });
  }
};
