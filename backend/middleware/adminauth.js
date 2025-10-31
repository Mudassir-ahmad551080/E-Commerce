import jwt from 'jsonwebtoken';
// admin auth middleware

const adminAuth = (req,res,next) =>{
    try {
        const {token} = req.headers
        if(!token){
            return res.json({success:false,message:"Unauthorized access"})
        }
        const token_decode = jwt.verify(token,process.env.JWT_SECRET);
        if(token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            return res.json({success:false,message:"Unauthorized access"})
        }
        next();
    } 
    
    catch (error) {
        return res.json({success:false,message:"Unauthorized access"})   
    }
}

export default adminAuth;