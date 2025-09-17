import express from 'express';

import upload from '../middleware/multer.js';
import { addProduct,listProduct,removeProduct,singleProduct } from '../controllers/porductcontroller.js';
import adminAuth from '../middleware/adminauth.js';

const productRouter = express.Router();

productRouter.post('/add',adminAuth,upload.fields([{name:'image1',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1},{name:'image4',maxCount:1}]) , addProduct);
productRouter.get('/list', listProduct);
productRouter.post('/remove', removeProduct);
productRouter.post('/single', singleProduct);

export default productRouter;