import Order from "../../models/order.model.js";
import moment from "moment";

export const getMonthStats = async (req, res) => {
  try {
    const start = moment().startOf("month");
    const end = moment().endOf("month");

    const orders = await Order.find({
      deliveryBoy: req.userId,
      status: "DELIVERED",
      updatedAt: { $gte: start, $lte: end },
    });

    return res.status(200).json({
      deliveredCount: orders.length,
    });
  } catch (error) {
    return res.status(500).json({ message: `month stats error: ${error}` });
  }
};
