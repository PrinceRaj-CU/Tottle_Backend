import asyncHandler from "express-async-handler";
import { TweetModel } from "../model/tweet-model.js";
import { UserModel } from "../model/user-model.js";
import cloudinary from "../utils/cloudinary.js";
export const createTweet = asyncHandler(async (req, res) => {
    
    try {
        var img="";
         console.log("ff");
        const { image, description  ,userOwner} = req.body;
        console.log("body",req.body);
        const userDetail = await UserModel.findById(userOwner);
        console.log(userDetail);
        if(image){ img= await cloudinary.uploader.upload(image,{ folder:"post"})}
       
        const tweetData= {name:userDetail.name,
            email:userDetail.email,
            image:{ public_id: img.public_id,
            url: img.secure_url},
            userImage:userDetail.image.url,
            description,
            userOwner}

        console.log("tddd",tweetData);
        const newTweet = await TweetModel.create(
            tweetData
        );
        await newTweet.save();
        res.json({message:"Posted"});
        

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
export const getTweet = asyncHandler(async (req, res, next) => {
    console.log(req.body)
    try {
        
        let tweets = await TweetModel.find({ }).sort({ date: -1 });
        res.json( tweets);
        

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});