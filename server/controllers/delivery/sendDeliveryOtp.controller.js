import Order from "../../models/order.model.js";

export const sendDeliveryOtp = async (req, res) => {
  try {
    const { orderId } = req.params;
    const otp = Math.floor(1000 + Math.random() * 9000);

    const order = await Order.findByIdAndUpdate(orderId, { deliveryOtp: otp }, { new: true });

    // send otp via SMS/Email (stubbed)
    console.log(`OTP for delivery: ${otp}`);

    return res.status(200).json({ success: true, otp });
  } catch (error) {
     console.log(error);
     
    return res.status(500).json({ message: `send delivery otp error: ${error}` });
  }
};
