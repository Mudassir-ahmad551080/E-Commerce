import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../components/Title.jsx'
import ProductItems from '../components/ProductItems.jsx';

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);

  const [showfilter, setShowFilter] = useState(false);
  const [filterProduct, setFilterProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [subcategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relevent');

  const tooggleCategory = (e) => {
    const value = e.target.value;
    const checked = e.target.checked;

    if (checked) {
      setCategory(prev => [...prev, value]);
    } else {
      setCategory(prev => prev.filter(item => item !== value));
    }
  }

  const tooglesubCategory = (e) => {
    const value = e.target.value;
    const checked = e.target.checked;
    if (checked) {
      setSubCategory(prev => [...prev, value]);
    } else {
      setSubCategory(prev => prev.filter(item => item !== value));
    }
  }

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }

    if (showSearch && search) {
      productsCopy = productsCopy.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (subcategory.length > 0) {
      productsCopy = productsCopy.filter(item => subcategory.includes(item.subCategory));
    }

    setFilterProduct(productsCopy);
  };

  const sortProduct = () => {
    let fpcopy = filterProduct.slice();
    switch (sortType) {
      case 'low-high':
        setFilterProduct(fpcopy.sort((a, b) => a.price - b.price));
        break;
      case 'high-low':
        setFilterProduct(fpcopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
  }

  useEffect(() => {
    sortProduct();
  }, [sortType])

  useEffect(() => {
    applyFilter();
  }, [category, subcategory, search, showSearch, products])

  // ✅ If data is still loading
  if (!products || products.length === 0) {
    return (
       <div className='min-h-screen justify-center flex items-center'>
        <div className='w-20 h-20 border border-4 border-gray-400 border-t-4 border-t-blue-400 rounded-full animate-spin'>
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-col sm:flex-row sm:flex-wrap  gap-6'>
      {/* filter option */}
      <div className='min-w-60'>
        <p
          onClick={() => setShowFilter(!showfilter)}
          className='my-2 text-xl flex items-center cursor-pointer gap-2'
        >
          FILTER
          <img
            src={assets.dropdown_icon}
            className={`h-3 sm:hidden ${showfilter ? 'rotate-90' : ''}`}
            alt=""
          />
        </p>

        {/* category filter */}
        <div className={`border-2 border-gray-300 p-4 mb-4 ${showfilter ? '' : 'hidden'} sm:block`}>
          <p className='font-bold'>CATEGORY</p>
          <div className='flex flex-col gap-1 mt-4'>
            <p className='gap-2'>
              <input type="checkbox" value={'Men'} onChange={tooggleCategory} /> Men
            </p>
            <p className='gap-2'>
              <input type="checkbox" value={'Women'} onChange={tooggleCategory} /> Women
            </p>
            <p className='gap-2'>
              <input type="checkbox" value={'Kids'} onChange={tooggleCategory} /> Kids
            </p>
          </div>
        </div>

        {/* sub category filter */}
        <div className={`border-2 border-gray-300 p-4 mb-4 ${showfilter ? '' : 'hidden'} sm:block`}>
          <p className='font-bold'>Type</p>
          <div className='flex flex-col gap-1 mt-4'>
            <p className='gap-2'>
              <input type="checkbox" value={'Topwear'} onChange={tooglesubCategory} /> Topwear
            </p>
            <p className='gap-2'>
              <input type="checkbox" value={'Bottomwear'} onChange={tooglesubCategory} /> Bottomwear
            </p>
            <p className='gap-2'>
              <input type="checkbox" value={'Winterwear'} onChange={tooglesubCategory} /> Winterwear
            </p>
          </div>
        </div>
      </div>

      {/* ui for the right side */}
      <div className='flex-1'>
        <div className='md:flex flex-col md:flex-row justify-between mt-3 ml-3 text-base mb-4 sm:text-2xl'>
          <Title text1={"ALL"} text2={"COLLECTION"} />
          {/* product sort */}
          <select
            onChange={(e) => setSortType(e.target.value)}
            className='border cursor-pointer border-gray-400 mt-3 px-2 p-3 text-sm'
          >
            <option value="relevent">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-6'>
          {filterProduct.map((item, index) => (
            <ProductItems
              key={index}
              name={item.name}
              price={item.price}
              image={item.image}
              id={item._id}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Collection
