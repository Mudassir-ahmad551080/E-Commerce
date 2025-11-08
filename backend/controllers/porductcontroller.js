import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";
import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 300 }); // cache expires in 5 minutes

// function for add product
export const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter((item) => item !== undefined);

    const imagesURL = await Promise.all(
      images.map(async (item) => {
        const result = await cloudinary.uploader.upload(item.path, { resource_type: "image" });
        return result.secure_url;
      })
    );

    const productData = {
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      sizes: JSON.parse(sizes),
      bestseller: bestseller === "true" ? true : false,
      image: imagesURL,
      date: new Date(),
    };

    const product = new productModel(productData);
    await product.save();

    // ❗ Invalidate cache after adding a new product
    cache.del("allProducts");

    res.status(200).json({ success: true, message: "product added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "server error" });
  }
};

// function for list product
export const listProduct = async (req, res) => {
  try {
    // ✅ Check cache first
    const cachedProducts = cache.get("allProducts");
    if (cachedProducts) {
      return res.json({ success: true, products: cachedProducts, cached: true });
    }

    // ❌ Not in cache → fetch from DB
    const products = await productModel.find({});

    // ✅ Store in cache
    cache.set("allProducts", products);

    res.json({ success: true, products, cached: false });
  } catch (error) {
    console.error(error);
    res.json({ success: false });
  }
};

// remove product
export const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);

    // ❗ Invalidate cache after deletion
    cache.del("allProducts");

    res.json({ success: true, message: "product removed successfully" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "server error" });
  }
};

// function for single product
export const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;

    // ✅ Check if this product is cached
    const cacheKey = `product_${productId}`;
    const cachedProduct = cache.get(cacheKey);
    if (cachedProduct) {
      return res.json({ success: true, product: cachedProduct, cached: true });
    }

    // ❌ Not cached → fetch from DB
    const product = await productModel.findById(productId);

    // ✅ Store in cache
    cache.set(cacheKey, product);

    res.json({ success: true, product, cached: false });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "server error" });
  }
};
