import userModel from "../models/userModel.js";
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// Rout for user login a

const createToken =  (id) =>{
  return jwt.sign({id},process.env.JWT_SECRET)
}


const loginUser  = async (req,res) =>{

    try {
        const {email,password} = req.body;
        //checking if user exist or not
        const user = await userModel.findOne({email});
        
        if(!user){
            return  res.json({success:false,message:"User does not exist"});
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if(isMatch){
            const token = createToken(user._id);
            res.json({success:true,token})
        }
        else{
            res.json({success:false,message:"Invalid credentials"});
        }

    } catch (error) {
      res.status(500).json({success:false,message:"Internal server error"});
    } 

}


// Rout for user registeration

const registerUser = async (req,res) =>{
   try {
     let {name,email,password} = req.body;
      //checking if user exist or not
      const exists = await userModel.findOne({email});
      if(exists){
       return  res.json({success:false,message:"User already exists"});
      }
     //validating email and password
       if(!validator.isEmail(email)){
         return  res.json({success:false,message:"please enter a valid email"});
       }

       if(password.length < 8){
            return  res.json({success:false,message:"password must be at least 8 characters"});
       }

         //hashing user password
         const salt = await bcrypt.genSalt(10);
         const hashedPassword = await bcrypt.hash(password,salt);

         const newUser = new userModel({
            name,
            email,
            password:hashedPassword,
         });

         const user = await newUser.save();
          
         const token = createToken(user._id);
         res.json({success:true,token})

   } catch (error) {
     res.status(500).json({success:false,message:"Internal server error"});
   }
}

// route for admin login


const adminLogin = async (req,res) =>{

  try {
     const {email,password} = req.body;
      if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
        const token = jwt.sign(email+password,process.env.JWT_SECRET);
        res.json({success:true,token})
      }
      else{
        res.json({success:false,message:"Invalid credentials"})
      }
  } 
  
  catch (error) {
    res.status(500).json({success:false,message:"server error"});
  }

}


export {loginUser,registerUser,adminLogin};
