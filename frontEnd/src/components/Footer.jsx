import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className="bg-gray-50">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-t-2 border-gray-300 mt-10 pt-6 px-5 md:px-20">
        {/* Logo & Description */}
        <div className="mb-8 md:mb-0 md:w-1/3">
          <img className="w-40 mb-5" src={assets.logo} alt="Logo" />
          <p className="text-sm text-gray-600 leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, sint.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, sint.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, sint.
          </p>
        </div>

        {/* Company Links */}
        <div className="mb-8 md:mb-0 md:w-1/4">
          <p className="font-semibold mb-4 text-lg text-gray-800">Company</p>
          <ul className="text-sm text-gray-600">
            <li className="mb-2 cursor-pointer hover:text-gray-800 transition-colors">About Us</li>
            <li className="mb-2 cursor-pointer hover:text-gray-800 transition-colors">Contact</li>
            <li className="mb-2 cursor-pointer hover:text-gray-800 transition-colors">Privacy Policy</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="md:w-1/4 text-sm text-gray-600">
          <p className="font-semibold mb-4 text-lg text-gray-800">Get In Touch</p>
          <ul>
            <li className="mb-2">📞 03215837843</li>
            <li className="mb-2">📧 ma6386731@gmail.com</li>
            <li>📍 Address: Peshawar</li>
          </ul>
        </div>
      </div>
      <div>
        <p className="text-center text-sm text-gray-500 py-4">© 2025 Your Company. All rights reserved.</p>
      </div>
    </div>
  )
}

export default Footer
