import orderModel from "../models/orderModel.js";
import userModel from '../models/userModel.js'
// import Strip from 'stripe'
//placing order using the cod
// global veriable
const currency = "pkr";
const deliveryCharges = 200;
// getway  initiliaze
// let strip  = new Strip(process.env.STRIP_SECRET_KEY)
const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address,paymentMethod } = req.body;
        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod,
            payment: paymentMethod === "COD" ? false : false,
            date: Date.now(),

        }

        const newOrder = new orderModel(orderData);
        await newOrder.save();
        await userModel.findByIdAndUpdate(userId, { cartData: {} });
        res.json({ success: true, message: "Order Placed" })
    }  catch (error) {
        res.json({ success: false, message: error.message })
    }
}

//place order using strinp

// const placeOrderStrip = async (req, res) => {

//     try {
//          const { userId, items, amount, address,paymentMethod } = req.body;
//          const {origin} = req.headers;
//          const orderData = {
//             userId,
//             items,
//             amount,
//             address,
//             paymentMethod,
//             payment: paymentMethod === "stripe" ? false : false,
//             date: Date.now(),

//         }
//          const newOrder = new orderModel(orderData);
//            await newOrder.save();

//            const line_items = items.map((item)=>({
//             price_data  : {
//                 currency:currency,
//                 product_data:{
//                     name :item.name,

//                 },
//                 unit_amount:item.price*100
//             },
//             quantity:item.quantity

//            }));
      
//            line_items.push({
//              price_data  : {
//                 currency:currency,
//                 product_data:{
//                     name :"Delivery Charges",

//                 },
//                 unit_amount:deliveryCharges*100
//             },
//             quantity:1

//            });

//            const session = await  strip.checkout.sessions.create({
//              success_url:`${origin}/verify?success=true&orderId ${newOrder._id}`,
//              cancel_url:`${origin}/verify?success=false&orderId ${newOrder._id}`,
//              line_items,
//              mode:'payment'
//            });
//            res.json({success:true,session_url:session.url})

//     } catch (error) {
//          res.json({ success: false, message: error.message })
//     }

// }

// verify strip payment

// const verifyStrip = async (req,res) =>{
  
//     const {orderId,success,userId} = req.body;
//     try {
//         if(success==='true'){
//             await orderModel.findByIdAndUpdate(orderId,{payment:true});
//             await userModel.findByIdAndUpdate(userId,{cartData:{}});
//             res.json({success:true});
//         }
//         else{
//             await orderModel.findByIdAndDelete(orderId);
//             res.json({success:false})
//         }
//     } catch (error) {
//          res.json({ success: false, message: error.message })
//     }
// }

//place order using the razorpay

// const placeOrderRazorpay = async (req, res) => {

// }

// //All order data from the admin panel

const allOrders = async (req, res) => {

  try {
     const orders = await orderModel.find({});
     res.json({success:true,orders})
  } catch (error) {
     res.json({success:false,message:error.message})
  }

}

//user order data for frontEnd

const userOrders = async (req, res) => {

     try {
        const {userId} = req.body;
        const orders = await orderModel.find({userId});
        res.json({success:true,orders})
     } catch (error) {
        res.json({ success: false, message: error.message })
     }

}

//update order status from admin panel
const updateStatus = async (req, res) => {

    try {
        const {orderId,status} = req.body;
        await orderModel.findByIdAndUpdate(orderId,{status});
        res.json({success:true,message:"Status Updated"})
    } catch (error) {
         res.json({ success: false, message: error.message })
    }

}


const placeOrderWithEasypaisa = async (req, res) => {
    try {
        const { userId, items, amount, address,paymentMethod } = req.body;
        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod,
            payment: paymentMethod === "Easy Paisa" ? false : false,
            date: Date.now(),

        }

        const newOrder = new orderModel(orderData);
        await newOrder.save();
        await userModel.findByIdAndUpdate(userId, { cartData: {} });
        res.json({ success: true, message: "Order Placed" })
    }  catch (error) {
        res.json({ success: false, message: error.message })
    }
}

const orderDeleted = async (req,res)=>{
    try {
    const { id } = req.params;
    await orderModel.findByIdAndDelete(id);
    res.json({ success: true, message: "Order deleted successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}

export { placeOrder, orderDeleted,  placeOrderWithEasypaisa, allOrders, userOrders, updateStatus, };
