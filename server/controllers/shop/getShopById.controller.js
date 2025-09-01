import Shop from "../../models/shop.model.js";

const getShopById = async (req, res) => {
  try {
    const { shopId } = req.params;
    const shop = await Shop.findById(shopId);

    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }

    return res.status(200).json(shop);
  } catch (error) {
    return res.status(500).json({ message: `get shop by id error ${error}` });
  }
};

export default getShopById;
