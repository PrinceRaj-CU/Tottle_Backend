import asyncHandler from "express-async-handler";
import { TweetModel } from "../model/tweet-model.js";
import { UserModel } from "../model/user-model.js";
import cloudinary from "../utils/cloudinary.js";
export const createTweet = asyncHandler(async (req, res) => {
    
    try {
        
        const { image, description  ,userOwner} = req.body;
        let userDetail = await UserModel.findById(userOwner);
        console.log("userdetail", userDetail);
        const img= await cloudinary.uploader.upload(image,{ folder:"post"})
       
        const tweetData={name:userDetail.name,
            email:userDetail.email,
            image:{ public_id: img.public_id,
            url: img.secure_url},
            userImage:userDetail.image.url,
            description,
            userOwner}

        console.log("tddd",tweetData);
        const newTweet = await TweetModel.create(
            {name:userDetail.name,
                email:userDetail.email,
                image:{ public_id: img.public_id,
                url: img.secure_url},
                userImage:userDetail.image.url,
                description,
                userOwner}
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
        
        let tweets = await TweetModel.find({ });
        res.json( tweets);
        

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});