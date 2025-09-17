import express from 'express'
import { addtoCart, updateuserCart, getusercartData } from '../controllers/cartcontroller.js';

import authUser from '../middleware/auth.js';


const cartRouter = express.Router();

cartRouter.post('/get',authUser,getusercartData);
cartRouter.post('/add',authUser,addtoCart);
cartRouter.post('/update',authUser,updateuserCart);

export default cartRouter