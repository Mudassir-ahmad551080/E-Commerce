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
      <div className="flex justify-center items-center h-[80vh]">
        <p className="text-xl font-semibold animate-pulse">Loading...</p>
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
