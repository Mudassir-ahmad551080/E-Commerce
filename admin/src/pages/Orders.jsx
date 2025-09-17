import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllorders = async () => {
    if (!token) return;
    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } }
      );
      console.log(response)
      if (response.data.success) {
        setOrders(response.data.orders.reverse());
        console.log(response.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const statusHandler = async (e,orderId)=>{
     try {
        const response = await axios.post(backendUrl+'/api/order/status',{orderId,status:e.target.value},{headers:{token}})
        if(response.data.success){
          await fetchAllorders()
        }
     } catch (error) {
        console.log(error);
        toast.error(response.data.message)
     }
  }

  useEffect(() => {
    fetchAllorders();
  }, [token]);

  return (
    <div className="w-full min-h-screen flex flex-col items-center px-4 py-8 md:px-12 lg:px-20 bg-gray-50">
      <h3 className="text-2xl mt-8 prata-regular md:text-3xl font-semibold text-gray-800 mb-3">
        Orders
      </h3>
<div className="w-full max-w-5x px-10 flex flex-col gap-6">
  {orders.map((order, index) => (
    <div
      key={index}
      className="bg-white  border px-2 shadow-md hover:shadow-lg transition-all duration-300 p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-5 md:gap-10"
    >
      {/* Left section: Icon + order info */}
      <div className="flex items-center gap-4 min-w-[200px]">
        <img
          src={assets.parcel_icon}
          alt="Parcel"
          className="w-12 h-12 md:w-14 md:h-14"
        />
        <div>
          <h4 className="font-semibold text-lg text-gray-800">
            Order #{index + 1}
          </h4>
          <p className="text-green-600 font-bold text-xl">
            ${order.amount}
          </p>
        </div>
      </div>

      {/* Middle: Items + Address */}
      <div className="flex-1">
        <h5 className="font-medium text-gray-700 mb-1">Items:</h5>
        <ul className="text-sm text-gray-600 mb-2">
          {order.items.map((item, idx) => (
            <li key={idx}>
              {item.name} × {item.quantity}{" "}
              <span className="text-gray-500">({item.size})</span>
            </li>
          ))}
        </ul>
        <h5 className="font-medium text-gray-700 mb-1">Shipping:</h5>
        <p className="text-sm text-gray-600">
         Name:: {order.address.firstName} {order.address.lastName},{" "} <br />
         Address:: {order.address.street} {order.address.city}, {order.address.state}
        </p>
        <p className="text-sm gap-2 flex mt-2 text-gray-500 "><span>Phone📞</span>{order.address.phone}</p>
      </div>

      {/* Right: Payment + Status */}
    <div className="flex flex-col gap-2 text-sm text-gray-700 min-w-[180px]">
  <p>
    <span className="font-medium">Method:</span> {order.paymentMethod}
  </p>
  <p>
    <span className="font-medium">Payment:</span>{" "}
    {order.payment ? "✅ Done" : "⌛ Pending"}
  </p>
  <p>
    <span className="font-medium">Date:</span>{" "}
    {new Date(order.date).toLocaleDateString()}
  </p>

  <select
    onChange={(e) => statusHandler(e, order._id)}
    value={order.status}
    className="border rounded-lg px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    <option value="Order Placed">Order Placed</option>
    <option value="Packing">Packing</option>
    <option value="Shipped">Shipped</option>
    <option value="Out for delivery">Out for delivery</option>
    <option value="Delivered">Delivered</option>
    <option value="Order Cancel">Order Cancel</option>
  </select>

  {/* ✅ Delete Order Button */}
  <button
    onClick={async () => {
      if (window.confirm("Are you sure you want to delete this order?")) {
        try {
          const response = await axios.delete(
            `${backendUrl}/api/order/delete/${order._id}`,
            { headers: { token } }
          );
          if (response.data.success) {
            toast.success("Order deleted successfully");
            fetchAllorders();
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          toast.error(error.message);
        }
      }
    }}
    className="px-3 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition"
  >
    Delete
  </button>
</div>

    </div>
  ))}

  {orders.length === 0 && (
    <p className="text-gray-600 text-center mt-10">
      No orders found.
    </p>
  )}
</div>


    </div>
  );
};

export default Orders;
