import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProduct from '../components/RelatedProduct';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addtoCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        return null
      }
    })
  }
  useEffect(() => {
    fetchProductData()
  }, [productId, products])
  return productData ? (
    <div className='border-t-2  transition-opacity ease-in transition-all opacity-100 duration delay-500'>
      {/* product data */}
      <div className='flex flex-col sm:flex-row gap-12'>
        {/* product images */}
        <div className='flex-1 flex flex-col-reverse  gap-3 sm:flex-row'>
          <div className='flex sm:flex-col   justify-between sm:justify-normal w-full sm:w-[18.7%]'>
            {
              productData.image.map((item, index) => (
                <img onClick={() => setImage(item)} src={item} alt="" key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0  cursor-pointer' />
              ))
            }
          </div>
          <div className='w-full sm:w-[80%]'>
            <img src={image} className='w-full h-auto' alt="" />
          </div>
        </div>
        {/* __________________________product info */}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className='flex mt-3 items-center gap-1 '>
            <img src={assets.star_icon} className='w-3 5' alt="" />
            <img src={assets.star_icon} className='w-3 5' alt="" />
            <img src={assets.star_icon} className='w-3 5' alt="" />
            <img src={assets.star_icon} className='w-3 5' alt="" />
            <img src={assets.star_dull_icon} className='w-3 5' alt="" />
            <p className='pl-2'>(122)</p>
          </div>
          <p className='mt-4  text-2xl'>{currency}{productData.price}</p>
          <p className='mt-3 text-gray-600 w-4/5'>{productData.description}</p>
          <div className='mt-5 '>
            <p>Select Size</p>
            <div className='gap-2 flex mt-3'>
              {productData.sizes.map((item, index) => (
                <button onClick={() => setSize(item)} className={`bg-zinc-100 border border-1 px-3 py-1 cursor-pointer ${item === size ? 'border-gray-400 border-2' : ''} `} key={index}>{item}</button>
              ))}
            </div>
            <button onClick={() => addtoCart(productData._id, size)} className='bg-black animate-bounce mt-8 hover:animate-none transition-all ease-in duration-500 text-white px-5 py-2 mt-4 cursor-pointer '>ADD TO CART</button>
            <hr className='mt-6 sm:w-4/5' />
            <div className='mt-4 gap-2 text-zinc-400'>
              <p>100% original Product</p>
              <p>Cash on delivery in this product is available</p>
              <p>easy return and exchange policy with in 7 days</p>
            </div>
          </div>
        </div>
      </div>
      {/* ------------description and review section----------- */}
      <div className='mt-9'>
        <div className='flex gap-4'>
          <b className='border p-2'>Description</b>
          <p className='border p-2'>review(122)</p>
        </div>
        <div className='flex mt-5 text-zinc-500'>
          <p>Our e-commerce app makes shopping simple, fast, and enjoyable. Discover a wide range of products—from fashion and electronics to home essentials—all in one place. With an intuitive design and smart search features, you can easily find what you’re looking for, compare options, and make secure purchases in just a few taps.

            Key Features:

            Seamless Shopping – Browse thousands of products across multiple categories.

            Smart Search & Filters – Quickly find items that match your style, needs, and budget.

            Secure Payments – Multiple safe payment options, including cards, wallets, and cash on delivery.

            Fast & Reliable Delivery – Get your orders delivered to your doorstep quickly.

            Personalized Experience – Recommendations tailored to your preferences.

            Order Tracking – Stay updated with real-time order status.

            Whether you’re shopping for the latest trends, everyday essentials, or exclusive deals, our app puts everything at your fingertips.</p>
        </div>
      </div>
      {/* display related product */}
      <RelatedProduct category={productData.category} subCategory={productData.subCategory} />
    </div>
  ) : <div className='opacity-0'></div>
}

export default Product