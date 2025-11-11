import React, { useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod')
  const { navigate, backendURL, token, cartItem, setCartItem, getCartamount, delivery_fee, products } = useContext(ShopContext)

  const [formdata, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  })

  const onchangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setFormData((data) => ({ ...data, [name]: value }))
  }

  const onsubmitHandler = async (e) => {
    e.preventDefault()
    try {
      let orderItems = []
      for (const items in cartItem) {
        for (const item in cartItem[items]) {
          if (cartItem[items][item] > 0) {
            const itemInfo = structuredClone(products.find((product) => product._id === items))
            if (itemInfo) {
              itemInfo.size = item
              itemInfo.quantity = cartItem[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }

      const orderData = {
        address: formdata,
        items: orderItems,
        amount: getCartamount() + delivery_fee,
        paymentMethod: method
      }

      switch (method) {
        case 'cod':
          const response = await axios.put(
            backendURL + '/api/order/place',
            orderData,
            { headers: {  } }
          )
          if (response.data.success) {
            setCartItem({})
            navigate('/orders')
          } else {
            toast.error(response.data.message)
          }
          break

        // case 'stripe':
        //   const responseStrip = await axios.post(
        //     backendURL + '/api/order/strip',
        //     orderData,
        //     { headers: { token } }
        //   )
        //   if (responseStrip.data.success) {
        //     const { session_url } = responseStrip.data
        //     window.location.replace(session_url)
        //   } else {
        //     toast.error(responseStrip.data.message)
        //   }
        //   break

        case 'Easy Paisa':
          // ✅ First place the order in your backend
          const responseEasy = await axios.post(
            backendURL + '/api/order/easypaisa',
            orderData,
            { headers: { token } }
          )
          if (responseEasy.data.success) {
            setCartItem({});
            if (responseEasy.data.success) {
              setCartItem({})
              setFormData({
                firstName: '',
                lastName: '',
                email: '',
                street: '',
                city: '',
                state: '',
                zipcode: '',
                country: '',
                phone: ''
              })
              // After order is placed, open Easy Paisa
              window.open('https://easypaisa.com.pk/', '_blank');
              navigate('/orders')
            }

            // // ✅ After order is placed, open Easy Paisa app/website
            // window.open('https://easypaisa.com.pk/', '_blank')
          } else {
            toast.error(responseEasy.data.message)
          }
          break

        default:
          break
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  return (
    <form
      onSubmit={onsubmitHandler}
      className="container mx-auto px-4 py-10 flex flex-col lg:flex-row gap-10"
    >
      {/* Left side (Delivery info) */}
      <div className="flex-1 bg-white shadow-md rounded-2xl p-6 space-y-4">
        <div className="text-2xl font-semibold text-gray-800">
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>

        {/* Name */}
        <div className="flex flex-col md:flex-row gap-3">
          <input
            required
            onChange={onchangeHandler}
            name="firstName"
            value={formdata.firstName}
            type="text"
            placeholder="First name"
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
          <input
            required
            onChange={onchangeHandler}
            name="lastName"
            value={formdata.lastName}
            type="text"
            placeholder="Last name"
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>

        {/* Email + Street */}
        <input
          required
          onChange={onchangeHandler}
          name="email"
          value={formdata.email}
          type="email"
          placeholder="Enter your email"
          className="w-full border border-gray-300 rounded-lg px-3 py-2"
        />
        <input
          required
          onChange={onchangeHandler}
          name="street"
          value={formdata.street}
          type="text"
          placeholder="address"
          className="w-full border border-gray-300 rounded-lg px-3 py-2"
        />

        {/* City + State */}
        <div className="flex flex-col md:flex-row gap-3">
          <input
            required
            onChange={onchangeHandler}
            name="city"
            value={formdata.city}
            type="text"
            placeholder="City"
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
          <input
            required
            onChange={onchangeHandler}
            name="state"
            value={formdata.state}
            type="text"
            placeholder="State"
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>

        {/* Zip + Country */}
        <div className="flex flex-col md:flex-row gap-3">
          <input
            required
            onChange={onchangeHandler}
            name="zipcode"
            value={formdata.zipcode}
            type="text"
            placeholder="Zip Code"
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
          <input
            required
            onChange={onchangeHandler}
            name="country"
            value={formdata.country}
            type="text"
            placeholder="Country"
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>

        {/* Phone */}
        <input
          required
          onChange={onchangeHandler}
          name="phone"
          value={formdata.phone}
          type="tel"
          placeholder="Phone"
          className="w-full border border-gray-300 rounded-lg px-3 py-2"
        />
      </div>

      {/* Right side (Payment + CartTotal) */}
      <div className="flex-1 bg-white shadow-md rounded-2xl p-6 space-y-8">
        <div>
          <CartTotal />
        </div>

        <div>
          <Title text1={'PAYMENT'} text2={'METHOD'} />
          <div className="flex flex-col gap-3 mt-4">
            {/* <div
              onClick={() => setMethod('stripe')}
              className={`flex items-center gap-3 border rounded-lg px-4 py-3 cursor-pointer ${method === 'stripe' ? 'border-green-500 bg-green-50' : 'border-gray-300'
                }`}
            >
              <span className={`w-4 h-4 rounded-full border ${method === 'stripe' ? 'bg-green-500' : ''}`}></span>
              <img src={assets.stripe_logo} alt="Stripe" className="h-6" />
            </div> */}

            {/* <div
              onClick={() => setMethod('razorpay')}
              className={`flex items-center gap-3 border rounded-lg px-4 py-3 cursor-pointer ${method === 'razorpay' ? 'border-green-500 bg-green-50' : 'border-gray-300'
                }`}
            >
              <span className={`w-4 h-4 rounded-full border ${method === 'razorpay' ? 'bg-green-500' : ''}`}></span>
              <img src={assets.razorpay_logo} alt="Razorpay" className="h-6" />
            </div> */}

            <div
              onClick={() => setMethod('cod')}
              className={`flex items-center gap-3 border rounded-lg px-4 py-3 cursor-pointer ${method === 'cod' ? 'border-green-500 bg-green-50' : 'border-gray-300'
                }`}
            >
              <span className={`w-4 h-4 rounded-full border ${method === 'cod' ? 'bg-green-500' : ''}`}></span>
              <p>Cash on Delivery</p>
            </div>

            {/* Easy Paisa Option */}
            <div
              onClick={() => setMethod('Easy Paisa')}
              className={`flex items-center gap-3 border rounded-lg px-4 py-3 cursor-pointer ${method === 'Easy Paisa' ? 'border-green-500 bg-green-50' : 'border-gray-300'
                }`}
            >
              <span
                className={`w-4 h-4 rounded-full border ${method === 'Easy Paisa' ? 'bg-green-500' : ''
                  }`}
              ></span>
              <p>Easy Paisa 03104847156</p>
            </div>


          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-black prata-regular cursor-pointer text-white text-lg py-3 rounded-lg hover:bg-gray-800 transition"
        >
          PLACE ORDER
        </button>
      </div>
    </form>
  )
}

export default PlaceOrder
