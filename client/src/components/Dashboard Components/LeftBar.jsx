// import React, { useState } from "react";
// import { IoMdClose } from "react-icons/io";
// import { FiSidebar, FiSettings } from "react-icons/fi";

// // Settings Modal
// const SettingsModal = ({ onClose }) => (
//   <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20">
//     <div className="bg-white rounded-xl p-8 shadow-2xl w-[90%] max-w-xl animate-settingsOpen">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-2xl font-bold text-[#3E5973]">Settings</h2>
//         <button
//           onClick={onClose}
//           className="text-3xl text-[#3E5973] hover:text-red-500"
//         >
//           &times;
//         </button>
//       </div>
//       <p className="text-[#3E5973] text-lg">This is your settings panel.</p>
//     </div>
//   </div>
// );

// const LeftBar = ({ isOpen, toggleSidebar }) => {
//   const [showSettings, setShowSettings] = useState(false);
//   const openSettings = () => setShowSettings(true);
//   const closeSettings = () => setShowSettings(false);

//   return (
//     <>
//       {/* Hamburger icon */}
//       {!isOpen && (
//         <button
//           onClick={toggleSidebar}
//           className="fixed top-5 left-5 z-[60] text-3xl text-[#3E5973]"
//         >
//           <FiSidebar />
//         </button>
//       )}

//       {/* Overlay on mobile */}
//       {isOpen && (
//         <div
//           onClick={toggleSidebar}
//           className="fixed inset-0 bg-black/10 z-[40] md:hidden"
//         />
//       )}

//       {/* Sidebar */}
//       <div
//         className={`fixed top-0 left-0 h-full w-64 bg-[#D0E6F8] text-[#3E5973] transition-transform duration-300 z-[50] ${
//           isOpen ? "translate-x-0" : "-translate-x-full"
//         }`}
//       >
//         {/* Close button */}
//         <div className="flex justify-end p-4">
//           <button
//             onClick={toggleSidebar}
//             className="text-3xl hover:text-[#DCEFFF]"
//           >
//             <IoMdClose />
//           </button>
//         </div>

//         {/* Sidebar content */}
//         <div className="flex flex-col h-full px-4 pb-6">
//           {/* Top part with heading and menu */}
//           <div className="flex-1 text-center space-y-8">
//             <h2 className="text-2xl font-bold">Disha</h2>
//             <div className="h-[1px] w-24 bg-[#3E5973] mx-auto rounded-full" />

//             <ul className="space-y-4 text-lg">
//               <li className="hover:underline cursor-pointer">Home</li>
//               <li className="hover:underline cursor-pointer">All Journal</li>
//               <li className="hover:underline cursor-pointer">All Habits</li>
//               <li className="hover:underline cursor-pointer">All Goals</li>
//             </ul>
//           </div>

//           {/* Settings button pinned to bottom */}
//           <div className="text-center mt-10">
//             <button
//               onClick={openSettings}
//               className="flex items-center justify-center gap-2 text-[#3E5973] text-xl"
//             >
//               <FiSettings size={24} />
//               Settings
//             </button>
//           </div>
//         </div>
//       </div>

//       {showSettings && <SettingsModal onClose={closeSettings} />}
//     </>
//   );
// };

// export default LeftBar;

// import React, { useState } from "react";

// import { IoMdClose } from "react-icons/io";
// import { FiSidebar, FiSettings } from "react-icons/fi";
// import { Link } from "react-router";
// import { AiOutlineHome } from "react-icons/ai";

// // Settings Modal
// const SettingsModal = ({ onClose }) => (
//   <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20">
//     <div className="bg-white rounded-xl p-8 shadow-2xl w-[90%] max-w-xl animate-settingsOpen">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-2xl font-bold text-[#3E5973]">Settings</h2>
//         <button
//           onClick={onClose}
//           className="text-3xl text-[#3E5973] hover:text-red-500"
//         >
//           &times;
//         </button>
//       </div>
//       <p className="text-[#3E5973] text-lg">This is your settings panel.</p>
//     </div>
//   </div>
// );

// const LeftBar = ({ isOpen, toggleSidebar }) => {
//   const [showSettings, setShowSettings] = useState(false);
//   const openSettings = () => setShowSettings(true);
//   const closeSettings = () => setShowSettings(false);

//   return (
//     <>
//       {/* Hamburger (open) icon */}
//       {!isOpen && (
//         <button
//           onClick={toggleSidebar}
//           className="fixed top-5 left-5 z-[60] text-3xl text-[#3E5973] cursor-pointer"
//         >
//           <FiSidebar />
//         </button>
//       )}

