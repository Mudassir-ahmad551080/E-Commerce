import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { IoMdMenu } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";

const Sidebar = () => {
    const [menu, setMenu] = useState(false);

    return (
        <div>
            {/* Hamburger and Cross buttons */}
            {menu && (
                <RxCross1
                    onClick={() => setMenu(false)}
                    className="md:hidden fixed z-120 top-22 left-4 z-50 cursor-pointer text-3xl text-gray-700"
                />
            )}
            {!menu && (
                <IoMdMenu
                    onClick={() => setMenu(true)}
                    className="md:hidden fixed top-22 left-4 z-50 cursor-pointer text-3xl text-gray-700"
                />
            )}

           <aside
                className={`fixed top-20 border-t left-0 z-110 h-screen w-64 bg-white border-r border-gray-200 flex flex-col justify-between z-40
                ${menu ? 'translate-x-0' : '-translate-x-full'}
                 md:translate-x-0
                  transition-transform duration-300 ease-in-out
                   `}
                 >
                <div className="flex flex-col mt-16 md:mt-5 gap-2 p-6">
                    <NavLink
                        onClick={() => setMenu(false)}
                        to="/add"
                        className={({ isActive }) =>
                            `flex items-center gap-4 px-4 py-3 rounded-lg transition-colors duration-200 ${
                                isActive
                                    ? 'bg-blue-100 text-blue-700 font-semibold'
                                    : 'hover:bg-gray-100 text-gray-700'
                            }`
                        }
                    >
                        <img src={assets.add_icon} alt="Add" className="w-6 h-6" />
                        <span className="text-base">Add Item</span>
                    </NavLink>
                    <NavLink
                        onClick={() => setMenu(false)}
                        to="/list"
                        className={({ isActive }) =>
                            `flex items-center gap-4 px-4 py-3 rounded-lg transition-colors duration-200 ${
                                isActive
                                    ? 'bg-blue-100 text-blue-700 font-semibold'
                                    : 'hover:bg-gray-100 text-gray-700'
                            }`
                        }
                    >
                        <img src={assets.order_icon} alt="List" className="w-6 h-6" />
                        <span className="text-base">List-Item</span>
                    </NavLink>
                    <NavLink
                        onClick={() => setMenu(false)}
                        to="/orders"
                        className={({ isActive }) =>
                            `flex items-center gap-4 px-4 py-3 rounded-lg transition-colors duration-200 ${
                                isActive
                                    ? 'bg-blue-100 text-blue-700 font-semibold'
                                    : 'hover:bg-gray-100 text-gray-700'
                            }`
                        }
                    >
                        <img src={assets.order_icon} alt="Orders" className="w-6 h-6" />
                        <span className="text-base">Orders</span>
                    </NavLink>
                    {/* Add more NavLinks here as needed */}
                    <div className="p-6 border-t mt-50">
                    <span className="text-xs text-gray-400">&copy; 2024 E-Com Admin</span>
                </div>
                </div>
                
            </aside>
        </div>
    )
}

export default Sidebar;
