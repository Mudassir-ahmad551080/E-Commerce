import React from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const VerifyStrip = () => {
    const { navigate,setCartItem,token,backendURL}= useContext(ShopContext);
    const [searchParams,setSearchParams] = useSearchParams();
    const success =  searchParams.get('success');
     const orderId =  searchParams.get('orderId');

    const verifyPaymen = async()=>{
    try {
        if(!token){
            return null
        }
        const response = await axios.post(backendURL+'/api/order/verifystrip',{success,orderId},{headers:{token}});
        if(response.data.success){
            setCartItem({});
            navigate('/orders');

        }
        else{
            navigate('/cart')
        }
    } catch (error) {
        console.log(error);
        toast.error(error.message)
    }
    }
    useEffect(()=>{
        verifyPaymen();
    },[token])
  return (
    <div>

    </div>
  )
}

export default VerifyStrip