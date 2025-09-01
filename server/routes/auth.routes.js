import express from "express";
import signUp from "../controllers/auth/signUp.controller.js";
import signIn from "../controllers/auth/signIn.controller.js";
import signOut from "../controllers/auth/signOut.controller.js";
import googleAuth from "../controllers/auth/googleAuth.controller.js";
import sendOtp from "../controllers/auth/sendOtp.controller.js";
import verifyOtp from "../controllers/auth/verifyOtp.controller.js";
import resetPassword from "../controllers/auth/resetPassword.controller.js";

const authRouter=express.Router();

authRouter.post("/signup",signUp);
authRouter.post("/signin",signIn);
authRouter.get("/signout",signOut);
authRouter.post("/googleauth",googleAuth);
authRouter.post("/sendotp",sendOtp);
authRouter.post("/verifyotp",verifyOtp);
authRouter.post("/resetpassword",resetPassword);

export default authRouter;