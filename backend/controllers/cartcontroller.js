

// add product in user cart

import userModel from "../models/userModel.js";

const addtoCart = async (req,res) =>{
  try {
    const {userId,itemId,size} = req.body;
    const userData = await userModel.findById(userId);
    let cartData = await userData.cartData;
    if(cartData[itemId]){
        if(cartData[itemId][size]){
            cartData[itemId][size]+=1;
        }
        else{
            cartData[itemId][size] = 1
        }
    }
    else{
        cartData[itemId] = {};
        cartData[itemId][size] = 1;
    }
     
    await userModel.findByIdAndUpdate(userId,{cartData});
    res.json({success:true,message:'Add to Cart'})

  } catch (error) {
    res.json({success:false,message:error.message})
  }
}

// updat the cart of the user
const updateuserCart = async (req,res) =>{

   try {
     const {userId,itemId,size,quantity} = req.body;
    
      const userData = await userModel.findById(userId);
      let cartData = await userData.cartData;
      cartData[itemId][size] = quantity;

      await userModel.findByIdAndUpdate(userId,{cartData});
     res.json({success:true,message:'Cart updated'})

   } catch (error) {
      res.json({success:false,message:error.message});
   }

}


// get user cart data
const getusercartData = async (req,res) =>{

    try {
        const {userId} = req.body;
         const userData = await userModel.findById(userId);
         let cartData = await userData.cartData;
         res.json({success:true,cartData  });

    } catch (error) {
        res.json({success:false,message:error.message});
    }

}


export {addtoCart,updateuserCart,getusercartData};