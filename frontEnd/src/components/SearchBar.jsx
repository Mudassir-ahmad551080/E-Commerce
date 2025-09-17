import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';
import { RxCross1 } from "react-icons/rx";

const SearchBar = () => {
    const { search ,setSearch ,showSearch ,setShowSearch} = useContext(ShopContext);
    const location = useLocation();
    const [visible,setVisible] = useState(false)
  
    useEffect(()=>{
        if(location.pathname.includes('collection')){
            setVisible(true)
        }
        else {
            setVisible(false)
        }
    },[location])
  return showSearch && visible ? (
    <div className='border  border-t mt-2 border-b md:gap-3 gap-2 flex md:mx-20 bg-gray-100 p-2 text-center justify-center items-center border-gray-50 text-center'>
        <div className='flex px-5 w-[600px] justify-between gap-5 py-2 rounded-full bg-amber-50'>
            <input onChange={(e)=>setSearch(e.target.value)} value={search} className='outline-none w-full' type="text" placeholder='Search' />
            <img className='w-6 right-0' src={assets.search_icon} alt="" />
        </div>
        <div>
            {/* <img onClick={()=>setShowSearch(false)} className='w-7 md:w-5 cursor-pointer' src={assets.cross_icon} alt="" /> */}
             <RxCross1 onClick={()=>setShowSearch(false)} className='w-7 text-3xl cursor-pointer  font-medium' />
        </div>
    </div>
  ):null
}

export default SearchBar