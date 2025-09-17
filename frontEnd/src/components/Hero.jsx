import React from 'react'
import { assets } from '../assets/assets'

const Hero = () => {
  return (
    <div className='flex flex-col md:flex-row border border-1 mt-2 items-center justify-between gap-10 mb-10   bg-white'>

      {/* Left Section */}
      <div className='flex ml-5 md:my-0 my-2 flex-col gap-4 md:w-1/2'>
        
        {/* Subtitle with Divider */}
        <div className='flex items-center gap-3'>
          <div className='w-10 md:w-16 h-[2px] bg-zinc-500'></div>
          <p className='text-sm text-gray-600 uppercase tracking-widest'>Our Best Seller Product</p>
        </div>

        {/* Main Heading */}
        <h1 className='prata-regular text-3xl md:text-5xl font-semibold text-zinc-800 leading-tight'>
          Latest Arrival
        </h1>

        {/* Description */}
        <p className='text-base text-gray-500 max-w-md'>
          Discover our newest collection, curated to elevate your lifestyle. Quality, comfort, and elegance in every piece.
        </p>

        {/* Bottom Divider */}
        <div className='flex gap-2 items-center '><p className='text-gray-600 uppercase'>Shoop NN</p>
        <div className='w-10 md:w-16 mb-2 h-[2px] bg-zinc-500 mt-4'></div></div>
      </div>

      {/* Right Section – You can add an image or graphic here later */}
      {/* Example Placeholder */}
     
          <img className='w-full sm:w-1/2' src={assets.hero_img} alt="" />
       

    </div>
  )
}

export default Hero
