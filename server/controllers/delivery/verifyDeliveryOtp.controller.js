import Order from "../../models/order.model.js";

export const verifyDeliveryOtp = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { otp } = req.body;

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (order.deliveryOtp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    order.status = "DELIVERED";
    await order.save();

    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json({ message: `verify delivery otp error: ${error}` });
  }
};
