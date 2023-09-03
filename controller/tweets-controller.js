import asyncHandler from "express-async-handler";
import { TweetModel } from "../model/tweet-model.js";
import { UserModel } from "../model/user-model.js";
import cloudinary from "../utils/cloudinary.js";
import { response } from "express";
export const createTweet = asyncHandler(async (req, res) => {
    
    try {
        var img="";
         
        const { image, description  ,userOwner} = req.body;
        
        const userDetail = await UserModel.findById(userOwner);
       
        if(image){ img= await cloudinary.uploader.upload(image,{ folder:"post"})}
       
        const tweetData= {name:userDetail.name,
            email:userDetail.email,
            image:{ public_id: img.public_id,
            url: img.secure_url},
            userImage:userDetail.image.url,
            description,
            userOwner}

        
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


export const likeVal= asyncHandler(async (req,res)=>{
    try {
      
         const array =twe
      

    }
    catch (err) {
        res.json({likeError:err.message});
    }

})


export const likefn= asyncHandler(async (req,res)=>{
    try {
       
         const data = await TweetModel.find({$and:[{_id: req.params.id}, {likes: req.body.id}]});
        
       if(data.length>=1){
        console.log("fail");
        const data = await TweetModel.updateOne({ _id:req.params.id}, { $pull: { likes: req.body.id } });
        console.log("false");
        res.json({value:"deleted"});
        
       }
       if(data.length==0){  
        console.log("pass");
        const data = await TweetModel.updateOne({ _id:req.params.id}, { $push: { likes: req.body.id } });
        console.log("true");
        res.json({value:"added"});
       }
      
 
    }
    catch (err) {
        res.json({likeError:err.message});
    }

})