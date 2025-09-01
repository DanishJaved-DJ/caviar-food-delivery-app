import Shop from "../../models/shop.model.js";

const getAllShops = async (req, res) => {
  try {
    const shops = await Shop.find({}).populate("owner");
    if (shops.length > 0) {
      return res.status(200).json(shops);
    }
    return res.status(404).json({ message: "No shops found" });
  } catch (error) {
    return res.status(500).json({ message: `get all shops error ${error}` });
  }
};

export default getAllShops;
