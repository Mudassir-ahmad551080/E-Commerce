import React from 'react'

const Title = ({text1,text2}) => {
  return (
    <div className='inline-flex items-center text-center gap-3 mb-6'>
     <p className='text-gray-500 rounded-md text-xl'> {text1} <span className='font-medium text-gray-700'>{text2}</span></p>
     <p className='w-17 md:w-20 md:h-[3px] h-[3px] bg-zinc-600'></p>
    </div> 
  )
}

export default Title