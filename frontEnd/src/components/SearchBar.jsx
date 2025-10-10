import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';
import { RxCross1 } from "react-icons/rx";

const SearchBar = () => {
    // Destructure necessary context values
    const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
    const location = useLocation();

    // 1. State for the input field's immediate value
    const [inputText, setInputText] = useState(search); 
    // State to control visibility based on the route
    const [visible, setVisible] = useState(false);

    // Effect to control visibility based on route
    useEffect(() => {
        if (location.pathname.includes('collection')) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    }, [location]);

    // 2. Debouncing Effect: Update the global 'search' state after a delay
    useEffect(() => {
        // Set a timer to update the global search state
        const timer = setTimeout(() => {
            setSearch(inputText);
        }, 500); // 1000 milliseconds = 1 second delay

        // Cleanup function: This runs if 'inputText' changes before the timeout,
        // effectively resetting the timer and preventing the previous value from firing.
        return () => {
            clearTimeout(timer);
        };
    }, [inputText, setSearch]); // Rerun this effect whenever 'inputText' changes

    // Update the local input text state when the user types
    const handleInputChange = (e) => {
        setInputText(e.target.value);
    };

    return showSearch && visible ? (
        <div className='border border-t mt-2 border-b md:gap-3 gap-2 flex md:mx-20 bg-gray-100 p-2 text-center justify-center items-center border-gray-50 text-center'>
            <div className='flex px-5 w-[600px] justify-between gap-5 py-2 rounded-full bg-amber-50'>
                {/* Use inputText for the value and handleInputChange for onChange */}
                <input 
                    onChange={handleInputChange} 
                    value={inputText} // Display the immediate input text
                    className='outline-none w-full' 
                    type="text" 
                    placeholder='Search' 
                />
                <img className='w-6 right-0' src={assets.search_icon} alt="" />
            </div>
            <div>
                <RxCross1 onClick={() => setShowSearch(false)} className='w-7 text-3xl cursor-pointer font-medium' />
            </div>
        </div>
    ) : null;
}

export default SearchBar;