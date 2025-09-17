import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLater from '../components/NewsLater'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center  mt-8'>
        <Title  text1={'ABOUT'} text2={'US'}/>
      </div>
      <div className='flex flex-col gap-10 md:flex-row'>
        <img src={assets.about_img} className='w-90' alt="" />
        <div className='flex flex-col mt-10  gap-7 mt-0'>
         <p className='text-gray-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, laboriosam vitae doloremque dolorum fugiat rem, magnam corporis, facilis consequatur ducimus incidunt quis consectetur sed obcaecati a aperiam voluptatibus nesciunt similique.</p>
         <p className='text-gray-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, laboriosam vitae doloremque dolorum fugiat rem, magnam corporis, facilis consequatur ducimus incidunt quis consectetur sed obcaecati a aperiam voluptatibus nesciunt similique.</p>
         <p>Our Mission</p>
         <p className='text-gray-500'> Our Mission  is to icrease the customer of the  Foreever company this is the very big company for the ecommerce </p>
        </div>
      </div>
      <div className='text-xl mt-9'>
        <Title text1={'WHY CHUSE'} text2={'US'}/>
      </div>
      <div className='flex flex-col mb-10 justify-between gap-6 items-center text-center md:gap-0 md:flex-row mt-4'>
         <div className='w-70 gap-4 border border-1 border-gray-600 px-5 py-5'>
          <p>Quality Assurance::</p>
          <p className='mt-2 text-gray-500 text-sm'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor, nihil? Lorem ipsum dolor sit amet.</p>
         </div>
          <div className='w-70 gap-4 border border-1 border-gray-600 px-5 py-5'>
          <p>Our Services::</p>
          <p className='mt-2 text-gray-500 text-sm'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor, nihil?</p>
         </div>
          <div className='w-70 gap-4 border border-1 border-gray-600 px-5 py-5'>
          <p>convienince::</p>
          <p className='mt-2 text-gray-500 text-sm'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor, nihil? Lorem ipsum dolor sit amet.</p>
         </div>
      </div>
      <NewsLater/>
    </div>
  )
}

export default About