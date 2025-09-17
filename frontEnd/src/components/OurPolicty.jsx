import React from 'react';
import { assets } from '../assets/assets';

const OurPolicy = () => {
  return (
    <div className="flex flex-col md:flex-row gap-12 md:gap-20 justify-between items-center px-6 md:px-20 py-12 bg-white shadow-md rounded-lg mt-10 mb-10">
      
      {/* Single Policy Item */}
      <div className="flex flex-col items-center text-center max-w-xs md:max-w-sm">
        <img src={assets.exchange_icon} alt="Exchange Policy" className="w-16 h-16 mb-4" />
        <h3 className="font-semibold text-lg md:text-xl mb-1 text-gray-800">Easy Exchange Policy</h3>
        <p className="text-gray-600 text-sm md:text-base">
          We offer free exchange policy for your convenience.
        </p>
      </div>

      <div className="flex flex-col items-center text-center max-w-xs md:max-w-sm">
        <img src={assets.quality_icon} alt="Return Policy" className="w-16 h-16 mb-4" />
        <h3 className="font-semibold text-lg md:text-xl mb-1 text-gray-800">7 Days Return Policy</h3>
        <p className="text-gray-600 text-sm md:text-base">
          We provide a 7-day return policy for all products.
        </p>
      </div>
      
      <div className="flex flex-col items-center text-center max-w-xs md:max-w-sm">
        <img src={assets.support_img} alt="Customer Support" className="w-16 h-16 mb-4" />
        <h3 className="font-semibold text-lg md:text-xl mb-1 text-gray-800">Best Customer Support</h3>
        <p className="text-gray-600 text-sm md:text-base">
          24/7 customer support available to assist you anytime.
        </p>
      </div>

    </div>
  );
};

export default OurPolicy;
