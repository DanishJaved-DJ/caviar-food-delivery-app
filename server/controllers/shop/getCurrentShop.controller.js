import Shop from "../../models/shop.model.js";

const getCurrentShop = async (req, res) => {
  try {
    const shop = await Shop.findOne({ owner: req.userId })
      .populate("owner")
      .populate({
        path: "items",
        options: { sort: { createdAt: -1 } },
      });

    if (shop) {
      return res.status(200).json(shop);
    }
    return res.status(404).json({ message: "Shop not found" });
  } catch (error) {
    return res.status(500).json({ message: `get shop error ${error}` });
  }
};

export default getCurrentShop;
