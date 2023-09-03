import express from "express";
import { createTweet, getTweet ,likefn} from "../controller/tweets-controller.js";
import {verifyToken} from '../middleware/reqAuth.js'
const tweetRouter= express.Router();

tweetRouter.route("/").post( verifyToken, createTweet).get( getTweet);
tweetRouter.route("/:id").put(verifyToken,likefn);

 export default tweetRouter; 