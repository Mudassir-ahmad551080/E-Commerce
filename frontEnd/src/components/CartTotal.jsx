import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title.jsx'
const CartTotal = () => {
    const {currency, delivery_fee, getCartamount} = useContext(ShopContext);
  return (
    <div className='w-full'>
      <div className='text-2xl'>
        <Title text1={"CART"} text2={'TOTALS'}/>
      </div>
      <div className='flex flex-col mt-3 gap-2'>
         <div className='flex justify-between'>
            <p>Subtotal</p>
            <p>{currency}{getCartamount()}.00</p>
         </div>
         <hr />
         <div className='flex justify-between'>
          <p>delivery_fee</p>
          <p>{currency}{delivery_fee}.00</p>
         </div>
         <hr />
         <div className='flex justify-between'>
           <p>Total</p>
           <p>{currency}{getCartamount()===0?0:getCartamount()+delivery_fee}.00</p>
         </div>
      </div>
    </div>
  )
}

export default CartTotal