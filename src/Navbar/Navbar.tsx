import { useState } from "react";
import SearchBar from "./SearchBar/SearchBar";
import SearchBarForSm from "./SearchBar/SearchBarForSm";
import DropdownMenu from "./DropdownMenu/DropdownMenu";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClick = () => {
    const confirmed = window.confirm("Do you want to call this number?");
    if (confirmed) {
      window.location.href = "tel:017****9955";
    }
  };

  return (
    <nav className="bg-white border-2 border-slate-200 p-2 w-full h-[70px] flex items-center justify-between fixed z-40 ">
      {/* Logo */}
      <Link to="/">
        <div className="md:flex-1 sm:hidden md:flex md:items-center md:pl-24">
          <img
            className="h-14"
            src="https://i.ibb.co/PwZTzTz/1715269339-160-01-1.webp"
            alt="logo.web"
          />
        </div>
      </Link>

      {/* Mobile Menu Button */}
      <div className="flex items-center justify-start md:hidden w-60">
        <SearchBarForSm />

        <div className="flex md:hidden ml-1 mr-4 flex-1 justify-center">
          <div className="relative inline-block">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
              className="w-8 h-8 text-black"
            >
              <path d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96zM252 160c0 11 9 20 20 20l44 0 0 44c0 11 9 20 20 20s20-9 20-20l0-44 44 0c11 0 20-9 20-20s-9-20-20-20l-44 0 0-44c0-11-9-20-20-20s-20 9-20 20l0 44-44 0c-11 0-20 9-20 20z" />
            </svg>
            <span className="absolute top-0 right-0 h-5 w-5 rounded-full ring-2 ring-white bg-green-500 text-white text-xs font-bold flex items-center justify-center transform translate-x-1/2 -translate-y-1/2">
              0
            </span>
          </div>
        </div>
      </div>

      <div className="flex md:hidden">
        <button
          onClick={handleSidebarToggle}
          className="text-gray-500 focus:outline-none mr-2"
        >
          <svg
            className="w-8 h-8"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      {/* Search Bar */}
      <div className="hidden md:flex flex-[5]">
        <SearchBar />
      </div>

      {/* Call Button */}
      <div className="hidden md:flex justify-center flex-1">
        <button
          onClick={handleClick}
          className="bg-slate-800 text-slate-100 flex items-center p-2 rounded-lg h-14"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-phone-call h-6 mr-3"
          >
            <path d="M15.05 5a5 5 0 0 1 4 4M15.05 1a9 9 0 0 1 8 8M21.05 16.72v3.05a2 2 0 0 1-2.18 2c-3.16-.35-6.18-1.61-8.68-3.58a18.82 18.82 0 0 1-5.68-5.68c-1.97-2.5-3.23-5.52-3.58-8.68A2 2 0 0 1 4.2 2h3.05a2 2 0 0 1 2 1.72c.2 1.41.57 2.77 1.1 4.05a2 2 0 0 1-.45 2.11l-1.27 1.27a16 16 0 0 0 5.68 5.68l1.27-1.27a2 2 0 0 1 2.11-.45c1.28.53 2.64.9 4.05 1.1a2 2 0 0 1 1.72 2z"></path>
          </svg>
          <div>
            <h1 className="font-medium text-sm">017****9955</h1>
            <p className="font-medium text-xs">Call us anytime</p>
          </div>
        </button>
      </div>

      {/* Add Product Button */}
      <div className="hidden md:flex justify-center flex-1">
        <button className="bg-slate-800 text-slate-100 flex items-center p-2 rounded-lg h-14">
          <svg
            className="h-7 pr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            fill="currentColor"
          >
            <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344l0-64-64 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l64 0 0-64c0-13.3 10.7-24 24-24s24 10.7 24 24l0 64 64 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-64 0 0 64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
          </svg>
          <p>Add product</p>
        </button>
      </div>

      {/* Cart Button */}
      <div className="hidden md:flex flex-1 justify-center">
        <div className="relative inline-block">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
            className="w-8 h-8 text-black"
          >
            <path d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96zM252 160c0 11 9 20 20 20l44 0 0 44c0 11 9 20 20 20s20-9 20-20l0-44 44 0c11 0 20-9 20-20s-9-20-20-20l-44 0 0-44c0-11-9-20-20-20s-20 9-20 20l0 44-44 0c-11 0-20 9-20 20z" />
          </svg>
          <span className="absolute top-0 right-0 h-5 w-5 rounded-full ring-2 ring-white bg-green-500 text-white text-xs font-bold flex items-center justify-center transform translate-x-1/2 -translate-y-1/2">
            0
          </span>
        </div>
      </div>

      {/* Sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex">
          <div className="bg-white w-64 h-full p-5">
            <div className="flex justify-between items-start">
              <button
                onClick={handleSidebarToggle}
                className="text-gray-500 focus:outline-none mb-4"
              >
                <svg
                  className="w-8 h-8"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <DropdownMenu />
            </div>

            <div className="flex flex-col space-y-4">
              <button className="bg-slate-800 text-slate-100 flex items-center p-2 rounded-lg h-14">
                <svg
                  className="h-12 pr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  fill="currentColor"
                >
                  <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344l0-64-64 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l64 0 0-64c0-13.3 10.7-24 24-24s24 10.7 24 24l0 64 64 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-64 0 0 64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
                </svg>
                <p className="text-2xl">Add product</p>
              </button>
              <button
                onClick={handleClick}
                className="bg-slate-800 text-slate-100 flex items-center p-2 rounded-lg h-14"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-phone-call h-12 mr-4"
                >
                  <path d="M15.05 5a5 5 0 0 1 4 4M15.05 1a9 9 0 0 1 8 8M21.05 16.72v3.05a2 2 0 0 1-2.18 2c-3.16-.35-6.18-1.61-8.68-3.58a18.82 18.82 0 0 1-5.68-5.68c-1.97-2.5-3.23-5.52-3.58-8.68A2 2 0 0 1 4.2 2h3.05a2 2 0 0 1 2 1.72c.2 1.41.57 2.77 1.1 4.05a2 2 0 0 1-.45 2.11l-1.27 1.27a16 16 0 0 0 5.68 5.68l1.27-1.27a2 2 0 0 1 2.11-.45c1.28.53 2.64.9 4.05 1.1a2 2 0 0 1 1.72 2z"></path>
                </svg>
                <div>
                  <h1 className="font-medium text-2xl">017****9955</h1>
                  <p className="font-medium text-lg">Call us anytime</p>
                </div>
              </button>
            </div>
          </div>
          <div className="flex-1" onClick={handleSidebarToggle}></div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
