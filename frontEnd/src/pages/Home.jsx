import React, { useContext } from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicty from '../components/OurPolicty'
import NewsLater from '../components/NewsLater'
import { ShopContext } from '../context/ShopContext'

const Home = () => {
  const { products } = useContext(ShopContext);

  // ✅ Show loading until products are fetched
  if (!products || products.length === 0) {
    return (
       <div className='min-h-screen absolute bg-white z-100 top-0 left-0 right-0   w-full justify-center flex items-center'>
        <div className='w-20 h-20 border border-4 border-gray-400 border-t-4 border-t-green-400 rounded-full animate-spin'>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Hero />
      <LatestCollection />
      <BestSeller />
      <OurPolicty />
      <NewsLater />
    </div>
  )
}

export default Home
