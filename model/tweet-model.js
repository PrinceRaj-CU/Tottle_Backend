import mongoose from "mongoose";
const TweetSchema = new mongoose.Schema({
  name: { type: String},
  description: { type: String },
  email: { type: String,  },
  userImage: { type: String,  },
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
    ref: "users"
    
  }
});
export const TweetModel = mongoose.model("tweets", TweetSchema);
