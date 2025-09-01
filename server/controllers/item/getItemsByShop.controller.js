import Item from "../../models/item.model.js";

const getItemsByShop = async (req, res) => {
  try {
    const { shopId } = req.params;
    const items = await Item.find({ shop: shopId });

    if (!items.length) {
      return res
        .status(400)
        .json({ message: "This shop does not have food items" });
    }

    return res.status(200).json(items);
  } catch (error) {
    return res.status(500).json({ message: `Get items error: ${error.message}` });
  }
};

export default getItemsByShop;
