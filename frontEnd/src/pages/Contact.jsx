import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLater from '../components/NewsLater'

const Contact = () => {
  return (
    <>
    <div className=' mb-20'>
      <div className='text-2xl pt-10 mb-20 text-center '>
       <Title text1={'CONTACT'} text2={'US'}/>
      </div>
      <div className='flex flex-col justify-between md:flex-row '>
        <img className='w-90' src={assets.contact_img} alt="" />
        <div className=' mr-0 md:mr-30 sm:mr-0 mt-5 md:mt-15'>
         <p className='text-gray-500'>Our Store</p>
         <p className='text-gray-500'>Dalazak Road <br /> Peshawar Distric Dalazak</p>
         <p className='mt-3 text-gray-500'>Email: mudassir@gmail.com</p>
         <p className='text-gray-500'>Phone:: 03215837843</p>
         <p className='mt-4 text-2xl'>Careers at Foreever</p>
         <p className='text-gray-500 mt-3'>Learn about our team for job opening</p>
         <button className='px-7 py-2 bg-transparent hover:bg-black text-black hover:text-white transition-all mt-3 border cursor-pointer '>Explore Jobs</button>
        </div>
      </div>
     
    </div>
    <NewsLater/>
    </>
  )
}

export default Contact