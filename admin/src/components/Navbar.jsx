import React from 'react'
import {assets} from '../assets/assets.js'
const Navbar = ({setToken}) => {
return (
    <nav className="w-full flex fixed z-50 items-center justify-between px-6 md:px-10 py-4 bg-white shadow-md">
        <img
            src={assets.logo}
            alt="Logo"
            className="h-12 w-auto object-contain"
        />
        <button

          onClick={()=>setToken("")}
            className="bg-zinc-900 hover:bg-zinc-700 cursor-pointer transition-all duration-500 text-white font-semibold py-2 px-5 rounded transition-colors duration-200 text-sm md:text-base"
        >
            Log Out
        </button>
    </nav>
)
}

export default Navbar