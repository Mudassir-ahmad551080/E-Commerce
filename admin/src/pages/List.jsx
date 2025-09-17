import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const List = ({token}) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
      
    try {
      const response = await axios.get(backendUrl+'/api/product/list',{headers:{token}});
       if(response.data.success){
         setList(response.data.products)
       }
       else{
        toast.error(response.data.message)
       }
    } catch (error) {
        console.log(error)
        toast.error(error);
    }


  }


const removeProduct = async (id) =>{
  try {
      const response = await axios.post(backendUrl+'/api/product/remove',{id},{headers:{token}});
      if(response.data.success){
        toast.success(response.data.message);
        await fetchList()
      }
      else{
        toast.error(response.data.message)
      }
  } catch (error) {
     console.log(error);
     toast.error(error)
  }
}


  useEffect(() => {
    fetchList();
  }, [])

  return (
  <div className='
    flex flex-col
    absolute top-40  md:top-30 md:left-80 md:right-5 
    px-4 md:px-10 py-6 
     rounded-md shadow-md 
    max-w-full overflow-x-auto
  '>
    <p className=' prata-regular
      mb-4 text-2xl font-semibold text-gray-800
    '>All Product List</p>

    <div className='
      hidden md:grid 
      grid-cols-[1fr_3fr_1fr_1fr_1fr] 
      w-full 
      items-center 
      text-sm 
      py-2 px-4 
      border border-gray-300 
      mb-2
      bg-slate-200 
      rounded-t-md 
      font-semibold text-gray-700
    '>
      <b>Image</b>
      <b>Name</b>
      <b>Price</b>
      <b>Description</b>
      <b className='text-center'>Action</b>
    </div>
    {/* product list  */}
    {
      list.map((item,index)=>(
        <div className='grid grid-cols-[1fr_3fr_1fr] mb-2 md:grid-cols-[1fr_3fr_1fr_1fr_1fr] border border-gray-400 text-sm  items-center gap-2 py-1 px-2' key={index}>
         <img className='w-12' src={item.image[0]} alt="" />
         <p className=''>{item.name}</p>
         <p className=''>{item.category}</p>
         <p className=''>${item.price}</p>
         <p onClick={()=>removeProduct(item._id)} className='text-right md:text-center text-lg cursor-pointer '>X</p>
        </div>
      ))
    }
  </div>
)

}

export default List