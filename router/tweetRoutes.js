import express from "express";
import { createTweet, getTweet } from "../controller/tweets-controller.js";
import {verifyToken} from '../middleware/reqAuth.js'
const tweetRouter= express.Router();

tweetRouter.route("/").post(createTweet).get( getTweet);

 export default tweetRouter; 