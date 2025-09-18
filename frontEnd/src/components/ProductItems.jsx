import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom';

const ProductItems = ({id,price,name,image}) => {
    const {currency} = useContext(ShopContext);

     const handleClick = () => {
      window.scrollTo({
      top: 0,
      behavior: 'smooth' // or 'auto'
    });
  };

  return (
    <Link onClick={handleClick} className='text-gray-700 cursor-pointer' to={`/product/${id}`}>
      <div>
        <img
  className="w-48 h-64 object-cover hover:scale-110 transition-all ease-in-out "
  src={image[0]}
  alt=""
/>

      </div>
      <p className='mt-4'>{name}</p>
      <p className='text-sm text-gray-900'>{currency}::{price}</p>
    </Link>
  )
}

export default ProductItems