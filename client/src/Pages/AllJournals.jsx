import React, { useState, useEffect } from "react";
import LeftBar from "../components/Dashboard Components/LeftBar";
import MobileLeftBar from "../components/Dashboard Components/MobileLeftBar";
import Calendar from "../components/All Journals Components/Calendar";

const AllJournals = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  useEffect(() => {
    const handleResize = () => {
      const isLg = window.innerWidth >= 1024;
      setIsLargeScreen(isLg);
      setSidebarOpen(false); // reset on resize
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative min-h-screen bg-[var(--color-background)] text-[var(--color-dark)] font-Livvic">
          {/* Sidebar */}
      {isLargeScreen ? (
        <LeftBar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      ) : (
        <MobileLeftBar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      )}
      {/* Main content wrapper */}
      <div
        className={`
          transition-all duration-300 px-4 sm:px-6 md:px-10 lg:px-16 py-3 
          ${sidebarOpen && isLargeScreen ? "lg:ml-64" : "lg:ml-0"}
        `}
      >
        {/* ✅ Header Section */}
        <header className="flex items-center justify-between mb-6 ">
          <h1 className="text-3xl font-bold ml-8 mr-4">All Journals</h1>
          <div className="h-12 w-12 rounded-full border-2 border-[var(--color-dark)] flex items-center justify-center cursor-pointer">
            {/* Replace with user avatar if available */}
            <span className="text-sm font-semibold">Profile</span>
          </div>
        </header>
        <div className="border-1 border-[var(--color-dark)]"></div>

        {/* ✅ Body Section (Two-Column Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Journals Section */}
          <div className="bg-[var(--color-background)] rounded-2xl p-6 text-center ">
            <h2 className="text-[var(--color-dark)] text-4xl font-semibold mb-4">
              Check your Journals
            </h2>
            <p className="text-[var(--color-dark)] ">
              No journal was written on this date
            </p>
          </div>

          {/* Calendar Section */}
          <div className="bg-[var(--color-background)] rounded-2xl p-6 flex justify-center my-10">
            <Calendar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllJournals;
