import express from "express";
import { createTweet, getTweet ,likefn ,comment , getComment ,deleteComment,deleteTweet} from "../controller/tweets-controller.js";
import {verifyToken} from '../middleware/reqAuth.js'
const tweetRouter= express.Router();

tweetRouter.route("/").post( verifyToken, createTweet).get( getTweet);
tweetRouter.route("/:id").put(verifyToken,likefn);
tweetRouter.route("/:id").delete(verifyToken,deleteTweet);
tweetRouter.route("/comment/:id").post(verifyToken,comment).get(getComment).delete(verifyToken,deleteComment);

 export default tweetRouter; 