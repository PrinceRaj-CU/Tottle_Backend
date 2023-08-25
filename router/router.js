import express from "express";
const router = express.Router();
import userRouter from "./userRoutes.js";
import tweetRouter from "./tweetRoutes.js";
router.use("/auth",userRouter);
router.use("/tweet", tweetRouter)

export default router;