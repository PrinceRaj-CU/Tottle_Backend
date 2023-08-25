import express from "express";
import { loginUser,createUser } from "../controller/user-controller.js";

const userRouter= express.Router();

userRouter.route("/login").post(loginUser);
userRouter.route("/register").post(createUser);
 export default userRouter;