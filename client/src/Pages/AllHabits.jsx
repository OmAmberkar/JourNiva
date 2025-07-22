import React, { useState, useEffect } from "react";
import LeftBar from "../components/Dashboard Components/LeftBar";
import MobileLeftBar from "../components/Dashboard Components/MobileLeftBar";

const AllHabits = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  useEffect(() => {
    const handleResize = () => {
      const isLg = window.innerWidth >= 1024;
      setIsLargeScreen(isLg);
      setSidebarOpen(false); // Optional: close on resize
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#DCEFFF] text-[#3E5973] font-Livvic">
      {/* ✅ Left Sidebar */}
      {isLargeScreen ? (
        <LeftBar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      ) : (
        <MobileLeftBar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      )}

      {/* ✅ Main Content */}
      <div
        className={`
          transition-all duration-300 px-4 sm:px-6 md:px-10 lg:px-16 py-4
          ${sidebarOpen && isLargeScreen ? "lg:ml-64" : "lg:ml-0"}
        `}
      >
        <h1 className="text-3xl font-bold mb-4">All Habits</h1>
        {/* You can add your habit content here */}
      </div>
    </div>
  );
};

export default AllHabits;
