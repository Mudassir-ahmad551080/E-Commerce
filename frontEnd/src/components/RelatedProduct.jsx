import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import ProductItems from './ProductItems';
const RelatedProduct = ({category,subCategory}) => {
    const {products} = useContext(ShopContext);
    const [related,setRelated] = useState([]);

   
    useEffect(()=>{
        if(products.length>0){
            let productCopy  = products.slice();

            productCopy = productCopy.filter((item)=> category === item.category);
            productCopy =productCopy.filter((item)=> subCategory===item.subCategory);
            setRelated(productCopy.slice(0,5))
        }
    },[])


  return (
    <div className='my-24'>
      <div className='text-center'>
        <Title text1={"RELATED"} text2={'PRODUCT'}/>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-6'>
        {related.map((item,index)=>(
          <ProductItems key={index} id={item._id} name={item.name} price={item.price} image={item.image}/>
        ))}
      </div>
    </div>
  )
}

export default RelatedProduct