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
