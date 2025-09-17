import React from 'react'

const NewsLater = () => {
  return (
    <div className="text-center bg-gray-100  p-6 rounded-lg shadow-md max-w-md mx-auto">
      <p className="text-xl font-semibold text-gray-800">
        Subscribe Now to get 20% off
      </p>
      <p className="mt-3 text-gray-600">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero, sequi.
      </p>
      <form className="mt-5 flex justify-center" action="">
        <input
          type="email"
          placeholder="Enter your email"
          required
          className="px-2 md:px-4 outline-none py-2 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="bg-black text-sm prata-regular text-white px-5 py-2 rounded-r-md  transition-colors"
        >
          Subscribe
        </button>
      </form>
    </div>
  )
}

export default NewsLater
