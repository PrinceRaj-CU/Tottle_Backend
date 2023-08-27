import  jwt  from "jsonwebtoken";
export const verifyToken= (req,res,next)=>{
    
    const authorization = req.headers['authorization'];
   
    if(!authorization){
        return res.status(401).json({ 
            message:"auth not found"
        });
    }
   
    try {
      const {id}=  jwt.verify(authorization, "mango")
      next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            error:"false authorised"
        })
    }
   };