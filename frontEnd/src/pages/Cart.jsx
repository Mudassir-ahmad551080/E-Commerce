import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Cart = () => {
  const { products, currency, cartItem, updateQuantity } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  const secondHandler = () => {
    toast.error('Your Cart Is Empty')
  }
  
  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // or 'auto'
    });
  };


  useEffect(() => {
    if(products.length>0){
      const tempData = [];
    for (const items in cartItem) {
      for (const item in cartItem[items]) {
        if (cartItem[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItem[items][item]
          });
        }
      }
    }
    setCartData(tempData)
    }
    
  }, [cartItem,products]);

  return (
    <div className='pt-14 border-t-2 px-4 sm:px-8 md:px-16 lg:px-24'>
      <div className='mb-6 text-3xl sm:text-4xl font-bold'>
        <Title text1={"YOUR"} text2={"CART"} />
      </div>

      <div className='flex flex-col space-y-6'>
        {
          cartData.length === 0 ? (
            <p className='text-center text-gray-500 text-lg'>Your cart is empty</p>
          ) : (
            cartData.map((item, index) => {
              const productData = products.find((product) => product._id === item._id);
              if (!productData) return null;

              return (
                <div
                  key={index}
                  className='flex flex-col sm:flex-row sm:items-center justify-between border-b py-4'
                >
                  {/* Product info */}
                  <div className='flex items-start gap-4 sm:gap-6 flex-1'>
                    <img
                      className='w-20 h-20 sm:w-24 sm:h-24 object-cover rounded'
                      src={productData.image[0]}
                      alt={productData.name}
                    />
                    <div className='flex flex-col justify-between'>
                      <p className='text-base sm:text-lg font-semibold text-gray-800'>{productData.name}</p>
                      <div className='flex items-center gap-4 mt-2'>
                        <p className='text-gray-700 font-medium'>{currency}:{productData.price}</p>
                        <span className='px-3 py-1 bg-gray-200 rounded text-sm'>{item.size}</span>
                      </div>
                    </div>
                  </div>

                  {/* Quantity input and delete button */}
                  <div className='mt-4 sm:mt-0 flex items-center gap-4 sm:gap-6'>
                    <input
                      onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, item.size, Number(e.target.value))}
                      type="number"
                      min={1}
                      defaultValue={item.quantity}
                      className='w-20 sm:w-24 border rounded px-2 py-1 text-center text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500'
                    />
                    <button
                      onClick={() => updateQuantity(item._id, item.size, 0)}
                      className='p-2 hover:bg-red-100 cursor-pointer rounded transition-colors'
                      aria-label="Remove item"
                    >
                      <img
                        src={assets.bin_icon}
                        alt="Remove"
                        className='w-6 h-6 sm:w-7 sm:h-7'
                      />
                    </button>
                  </div>
                </div>
              )
            })
          )
        }
      </div>
      <div className='flex justify-end my-20'>
        <div className='sm:w-[450px] w-full'>
          <CartTotal />
          <div className='w-full text-end'>
           {
            cartData.length === 0?  <button onClick={secondHandler} className='bg-black prata-regular px-4 py-2 cursor-pointer text-white mt-2'>PROCED TO CHECKOUT</button> :  <Link to='/placeorder'>
              <button onClick={handleClick} className='bg-black prata-regular px-4 py-2 cursor-pointer text-white mt-2'>PROCED TO CHECKOUT</button>
            </Link>
           }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart;
