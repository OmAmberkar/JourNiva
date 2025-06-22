
import React, { useState } from 'react';
import BgImage from '../assets/BgGreen.jpg';
import Logo from '../assets/Logo.png';
import { FaUserCircle, FaBars } from 'react-icons/fa';
import '../App.css';

const LandingPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      className="min-h-screen bg-cover bg-center text-white"
      style={{
        backgroundImage: `url(${BgImage})`,
        fontFamily: 'Judson, serif',
      }}
    >
      {/* Navbar */}
      {/* Navbar */}
      <nav className="relative z-50 flex items-center justify-between px-6 py-4 backdrop-blur-sm bg-gradient-to-b from-black/60 to-black/20">
        {/* Logo */}
        <div className="text-2xl font-semibold flex items-center space-x-2">
          <img src={Logo} alt="logo" className="w-8 h-8" />
        </div>

        {/* Desktop Nav */}
        <div className="space-x-6 hidden md:flex text-white text-lg">
          <a href="#" className="hover:text-gray-300">JourNiva</a>
          <a href="#" className="hover:text-gray-300">Get started</a>
          <a href="#" className="hover:text-gray-300">Features</a>
          <a href="#" className="hover:text-gray-300">About us</a>
        </div>

        {/* User Icon / Menu Toggle */}
        <div className="flex items-center space-x-4">
          <div className=" md:block text-2xl">
            <FaUserCircle />
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-xl">
            <FaBars />
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="absolute top-full right-6 mt-2 w-48 bg-black/70 rounded-lg p-4 space-y-3 text-white text-base shadow-lg z-50">
            <a href="#" className="block hover:text-gray-300">JourNiva</a>
            <a href="#" className="block hover:text-gray-300">Get started</a>
            <a href="#" className="block hover:text-gray-300">Features</a>
            <a href="#" className="block hover:text-gray-300">About us</a>
          </div>
        )}
      </nav>

      

      {/* Title & Subtitle */}
      <div className="flex flex-col justify-center mt-10 mb-6 pl-8 sm:pl-16 md:pl-24 lg:pl-32">
        <h1 className="text-white text-5xl sm:text-6xl font-bold mb-2">
          JourNiva
        </h1>
        <div className="flex gap-6 text-lg sm:text-xl tracking-wide">
          <span>Write.</span>
          <span>Reflect.</span>
          <span>Rise.</span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="w-full flex justify-center sm:justify-end py-12 px-4">
        <div className="relative bg-black/20 px-6 py-8 rounded-xl sm:mr-10 md:mr-16 lg:mr-24 xl:mr-32">
          {/* Top Crossing Lines */}
          <span className="absolute -top-2 -left-6 w-[180px] h-[2px] bg-white z-20"></span>
          <span className="absolute -top-6 -left-2 h-[180px] w-[2px] bg-white z-10"></span>

          {/* Text */}
          <p className="text-base sm:text-lg md:text-2xl leading-relaxed font-light text-white">
            A quiet place for your loudest thoughts. <br />
            For messy minds and blooming hearts. <br />
            <span className="text-white/90">JourNiva is where you pause,</span><br />
            capture the now, <br />
            and gently rise — one word at a time.
          </p>

          {/* Button */}
          <div className="mt-6 flex justify-center">
            <button className="text-[#2F1313] bg-[#D9D9D9] px-4 py-1 rounded-xl font-medium 
                     hover:bg-[#2F1313] hover:text-[#D9D9D9] transition cursor-pointer">
              Get Started
            </button>
          </div>

          {/* Bottom Crossing Lines */}
          <span className="absolute -bottom-2 -right-6 w-[180px] h-[2px] bg-white z-20"></span>
          <span className="absolute -bottom-6 -right-2 h-[180px] w-[2px] bg-white z-10"></span>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
