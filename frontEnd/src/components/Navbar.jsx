import React, { useContext, useState } from "react";
import { assets } from "../assets/assets.js";
import { NavLink, Link } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import { ShopContext } from "../context/ShopContext.jsx";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false); // 👈 for mobile profile menu
  const { setShowSearch, getCartCount, token, setToken, navigate, setCartItem } =
    useContext(ShopContext);

  const logOut = () => {
    localStorage.removeItem("token");
    setToken("");
    setCartItem({});
    navigate("/login");
  };

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="flex sticky z-110 top-0 md:px-7 px-4 justify-between py-5 font-medium bg-white shadow">
      {/* Logo */}
      <Link to="/">
        <img
          onClick={handleClick}
          src={assets.logo}
          className="md:w-32 w-28"
          alt="logo"
        />
      </Link>

      {/* Admin button (desktop only) */}
      <button
        onClick={() =>
          window.open("https://e-commerce-admin-seven-zeta.vercel.app/", "_blank")
        }
        className="text-sm hidden md:block hover:bg-black hover:text-white transition-all duration-500 rounded-full px-5 py-1 bg-transparent border cursor-pointer"
      >
        Admin Dashboard
      </button>

      {/* Nav links (desktop only) */}
      <ul className="hidden md:flex gap-8">
        {[
          { path: "/", label: "Home" },
          { path: "/collection", label: "Collection" },
          { path: "/about", label: "About" },
          { path: "/contact", label: "Contact" },
        ].map((item) => (
          <NavLink
            key={item.path}
            onClick={handleClick}
            to={item.path}
            className="flex flex-col items-center gap-1 hover:text-black"
          >
            <p>{item.label}</p>
            <hr className="w-10 border-none h-[1.5px] bg-zinc-700 hidden" />
          </NavLink>
        ))}
      </ul>

      {/* Right section */}
      <div className="flex gap-7 items-center mb-3">
        {/* Search */}
        <Link to="/collection">
          <img
            onClick={() => {
              setShowSearch(true);
              handleClick();
            }}
            src={assets.search_icon}
            className="w-5 cursor-pointer"
            alt="search"
          />
        </Link>

        {/* Profile */}
        <div className="relative group">
          {/* Profile icon */}
          <img
            onClick={() => {
              if (token) {
                if (window.innerWidth < 768) {
                  // 👈 Only toggle on mobile
                  setProfileOpen(!profileOpen);
                } else {
                  handleClick();
                }
              } else {
                navigate("/login");
                handleClick();
              }
            }}
            src={assets.profile_icon}
            className="w-5 cursor-pointer"
            alt="profile"
          />

          {/* Desktop hover menu */}
          {token && (
            <div className="hidden md:block absolute right-0 mt-2 opacity-0 group-hover:opacity-100 hover:opacity-100 transition z-50">
              <div className="flex flex-col w-32 p-2 rounded-md bg-slate-100 shadow-md">
                <p className="text-zinc-600 hover:text-black cursor-pointer">
                  My Profile
                </p>
                <p
                  onClick={() => navigate("/orders")}
                  className="text-zinc-600 hover:text-black cursor-pointer"
                >
                  Orders
                </p>
                <p
                  onClick={logOut}
                  className="text-zinc-600 hover:text-black cursor-pointer"
                >
                  Logout
                </p>
              </div>
            </div>
          )}

          {/* Mobile click menu */}
          {token && profileOpen && (
            <div className="absolute right-0 mt-2 block md:hidden z-50">
              <div className="flex flex-col w-32 p-2 rounded-md bg-slate-100 shadow-md">
                <p className="text-zinc-600 hover:text-black cursor-pointer">
                  My Profile
                </p>
                <p
                  onClick={() => {
                    navigate("/orders");
                    setProfileOpen(false);
                  }}
                  className="text-zinc-600 hover:text-black cursor-pointer"
                >
                  Orders
                </p>
                <p
                  onClick={() => {
                    logOut();
                    setProfileOpen(false);
                  }}
                  className="text-zinc-600 hover:text-black cursor-pointer"
                >
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Cart */}
        <Link to="/cart" className="relative">
          <img className="w-5" src={assets.cart_icon} alt="cart" />
          <p className="absolute bottom-[-5px] right-[-5px] text-sm bg-black text-white rounded-full w-4 leading-4 text-center">
            {getCartCount()}
          </p>
        </Link>

        {/* Mobile menu icon */}
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="cursor-pointer md:hidden w-5"
          alt="menu"
        />
      </div>

      {/* Mobile sidebar menu */}
      <div
        className={`top-0 bottom-0 md:hidden right-0 h-screen absolute bg-slate-100 transition-all overflow-hidden ${visible ? "w-full" : "w-0"
          }`}
      >
        <div onClick={() => setVisible(false)} className="flex gap-4 mt-2">
          <RxCross1 className="w-10 text-3xl mt-3 ml-2 font-medium cursor-pointer" />
        </div>
        <div>
          <div className="flex flex-col items-center gap-5 justify-center mt-30 mb-10">
            <NavLink
              to="/"
              className="font-bold"
              onClick={() => {
                setVisible(false);
                handleClick();
              }}
            >
              Home
            </NavLink>
            <NavLink
              to="/collection"
              className="font-bold"
              onClick={() => {
                setVisible(false);
                handleClick();
              }}
            >
              Collection
            </NavLink>
            <NavLink
              to="/about"
              className="font-bold"
              onClick={() => {
                setVisible(false);
                handleClick();
              }}
            >
              About
            </NavLink>
            <NavLink
              to="/orders"
              className="font-bold"
              onClick={() => {
                setVisible(false);
                handleClick();
              }}
            >
              Orders
            </NavLink>
            <button
              onClick={() =>
                window.open(
                  "https://e-commerce-admin-seven-zeta.vercel.app/",
                  "_blank"
                )
              }
              className="text-sm block md:hidden hover:bg-black hover:text-white transition-all duration-500 rounded-full px-5 py-1 bg-transparent border cursor-pointer"
            >
              Admin Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
