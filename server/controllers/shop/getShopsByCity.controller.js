import Shop from "../../models/shop.model.js";

const getShopsByCity = async (req, res) => {
  try {
    const { city } = req.params;

    if (!city) {
      return res.status(400).json({ message: "City parameter is required" });
    }

    const shops = await Shop.find({
      city: { $regex: new RegExp(`^${city}$`, "i") },
    });

    if (shops.length === 0) {
      return res.status(404).json({ message: "No shops found in this city" });
    }

    return res.status(200).json(shops);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `get shop by city error ${error}` });
  }
};

export default getShopsByCity;
