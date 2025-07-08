/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import Logo from "../assets/logo.png";
import { Link, useLocation } from "react-router";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="w-full sticky top-0 z-50 flex items-center justify-between px-4 md:px-6 py-2 bg-[#DCEFFF]/60 backdrop-blur-md border-b-2 border-[#3E5973] shadow-md font-Livvic">
      {/* Logo + Brand */}
      <div className="flex items-center space-x-2">
        <img src={Logo} alt="logo" className="h-14 w-14 object-contain" />
        <h1 className="text-[#3E5973] text-2xl md:text-3xl">JourNiva</h1>
      </div>

      {/* Desktop Nav */}
      <ul className="hidden md:flex gap-6 text-[#3E5973] text-sm md:text-base font-medium items-center">
        <li>
          <Link to="/" className="hover:underline" onClick={handleLinkClick}>
            Home
          </Link>
        </li>
        <li>
          <Link
            to={{ pathname: "/", hash: "#Features" }}
            className="hover:underline"
            onClick={handleLinkClick}
          >
            Features
          </Link>
        </li>
        <li>
          <Link
            to={{ pathname: "/", hash: "#Colors" }}
            className="hover:underline"
            onClick={handleLinkClick}
          >
            About Theme
          </Link>
        </li>
        <li>
          <Link
            to="/about"
            className="hover:underline"
            onClick={handleLinkClick}
          >
            About us
          </Link>
        </li>
        <li>
          
          <button className="bg-[#3E5973] text-white px-4 py-1 rounded-md hover:bg-[#9aa7c1]" onClick={() => navigate('/getstarted')}>
            Get Started !
          </button>
        </li>
      </ul>

      {/* Hamburger Icon */}
      <div className="md:hidden">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-[#3E5973] text-3xl focus:outline-none"
        >
          {menuOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <ul className="absolute top-20 right-4 w-64 bg-[#dcefff]/80 backdrop-blur-md border border-[#3E5973] flex flex-col items-center text-[#3E5973] text-base font-medium gap-4 py-4 px-6 md:hidden z-50 shadow-xl rounded-xl">
          <li onClick={handleLinkClick}>
            <Link
              to={{ pathname: "/", hash: "#Home" }}
              className="w-full text-center block"
            >
              Home
            </Link>
          </li>
          <li onClick={handleLinkClick}>
            <Link
              to={{ pathname: "/", hash: "#Features" }}
              className="w-full text-center block"
            >
              Features
            </Link>
          </li>
          <li onClick={handleLinkClick}>
            <Link
              to={{ pathname: "/", hash: "#Colors" }}
              className="w-full text-center block"
            >
              About Colors
            </Link>
          </li>
          <li onClick={handleLinkClick}>
            <Link to="/about" className="w-full text-center block">
              About us
            </Link>
          </li>
          <li>
            <button className="w-full bg-[#a8b4d0] text-white px-4 py-1 rounded-md hover:bg-[#9aa7c1]"  onClick={() => navigate('/getstarted')}  >
              Get Started
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
