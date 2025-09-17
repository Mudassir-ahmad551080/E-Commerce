import React, { useEffect } from 'react'
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItems from './ProductItems.jsx'
const BestSeller = () => {
    const {products} = useContext(ShopContext);
    const [BestSellerProducts, setBestSellerProducts] = React.useState([]);
   

    useEffect(()=>{
        const bestproduct = products.filter((item)=>(item. bestseller));
        setBestSellerProducts(bestproduct.slice(0,6));
    },[products])
  return (
    <div className='text-center my-10'>
      <div>
        <Title text1={"BEST"} text2={"SELLER"}/>
        <p className='text-gray-700'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam, sequi.</p>
      </div>
       <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-6'>
        {
          BestSellerProducts.map((items,index)=>(
            <ProductItems key={index} id={items._id} name={items.name} price={items.price} image={items.image}/>
          ))
        }
       </div>
    </div>
  )
}

export default BestSeller