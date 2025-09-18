import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Collection from './pages/Collection.jsx'
import About from './pages/About.jsx'
import Contact from  './pages/Contact.jsx'
import Product from './pages/Product.jsx'
import Cart from './pages/Cart.jsx'
import Login from './pages/Login.jsx'
import PlaceOrder from './pages/PlaceOrder.jsx'
import Orders from './pages/Orders.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import SearchBar from './components/SearchBar.jsx'
 import { ToastContainer } from 'react-toastify';
import VerifyStrip from './pages/VerifyStrip.jsx'
const App = () => {
  return (
    <>
    <ToastContainer/>
    <Navbar/>
    <hr className='flex sticky z-10 md:top-17 top-19 px-7'/>
    <SearchBar/>
    <div className='md:px-20 px-4 py-4'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/collection' element={<Collection />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/product/:productId' element={<Product />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<Login />} />
        <Route path='/placeorder' element ={<PlaceOrder/>}/>
         <Route path='/orders' element ={<Orders/>}/>
          <Route path='/verify' element ={<VerifyStrip/>}/>
      </Routes>
      <Footer/>
    </div>
    </>
  )
}

export default App