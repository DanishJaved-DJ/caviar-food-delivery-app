import uploadOnCloudinary from "../../config/cloudinary.js";
import Shop from "../../models/shop.model.js";

const addShop = async (req, res) => {
  try {
    const { name, city, state, address } = req.body;
    let image;

    if (req.file) {
      image = await uploadOnCloudinary(req.file.path);
    }

    let shop = await Shop.findOne({ owner: req.userId });

    if (!shop) {
      shop = await Shop.create({
        name,
        city,
        state,
        address,
        image,
        owner: req.userId,
      });
    } else {
      shop.name = name;
      shop.image = image;
      shop.city = city;
      shop.state = state;
      shop.address = address;
      await shop.save();
    }

    await shop.populate("owner");
    return res.status(200).json(shop);
  } catch (error) {
    return res.status(500).json({ message: `add shop error ${error}` });
  }
};

export default addShop;
