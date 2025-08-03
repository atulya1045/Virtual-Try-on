import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assests/logo.png";
import { IoCallOutline } from "react-icons/io5";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import { MdOutlineLocalOffer } from "react-icons/md";
import "../../styles/navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const handleChange = (e) => {
    console.log(e.target.value);
  };
  return (
    <nav id="navbar sticky">
      <div className="container mx-auto">
        <div className="flex justify-between items-center py-4">
          <img
            src={logo}
            className="cursor-pointer"
            width="16%"
            alt="logo"
            onClick={() => navigate("/")}
          />
          <form>
            <div className="xl:w-[30rem]">
              <div className="relative flex flex-wrap">
                <input
                  type="search"
                  className="relative m-0 -mr-px block w-[1%] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-1.5 text-base font-normal text-neutral-700 outline-none transition duration-300 ease-in-out focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none"
                  placeholder="Search paints...."
                  aria-label="Search"
                  aria-describedby="button-addon1"
                />

                {/* Search button */}
                <button
                  className="relative z-[2] flex items-center rounded-r bg-primary px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-slate-200 hover:shadow-lg focus:bg-slate-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-slate-200 active:shadow-lg"
                  type="button"
                  id="button-addon1"
                  data-te-ripple-init
                  data-te-ripple-color="light"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="#000"
                    className="h-5 w-5 text-black hover:text-white"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </form>
          <div className="flex justify-center items-center">
            <div className="flex justify-center items-center gap-2 px-4 border-r-2">
              <IoCallOutline size={32} />
              <div>
                <p className="text-xs">
                  <i>Call us Now:</i>
                </p>
                <p className="text-sm font-bold">(+91) 9152256648</p>
              </div>
            </div>
            <div className="flex justify-center items-center gap-2 px-4 border-r-2">
              <FiHeart size={32} />
            </div>
            <div className="flex justify-center items-center gap-2 px-4">
              <div>
                <p className="text-xs">
                  <i>Shopping Cart:</i>
                </p>
                <p className="text-sm font-bold">₹ 0.00</p>
              </div>
              <div className="relative">
                <FiShoppingCart size={32} />
                <div className="absolute top-[0%] -right-[0%]">
                  <div className="leading-none flex justify-center items-center bg-blue-700 w-4 h-4 text-slate-50 rounded-full text-xs -mb-4">
                    <span>0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-start items-center gap-8 px-6 py-2">
          <Link to="/">
            <p className="hover:text-blue-700 font-semibold">Home</p>
          </Link>
          <Link to="/">
            {/* <p className=""> */}
            <div className="hover:text-blue-700 font-semibold">
              <label
                htmlFor="brand"
                className="block text-sm font-medium text-gray-700"
              >
                Brand
              </label>
              <select
                id="brand"
                name="brand"
                className="block w-full py-2 px-3 bg-white text-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="asian_paints">Asian Paints</option>
                <option value="burger_paints">Burger Paints</option>
                <option value="nerolac">Nerolac</option>
              </select>
            </div>
            {/* </p> */}
          </Link>
          <Link to="/suggest">
            <p className="hover:text-blue-700 font-semibold">Suggestions</p>
          </Link>
          <Link to="/">
            <p className="hover:text-blue-700 font-semibold">About Us</p>
          </Link>
          <Link to="/">
            <div className="flex justify-center items-center gap-2">
              <MdOutlineLocalOffer size={22} />
              <p className="hover:text-blue-700 font-semibold">Offers</p>
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
