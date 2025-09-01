import express from "express"
import isAuth from "../middlewares/isAuth.js"
import { upload } from "../middlewares/multer.js"

import addItem from "../controllers/item/addItem.controller.js";
import getItemsByShop from "../controllers/item/getItemsByShop.controller.js";
import getItemsByCity from "../controllers/item/getItemsByCity.controller.js";
import getItemById from "../controllers/item/getItemById.controller.js";
import editItem from "../controllers/item/editItem.controller.js";
import deleteItem from "../controllers/item/deleteItem.controller.js";


const itemRouter=express.Router();

itemRouter.get("/getitemsbyshop/:shopId",isAuth,getItemsByShop);
itemRouter.get("/getitemsbycity/:city",isAuth,getItemsByCity);
itemRouter.post("/additem",isAuth,upload.single("image"),addItem);
itemRouter.post("/edititem/:itemId",isAuth,upload.single("image"),editItem);
itemRouter.get("/delete/:itemId",isAuth,deleteItem);
itemRouter.get("/getbyid/:itemId",isAuth,getItemById);

export default itemRouter;