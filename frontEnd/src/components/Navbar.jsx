import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets.js'
import { NavLink, Link } from 'react-router-dom'
import { RxCross1 } from "react-icons/rx";
import { ShopContext } from '../context/ShopContext.jsx';
const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const {setShowSearch,  getCartCount ,token,setToken,navigate,setCartItem} = useContext(ShopContext);
  

  const logOut = () =>{
    localStorage.removeItem('token');
    setToken('');
    setCartItem({});
    navigate('/login')
    
  }

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // or 'auto'
    });
  };

  return (
    <div id='mydiv' className='flex sticky z-110 top-0 px-7 justify-between py-5 font-medium'>

      <Link to='/'>
        <img onClick={handleClick} src={assets.logo} className='md:w-36 w-30' alt="" />
      </Link>
      <ul className='hidden md:flex gap-6 '>
        <NavLink onClick={handleClick} to='/' className='flex flex-col items-center gap-1'>
          <p>Home</p>
          <hr className='w-10 border-none h-[1.5px] bg-zinc-700 hidden' />
        </NavLink>
        <NavLink onClick={handleClick} to='/collection' className='flex flex-col items-center gap-1'>
          <p>Collection</p>
          <hr className='w-10 border-none h-[1.5px] bg-zinc-700 hidden' />
        </NavLink>
        <NavLink onClick={handleClick} to='/about' className='flex flex-col items-center gap-1'>
          <p>About</p>
          <hr className='w-10 border-none h-[1.5px] bg-zinc-700 hidden' />
        </NavLink>
        <NavLink onClick={handleClick} to='/contact' className='flex flex-col items-center gap-1'>
          <p>Contact</p>
          <hr className='w-10 border-none h-[1.5px] bg-zinc-700 hidden' />
        </NavLink>
      </ul>
      <div className='flex gap-7  items-center mb-3 '>
       
       <Link to='/collection'>
         <img onClick={()=>{setShowSearch(true),handleClick()}} src={assets.search_icon} className='w-5 cursor-pointer' alt="" />
       </Link>

        <div className='group relative'>
           
           <img onClick={() => (token ? handleClick() : (navigate('/login'), handleClick()))} src={assets.profile_icon} className='w-5 cursor-pointer' alt="" />
            {
              token && <div className='group-hover:block z-110 absolute pt-2 hidden right-0 dropdown-menu'>
               <div className='flex flex-col w-30 p-2 rounded-md py-3  bg-slate-100 '>
              <p className='text-zinc-600 hover:text-black  cursor-pointer'>My-Profile</p>
              <p onClick={()=>navigate('/orders')} className='text-zinc-600 hover:text-black  cursor-pointer'>Orders</p>
              <p onClick={logOut} className='text-zinc-600 hover:text-black  cursor-pointer'>Logout</p>
            </div>
          </div>
            }
        </div>
        <Link to="/cart" className="relative">
          <img className='w-5' src={assets.cart_icon} alt="" />
          <p className='absolute bottom-[-5px] right-[-5px] text-sm bg-black text-white rounded-full  w-4 leading-4 text-center'>{getCartCount()}</p>
        </Link>
        <img onClick={() => setVisible(true)} src={assets.menu_icon} className='cursor-pointer md:hidden w-5' alt="" />
      </div>

      {/* this is for the  mobile scrren */}

      <div className={`top-0 bottom-0 md:hidden right-0 h-screen absolute bg-slate-100 transition-all overflow-hidden ${visible ? 'w-full' : 'w-0'}`}>
        <div onClick={() => setVisible(false)} className='flex gap-4 mt-2'>
          <RxCross1 className='w-10 text-3xl mt-3 ml-2 font-medium' />
        </div>
        <div>
          <div className='flex flex-col items-center gap-5 justify-center mt-30 mb-10'>
            <NavLink  to='/' className='font-bold ' onClick={() => {setVisible(false),handleClick()}}>Home</NavLink>
            <NavLink  to='/collection' className='font-bold ' onClick={() => {setVisible(false),handleClick()}}>Collection</NavLink>
            <NavLink  to='/about' className='font-bold ' onClick={() => {setVisible(false),handleClick()}}>About</NavLink>
            <NavLink  to='/orders' className='font-bold ' onClick={() => {setVisible(false),handleClick()}}>Orders</NavLink>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Navbar