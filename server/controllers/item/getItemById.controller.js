import Item from "../../models/item.model.js";

const getItemById = async (req, res) => {
  try {
    const { itemId } = req.params;
    const item = await Item.findById(itemId);

    if (!item) {
      return res.status(400).json({ message: "Item not found" });
    }

    return res.status(200).json(item);
  } catch (error) {
    return res.status(500).json({ message: `Get item error: ${error.message}` });
  }
};

export default getItemById;
