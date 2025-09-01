import Item from "../../models/item.model.js";
import Shop from "../../models/shop.model.js";

const getItemsByCity = async (req, res) => {
  try {
    const city = req.params.city;

    if (!city) {
      return res.status(400).json({ message: "City is required" });
    }

    // Find shops in city
    const shopsInCity = await Shop.find({
      city: { $regex: new RegExp(`^${city}$`, "i") },
    });

    if (!shopsInCity.length) {
      return res.status(404).json({ message: "No shops found in this city" });
    }

    const shopIds = shopsInCity.map((shop) => shop._id);

    // Find items for those shops
    const items = await Item.find({
      shop: { $in: shopIds },
      availability: true,
    });

    return res.status(200).json(items);
  } catch (error) {
    return res.status(500).json({ message: `Get items by city error: ${error.message}` });
  }
};

export default getItemsByCity;
