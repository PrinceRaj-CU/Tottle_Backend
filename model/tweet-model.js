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
    ref: "users",}],
  Comment:[
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
      text: {
        type: String,
        required: true,
      },
      name: {
        type: String,
      },
      userImage: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    }
  ]
});
export const TweetModel = mongoose.model("tweets", TweetSchema);
