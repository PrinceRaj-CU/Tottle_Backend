import mongoose from "mongoose";
const TweetSchema = new mongoose.Schema({
  name: { type: String},
  description: { type: String },
  email: { type: String ,unique: false   },
  userImage: { type: String },
  image: {
    public_id: {
      type: String
      
    },
    url: {
      type: String
      
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
  userOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    unique:false
    
  },
  likes: [{ type: mongoose.Schema.Types.ObjectId,
    unique:true,
    ref: "users",}]
});
export const TweetModel = mongoose.model("tweets", TweetSchema);
