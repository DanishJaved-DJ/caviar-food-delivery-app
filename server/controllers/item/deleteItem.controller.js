import uploadOnCloudinary from "../../config/cloudinary.js";
import Item from "../../models/item.model.js";

const editItem = async (req, res) => {
  try {
    const { name, category, type, price } = req.body;
    const { itemId } = req.params;

    let image;
    if (req.file) {
      image = await uploadOnCloudinary(req.file.path);
    }

    const item = await Item.findByIdAndUpdate(
      itemId,
      { name, category, type, price, image },
      { new: true }
    );

    if (!item) {
      return res.status(400).json({ message: "Item not found" });
    }

    await item.populate("shop");
    return res.status(200).json(item);
  } catch (error) {
    return res.status(500).json({ message: `Edit item error: ${error.message}` });
  }
};

export default editItem;
