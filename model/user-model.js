import mongoose from "mongoose";
const UserSchema =new mongoose.Schema(
{  
  name :{type:String,
    required :true,
       unique:true
     },
    email :{type:String,
              required :true,
                 unique:true
               },
    password:{ type:String,
                required: true  },
    image:{ public_id:{
        type: String,required:true
    },
    url:{
        type: String,
        required: true
    }
         },
    
}); 
 export const UserModel =mongoose.model("users",UserSchema);
 