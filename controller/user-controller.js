import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import cloudinary from "../utils/cloudinary.js";
import { UserModel } from "../model/user-model.js";
export const createUser = asyncHandler(async (req, res) => {
    console.log(req.body)
    try {
        const { name, email, password ,image} = req.body;

        let user = await UserModel.findOne({ email });
        if (user) {
            return res
                .status(400)
                .json({ success: false, message: "User already exists" });
        }
        const img= await cloudinary.uploader.upload(image,{ folder:"userimage"})
        const hashedPassword=await bcrypt.hash(password,10);
        const newUser = await UserModel.create({
            name,
            email,
            password:hashedPassword,
            image:{ public_id: img.public_id,
                 url: img.secure_url},
            

        });
        await newUser.save();
        res.json({message:"user registered!"});
        

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
})

// Login User

export const loginUser = asyncHandler(async (req, res, next) => {
    const {email, password}=req.body;
    const user=await UserModel.findOne({email});
    if(!user){ return res.json({message:"User does not Exist"});
        }
   
   const hPassword=await bcrypt.compare(password,user.password);
   if(!hPassword){
   return res.json({message:"Wrong Password"});}
   const token= jwt.sign({id:user._id}, "predator");
   res.json({token, userDetail:{ name: user.name, email: user.email, image: user.image.url}, userID:user._id});
});
export const verifyToken=(req,res,next)=>{
    const token= req.headers.authorization;
    if(token){
      jwt.verify(token,"predator",(err)=>{
        if(err) return res.sendStatus(403);
        next();
      });

    }
    else{ res.sendStatus(401);}
   };