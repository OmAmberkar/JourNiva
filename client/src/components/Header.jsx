import React, { useState } from "react";
import Logo from "../assets/logo.png";
import BackGround from "../assets/BackGround.png";
import { HiMenu, HiX } from "react-icons/hi"; // Install react-icons if not already

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#DCEFFF] font-sans">
      {/* Navbar */}
      <nav className="w-full flex items-center justify-between px-4 md:px-6 py-2 bg-[#DCEFFF] border-b-2 border-[#3E5973] relative">
        <div className="flex items-center space-x-2">
          <img src={Logo} alt="logo" className="h-14 w-14 object-contain" />
          <h1 className="text-[#3E5973] text-2xl md:text-3xl font-semibold">
            JourNiva
          </h1>
        </div>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex gap-6 text-[#3E5973] text-sm md:text-base font-medium items-center">
          <li className="cursor-pointer">Home</li>
          <li className="cursor-pointer">Features</li>
          <li className="cursor-pointer">Ratings</li>
          <li className="cursor-pointer">About us</li>
          <li>
            <button className="bg-[#3E5973] text-white px-4 py-1 rounded-md hover:bg-[#324b60]">
              Sign up
            </button>
          </li>
          <li>
            <button className="bg-[#a8b4d0] text-white px-4 py-1 rounded-md hover:bg-[#9aa7c1]">
              Login
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

        {/* Mobile Menu */}
        {menuOpen && (
          <ul className="absolute top-20 right-4 w-64 bg-[#dcefff]/60 backdrop-blur-md border border-[#3E5973] flex flex-col items-center text-[#3E5973] text-base font-medium gap-4 py-4 px-6 md:hidden z-50 shadow-xl rounded-xl">
            <li className="cursor-pointer">Home</li>
            <li className="cursor-pointer">Features</li>
            <li className="cursor-pointer">Ratings</li>
            <li className="cursor-pointer">About us</li>
            <li>
              <button className="bg-[#3E5973] text-white px-6 py-2 rounded-md hover:bg-[#324b60]">
                Sign up
              </button>
            </li>
            <li>
              <button className="w-[104px] bg-[#a8b4d0] text-white px-6 py-2 rounded-md hover:bg-[#9aa7c1]">
                Login
              </button>
            </li>
          </ul>
        )}
      </nav>

      {/* Hero Section */}
      <div className="flex justify-center items-center mt-10 px-4">
        <div
          className="rounded-2xl overflow-hidden w-full max-w-[1140px] h-[60vh] sm:h-[500px] md:h-[600px] bg-cover bg-center flex items-center justify-center relative"
          style={{ backgroundImage: `url(${BackGround})` }}
        >
          {/* Hero Content */}
          <div className="relative z-10 text-center text-white px-4">
            <h1 className="text-4xl sm:text-5xl font-normal mb-4">JourNiva</h1>
            <p className="text-lg sm:text-xl mb-6">
              Your personal growth starts here
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <button className="w-[150px] mt-6 bg-[#3E5973] hover:bg-[#324b60] text-white px-6 py-2 rounded-full border border-[#a8b4d0]">
                Login
              </button>
              <button className="w-[150px] mt-6 bg-[#a8b4d0] hover:bg-[#9aa7c1] text-white px-6 py-2 rounded-full border border-[#3E5973]">
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
