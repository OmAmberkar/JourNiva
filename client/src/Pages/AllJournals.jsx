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
      setSidebarOpen(false); // Optional: reset on resize
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative min-h-screen bg-[var(--color-background)] text-[var(--color-dark)] font-Livvic">
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
        <h1 className="text-3xl font-bold mb-4">All Journals</h1>
        {/* Add your journal content here */}
        <div className="relative ">
          <div className="grid grid-cols-2 max-h-screen">
            <div className="border-2 rounded-2xl  h-150">
              <h1 className="text-[var(--color-dark)] text-4xl text-center">Check your Journals</h1>
              <div>
                <p>No journal was written on this date</p>
              </div>
            </div>
            <div className=" border-2 rounded-2xl max-h-fit flex justify-center align-middle">
              <div className="bg-[#D0E6F8] rounded-2xl w-[80%] mt-[20%]">
                <Calendar/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllJournals;
