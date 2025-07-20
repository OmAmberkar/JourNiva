import React, { useState } from 'react';
import LeftSideBar from '../components/Dashboard Components/LeftSideBar';
import { FiSidebar } from 'react-icons/fi';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="relative font-Livvic text-[#3E5973]">
      {/* Sidebar */}
      <LeftSideBar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Sidebar toggle icon (only when sidebar is closed) */}
      {!sidebarOpen && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 text-4xl text-[#3E5973]"
        >
          <FiSidebar />
        </button>
      )}

      {/* Main Content */}
      <div
        className={`transition-all duration-300 ${
          sidebarOpen ? 'ml-64' : 'ml-16'
        } p-8`}
      >
        <h1 className="text-3xl font-semibold mb-4">Dashboard</h1>
        <p>Welcome to your dashboard!</p>
      </div>
    </div>
  );
};

export default Dashboard;
