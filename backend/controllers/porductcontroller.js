import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

// function for add product

export const addProduct = async (req, res) => {

    try {
         const {name,description, price ,category,subCategory,sizes,bestseller} = req.body;

         const image1 = req.files.image1 && req.files.image1[0]
         const image2 = req.files.image2 && req.files.image2[0]
         const image3 = req.files.image3 && req.files.image3[0]
         const image4 = req.files.image4 && req.files.image4[0];

         const images = [image1,image2,image3,image4].filter((item)=> item !== undefined);

         const imagesURL = await Promise.all(
            images.map(async (item)=>{
               const result = await cloudinary.uploader.upload(item.path,{resource_type:'image'});
               return result.secure_url;
            })
         )
         

       const productData = {
        name,
        description,
        price: Number(price),
        category,
        subCategory,
        sizes: JSON.parse(sizes),
        bestseller: bestseller === 'true' ? true : false,
        image: imagesURL,
        date: new Date()
       }

       const product = new productModel(productData);
       await product.save();

       res.status(200).json({success: true, message:"product added successfully"})

    } catch (error) {
        res.status(500).json({success:false,message:"server error"})
    }

}

// function for listproduct

export const listProduct = async (req, res) => {

    try {
        const products = await productModel.find({});
        res.json({success:true,products});
     } 
     catch (error) {
          res.json({success:false})
    }

}

// remove product

export const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"product removed successfully"})
    } catch (error) {
        res.json({success:false,message:"server error"})
    }
}


// function for single product

export const singleProduct = async (req, res) => {

    try {
         const {productId} = req.body;
        const product = await productModel.findById(productId);
        res.json({success:true,product});
        
    } 
    
    catch (error) {
        res.json({success:false,message:"server error"})
    }

}
