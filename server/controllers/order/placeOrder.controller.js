import Order from "../../models/order.model.js";

export const placeOrder = async (req, res) => {
  try {
    const { items, shopId, address, paymentMethod } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items provided" });
    }

    const order = await Order.create({
      customer: req.userId,
      items,
      shop: shopId,
      address,
      paymentMethod,
      status: "PLACED",
    });

    return res.status(201).json(order);
  } catch (error) {
    return res.status(500).json({ message: `place order error: ${error}` });
  }
};
