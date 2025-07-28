import React, { useState } from "react";
import { FiSidebar, FiSettings } from "react-icons/fi";
import { AiOutlineHome } from "react-icons/ai";
import { Link } from "react-router-dom"; // Use this for proper routing
import SettingsModal from "./SettingsModal";

// ✅ Sidebar Component
const LeftBar = ({ isOpen, toggleSidebar }) => {
  const [showSettings, setShowSettings] = useState(false);
  const openSettings = () => setShowSettings(true);
  const closeSettings = () => setShowSettings(false);

  return (
    <>
      {/* ✅ Toggle button (only when sidebar is closed) */}
      {!isOpen && (
        <button
          onClick={toggleSidebar}
          className="fixed top-5 left-5 z-[60] text-3xl text-[var(--color-dark)] cursor-pointer"
        >
          <FiSidebar />
        </button>
      )}

      {/* ✅ Background overlay for small screens */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black/10 z-[40] md:hidden"
        />
      )}

      {/* ✅ Sidebar */}
      <div
        className={`fixed h-full w-64 bg-[var(--color-sidebar)] text-[var(--color-dark)] transition-transform duration-300 z-[50] ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* ✅ Header with Name & Close Button */}
        <div className="flex justify-between items-center px-4 py-4">
          <h2 className="text-2xl font-bold">Disha</h2>

          {/* ✅ Cross icon disappears immediately on click */}
          {isOpen && (
            <button
              onClick={toggleSidebar}
              className="text-3xl text-[var(--color-dark)] cursor-pointer"
            >
              <FiSidebar />
            </button>
          )}
        </div>

        <div className="h-[1px] w-55 bg-[var(--color-dark)] mx-auto mb-6 rounded-full mt-3" />

        {/* ✅ Navigation Links */}
        {/* ✅ Navigation Links - Centered with Icon inline */}
        <div className="flex flex-col items-center text-center gap-6 text-lg mt-8">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 hover:text-[#1e2a35] text-[var(--color-dark)]"
          >
            <AiOutlineHome size={20} />
            <span>Home</span>
          </Link>

          <Link
            to="/journals"
            className="hover:text-[#1e2a35] text-[var(--color-dark)] text-lg"
          >
            All Journals
          </Link>

          <Link
            to="/habits"
            className="hover:text-[#1e2a35] text-[var(--color-dark)] text-lg"
          >
            All Habits
          </Link>

          <Link
            to="/goals"
            className="hover:text-[#1e2a35] text-[var(--color-dark)] text-lg"
          >
            All Goals
          </Link>
        </div>

        {/* ✅ Settings Button at Bottom */}
        <div className="absolute bottom-10 w-full flex justify-center">
          <button
            onClick={openSettings}
            className="flex items-center gap-2 text-[var(--color-dark)] text-xl hover:text-[#1e2a35] cursor-pointer"
          >
            <FiSettings size={24} />
            Settings
          </button>
        </div>
      </div>

      {/* ✅ Settings Modal */}
      {showSettings && <SettingsModal onClose={closeSettings} />}
    </>
  );
};

export default LeftBar;
