import express from "express"

import getAllShops from "../controllers/shop/getAllShops.controller.js";
import addShop from "../controllers/shop/addShop.controller.js";
import getCurrentShop from "../controllers/shop/getCurrentShop.controller.js";
import getShopsByCity from "../controllers/shop/getShopsByCity.controller.js";
import getShopById from "../controllers/shop/getShopById.controller.js";


import isAuth from "../middlewares/isAuth.js"
import { upload } from "../middlewares/multer.js"



const shopRouter=express.Router();

shopRouter.get("/getall",isAuth,getAllShops);
shopRouter.get("/getcurrent",isAuth,getCurrentShop);
shopRouter.post("/editshop",isAuth,upload.single("image"),addShop);
shopRouter.get("/getshopsbycity/:city",isAuth,getShopsByCity);
shopRouter.get("/getshopbyid/:shopId",isAuth,getShopById);

export default shopRouter;