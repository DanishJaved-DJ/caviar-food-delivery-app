import uploadOnCloudinary from "../../config/cloudinary.js";
import Item from "../../models/item.model.js";
import Shop from "../../models/shop.model.js";

const addItem = async (req, res) => {
  try {
    const { name, category, type, price } = req.body;
    const shop = await Shop.findOne({ owner: req.userId });

    if (!shop) {
      return res.status(400).json({ message: "Shop not found" });
    }

    let image;
    if (req.file) {
      image = await uploadOnCloudinary(req.file.path);
    } else {
      return res.status(400).json({ message: "Image is required" });
    }

    const item = await Item.create({
      name,
      category,
      type,
      image,
      price,
      shop: shop._id,
    });

    shop.items.push(item._id);
    await shop.save();

    await shop.populate({
      path: "items",
      options: { sort: { createdAt: -1 } },
    });
    await item.populate("shop");

    return res.status(201).json({ shop, item });
  } catch (error) {
    return res.status(500).json({ message: `Add item error: ${error.message}` });
  }
};

export default addItem;
