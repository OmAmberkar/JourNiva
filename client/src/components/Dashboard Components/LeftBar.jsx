// src/components/LeftBar.jsx
import React from "react";
import { HiMiniBars3 } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";

const LeftBar = ({ isOpen, toggleSidebar }) => {
  return (
    <>
      {/* Hamburger (open) icon */}
      {!isOpen && (
        <button
          onClick={toggleSidebar}
          className="fixed top-5 left-5 z-[60] text-3xl text-[#3E5973]"
        >
          <HiMiniBars3 />
        </button>
      )}

      {/* Light transparent overlay */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black/10 z-[40] md:hidden" // ✅ 10% black, no blur
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[#3E5973] text-white shadow-lg transition-transform duration-300 z-[50] ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close (X) button */}
        <div className="flex justify-end p-4">
          <button
            onClick={toggleSidebar}
            className="text-3xl text-white hover:text-gray-300"
          >
            <IoMdClose />
          </button>
        </div>

        {/* Sidebar menu items */}
        <div className="px-6 space-y-4">
          <h2 className="text-xl font-bold">Sidebar Menu</h2>
          <ul className="space-y-2 text-base">
            <li className="hover:underline cursor-pointer">Dashboard</li>
            <li className="hover:underline cursor-pointer">Journal</li>
            <li className="hover:underline cursor-pointer">Settings</li>
            <li className="hover:underline cursor-pointer">Logout</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default LeftBar;
