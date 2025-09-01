import express from "express";

import getCurrentUser from "../controllers/user/getCurrentUser.controller.js";
import updateUserLocation from "../controllers/user/updateUserLocation.controller.js";
import searchItems from "../controllers/user/searchItems.controller.js";

import isAuth from "../middlewares/isAuth.js";

const userRouter=express.Router();

userRouter.get("/current",isAuth,getCurrentUser);
userRouter.post("/update-location",isAuth,updateUserLocation);
userRouter.get("/search-items",isAuth,searchItems);

export default userRouter;