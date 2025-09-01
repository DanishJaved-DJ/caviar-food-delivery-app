import Order from "../../models/order.model.js";
import moment from "moment";

export const getTodayStats = async (req, res) => {
  try {
    const start = moment().startOf("day");
    const end = moment().endOf("day");

    const orders = await Order.find({
      deliveryBoy: req.userId,
      status: "DELIVERED",
      updatedAt: { $gte: start, $lte: end },
    });

    return res.status(200).json({
      deliveredCount: orders.length,
    });
  } catch (error) {
    return res.status(500).json({ message: `today stats error: ${error}` });
  }
};
