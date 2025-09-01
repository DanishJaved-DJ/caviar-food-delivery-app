import Item from "../../models/item.model.js";
import Shop from "../../models/shop.model.js";

const searchItems = async (req, res) => {
  try {
    const { query, city } = req.query;

    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }
    if (!city) {
      return res.status(400).json({ message: "City is required" });
    }

    // Find all shops in that city
    const shopsInCity = await Shop.find({
      city: { $regex: new RegExp(`^${city}$`, "i") },
    });

    if (shopsInCity.length === 0) {
      return res.status(200).json([]); // No shops found in this city
    }

    const shopIds = shopsInCity.map((s) => s._id);

    // Find items in those shops matching the query
    const items = await Item.find({
      shop: { $in: shopIds },
      $or: [
        { name: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
      ],
    }).populate("shop", "name city state");

    return res.status(200).json(items);
  } catch (error) {
    console.error("Search error:", error);
    return res.status(500).json({ message: `Search error: ${error.message}` });
  }
};

export default searchItems;
