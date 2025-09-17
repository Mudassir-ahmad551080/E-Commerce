import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const Orders = () => {
  const { backendURL,token, currency } = useContext(ShopContext);
 const [orderData,setOrderData] = useState([]);


  const loadOrderData = async () => {
    try {
        if (!token) {
            return null;
        }
        const response = await axios.post(backendURL + '/api/order/userorders', {}, { headers: { token } });
        if (response.data.success) {
            let allOrdersItem = [];
            response.data.orders.map((order) => {
                order.items.map((item) => {
                    item['status'] = order.status;
                    item['payment'] = order.payment;
                    item['paymentMethod'] = order.paymentMethod;
                    item['date'] = order.date;
                    // item['orderId'] = order._id; // Include the order ID here
                    allOrdersItem.push(item);
                });
            });
            setOrderData(allOrdersItem.reverse());
        }
    } catch (error) {
        console.log(error);
        toast.error(error.message);
    }
};

  useEffect(()=>{
    loadOrderData()
  },[token])

  return (
    <div className="border-t pt-16 justify-between px-4 md:px-8 lg:px-16">
      <div className="text-2xl mb-8">
        <Title text1="MY" text2="ORDERS" />
      </div>
      <div className="space-y-6 justify-between">
      {orderData.map((item, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row justify-between border-t border-b border-gray-300 py-6 gap-6 text-gray-600"
          >
            {/* Left side: Image and details */}
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center flex-1">
              <img
                className="w-28 md:w-20 object-cover rounded"
                src={item.image[0]}
                alt={item.name}
              />
              <div>
                <p className="text-black font-semibold text-lg">{item.name}</p>
                <div className="flex flex-wrap gap-4 mt-2 text-sm">
                  <p>{currency}{item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Size: {item.size}</p>
                </div>
                <p className="mt-1 text-xs text-gray-500">Date:{new Date(item.date).toDateString()}</p>
              </div>
            </div>

      

            {/* Middle: Order status */}
            <div className="flex items-center gap-3 mt-2 md:mt-0">
              {/* <span className="bg-green-500 w-3 h-3 rounded-full inline-block"></span> */}
              <p className="text-sm flex gap-3 font-medium"><span className=''>{item.status}</span>{item.status==='Order Cancel'? <span className="bg-red-500 w-3 h-3 rounded-full inline-block"></span>: <span className="bg-green-500 w-3 h-3 rounded-full inline-block"></span>}</p>
            </div>

            {/* Right side: Track order button */}
            <div className="mt-4 md:mt-0">
              <button
    className="border prata-regular border-black bg-black text-white px-5 py-2 rounded hover:bg-gray-800 transition"
     // Pass the order ID
     onClick={()=>loadOrderData()}
>
    Track Order
</button> 

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