//       {/* Light transparent overlay */}
//       {isOpen && (
//         <div
//           onClick={toggleSidebar}
//           className="fixed inset-0 bg-black/10 z-[40] md:hidden" // ✅ 10% black, no blur
//         />
//       )}

//       {/* Sidebar */}
//       <div
//         className={`fixed top-0 left-0 h-full w-64 bg-[#D0E6F8] text-[#3E5973] transition-transform duration-300 z-[50] ${
//           isOpen ? "translate-x-0" : "-translate-x-full"
//         }`}
//       >
//         {/* Close (X) button */}
//         <div className="flex justify-end p-4">
//           <button
//             onClick={toggleSidebar} 
//             className="text-3xl text-[#3E5973] cursor-pointer"
//           >
//             <FiSidebar />
//           </button>
//         </div>

//         {/* Sidebar menu items */}
//         <div className="flex flex-col justify-between px-4 py-2">
//           {/* Top Section: User + Menu */}
//           <div className="space-y-8 text-center">
//             <h2 className="text-2xl font-bold">Disha</h2>
//             <div className="h-[1px] w-24 bg-[#3E5973] mx-auto rounded-full" />
//             <div className="flex flex-col gap-4 text-lg">
//                 <Link to="/dashboard" className="flex items-center justify-center hover:text-[#1e2a35] text-xl text-[#3E5973]">
//                <AiOutlineHome size={24} /> Home
//                 </Link>
//                 <Link to="/journals" className="text-xl text-[#3E5973] hover:text-[#1e2a35]">
//                               All Journals
//                 </Link>
//                 <Link to="/habits" className="text-xl text-[#3E5973] hover:text-[#1e2a35]">
//                               All Habits
//                 </Link>
//                 <Link to="/goals" className="text-xl text-[#3E5973] hover:text-[#1e2a35]">
//                               All Goals
//                 </Link>
//                 </div>

            
            
//               <button
//                 onClick={openSettings}
//                 className="flex gap-2 text-[#3E5973] text-xl hover:text-[#1e2a35] cursor-pointer fixed bottom-10 px-14"
//               >
//                 <FiSettings size={24} />
//                 Settings
//               </button>
            
//           </div>

//           {/* Bottom Section: Settings */}
//         </div>

//         {/* Bottom Settings button */}
//       </div>

//       {showSettings && <SettingsModal onClose={closeSettings} />}
//     </>
//   );
// };

// export default LeftBar;



import React, { useState } from "react";
import { FiSidebar, FiSettings } from "react-icons/fi";
import { AiOutlineHome } from "react-icons/ai";
import { Link } from "react-router-dom"; // Use this for proper routing

// ✅ Settings Modal
const SettingsModal = ({ onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20">
    <div className="bg-white rounded-xl p-8 shadow-2xl w-[90%] max-w-xl animate-settingsOpen">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-[#3E5973]">Settings</h2>
        <button
          onClick={onClose}
          className="text-3xl text-[#3E5973] hover:text-red-500"
        >
          &times;
        </button>
      </div>
      <p className="text-[#3E5973] text-lg">This is your settings panel.</p>
    </div>
  </div>
);

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
          className="fixed top-5 left-5 z-[60] text-3xl text-[#3E5973] cursor-pointer"
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
        className={`fixed h-full w-64 bg-[#D0E6F8] text-[#3E5973] transition-transform duration-300 z-[50] ${
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
              className="text-3xl text-[#3E5973] cursor-pointer"
            >
              <FiSidebar />
            </button>
          )}
        </div>

        <div className="h-[1px] w-55 bg-[#3E5973] mx-auto mb-6 rounded-full mt-9" />

        {/* ✅ Navigation Links */}
        {/* ✅ Navigation Links - Centered with Icon inline */}
<div className="flex flex-col items-center text-center gap-6 text-lg mt-8">
  <Link
    to="/dashboard"
    className="flex items-center gap-2 hover:text-[#1e2a35] text-[#3E5973]"
  >
    <AiOutlineHome size={20} />
    <span>Home</span>
  </Link>

  <Link
    to="/journals"
    className="hover:text-[#1e2a35] text-[#3E5973] text-lg"
  >
    All Journals
  </Link>

  <Link
    to="/habits"
    className="hover:text-[#1e2a35] text-[#3E5973] text-lg"
  >
    All Habits
  </Link>

  <Link
    to="/goals"
    className="hover:text-[#1e2a35] text-[#3E5973] text-lg"
  >
    All Goals
  </Link>
</div>


        {/* ✅ Settings Button at Bottom */}
        <div className="absolute bottom-10 w-full flex justify-center">
          <button
            onClick={openSettings}
            className="flex items-center gap-2 text-[#3E5973] text-xl hover:text-[#1e2a35]"
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

