import React, {  useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Add from './pages/Add.jsx'
import Orders from './pages/Orders.jsx'
import List from './pages/List.jsx'
import Login from './components/Login.jsx'
  import { ToastContainer } from 'react-toastify';

export const backendUrl = import.meta.env.VITE_BACKEND_URL;

const App = () => {

  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : "");
  
  useEffect(() =>{
    localStorage.setItem('token',token);
  }, [token])

  return (
    <div className='w-full min-h-screen bg-white'>
      <ToastContainer />
      {token === "" ? <Login setToken={setToken}/> :
 
        <>
          <Navbar setToken = {setToken} />
          <hr className='text-zinc-800 bg-zinc-700' />
          <div className='flex flex-row '>
            <Sidebar />
            <div className='md:ml-64 w-full p-4 md:p-8'>
              <Routes>
                <Route path='/add' element={<Add token={token} />} />
                <Route path='/list' element={<List token={token} />} />
                <Route path='/orders' element={<Orders token={token} />} />
              </Routes>
            </div>
          </div>
        </>


      }

    </div>
  )
}

export default App