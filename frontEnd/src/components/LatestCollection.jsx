import React, { useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext'; // ✅ Import the actual context
import Title from '../components/Title'
import ProductItems from './ProductItems';
const LatestCollection = () => {
    const { products } = useContext(ShopContext); // ✅ Correct usage
    const [latestProducts, setLatestProducts] = React.useState([]);


    useEffect(() => {
        // Sort products by createdAt date in descending order and take the latest 4
        setLatestProducts(products.slice(1,11))
    },[products]);



    

    return (
        <div className=''>
          <div className='flex flex-col items-center gap-0 '>
            <Title text1={'LATEST'} text2={"COLLECTION"}/>
            <p className='text-gray-600'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi, provident.</p>
          </div>
          {/* rendring productt? */}
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-6'>
            {latestProducts.map((items,index)=>(
                <ProductItems key={index} id={items._id} name={items.name} price={items.price} image={items.image}/>
            ))}
          </div>
        </div>
    );
};

export default LatestCollection;
