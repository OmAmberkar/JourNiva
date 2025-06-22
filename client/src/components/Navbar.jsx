import React, { useState } from 'react';
import { FaUserCircle, FaBars } from 'react-icons/fa';
import Logo from '../assets/Logo.png';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="relative z-50 flex items-center justify-between px-6 py-4 backdrop-blur-sm bg-gradient-to-b from-black/60 to-black/20">
      {/* Left: Logo */}
      <div className="text-2xl font-semibold flex items-center space-x-2">
        <img src={Logo} alt="logo" className="w-8 h-8" />
      </div>

      {/* Right: Links + Icon */}
      <div className="flex items-center space-x-6">
        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6 text-white text-lg">
          <a href="#" className="hover:text-gray-300">JourNiva</a>
          <a href="#" className="hover:text-gray-300">Get started</a>
          <a href="#" className="hover:text-gray-300">Features</a>
          <a href="#" className="hover:text-gray-300">About us</a>
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-4">
          <div className="md:block text-2xl">
            <FaUserCircle />
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-xl">
            <FaBars />
          </button>
        </div>
      </div>

      {menuOpen && (
  <div className="absolute top-full right-6 mt-2 w-48 bg-black/70 rounded-lg p-4 space-y-3 text-white text-base shadow-lg z-50">
    <a href="#" className="block px-3 py-2 rounded-md transition duration-200 ease-in-out hover:bg-white/10 hover:text-white hover:scale-105">JourNiva</a>
    <a href="#" className="block px-3 py-2 rounded-md transition duration-200 ease-in-out hover:bg-white/10 hover:text-white hover:scale-105">Get started</a>
    <a href="#" className="block px-3 py-2 rounded-md transition duration-200 ease-in-out hover:bg-white/10 hover:text-white hover:scale-105">Features</a>
    <a href="#" className="block px-3 py-2 rounded-md transition duration-200 ease-in-out hover:bg-white/10 hover:text-white hover:scale-105">About us</a>
  </div>
)}

    </nav>
  );
};

export default Navbar;
