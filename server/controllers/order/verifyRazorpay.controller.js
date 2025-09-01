import crypto from "crypto";
import Order from "../../models/order.model.js";

export const verifyRazorpay = async (req, res) => {
  try {
    const { orderId, paymentId, signature } = req.body;

    const body = orderId + "|" + paymentId;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (signature !== expectedSignature) {
      return res.status(400).json({ message: "Invalid payment signature" });
    }

    const order = await Order.findByIdAndUpdate(
      orderId,
      { status: "CONFIRMED", paymentId },
      { new: true }
    );

    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json({ message: `verify razorpay error: ${error}` });
  }
};
