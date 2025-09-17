import express from 'express';

import { placeOrder,allOrders,userOrders,updateStatus, placeOrderWithEasypaisa, orderDeleted } from '../controllers/orderscontroller.js';
import adminAuth from '../middleware/adminauth.js'
import authUser from '../middleware/auth.js';
const orderRouter = express.Router();

//admin feature
orderRouter.post('/list',adminAuth,allOrders);
orderRouter.post('/status',adminAuth,updateStatus);


//payment feature 
orderRouter.post('/place',authUser,placeOrder);
orderRouter.post('/easypaisa',authUser,placeOrderWithEasypaisa)
// orderRouter.post('/strip',authUser,placeOrderStrip);
// orderRouter.post('/razorpay',authUser,placeOrderRazorpay);
// THIS  IS THE  ROUTE FOT THE ORDER DELETE FROMT THE  ADMIN DASHBOARD
orderRouter.delete('/delete/:id',adminAuth,orderDeleted)
//user feature

orderRouter.post('/userorders',authUser,userOrders);

// verify payment
// orderRouter.post('/verifystrip',authUser,verifyStrip)

// Add this new route to your orderRouter.js file



export default orderRouter;