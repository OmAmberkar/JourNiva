// import React, { useState } from 'react';
// import { AiOutlineHome } from 'react-icons/ai';
// import { FiSidebar, FiSettings } from 'react-icons/fi';
// import { Link } from 'react-router-dom';

// // Settings Modal
// const SettingsModal = ({ onClose }) => {
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20 transition-opacity duration-300">
//       <div className="bg-white rounded-xl p-8 shadow-2xl w-[90%] max-w-xl transform animate-settingsOpen">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-2xl font-bold text-[#3E5973]">Settings</h2>
//           <button onClick={onClose} className="text-3xl text-[#3E5973] hover:text-red-500">
//             &times;
//           </button>
//         </div>
//         <div>
//           <p className="text-[#3E5973] text-lg">
//             This is your smooth, animated settings window. Add your preferences here.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// const LeftSideBar = ({ isOpen, toggleSidebar }) => {
//   const [showSettings, setShowSettings] = useState(false);

//   const openSettings = () => setShowSettings(true);
//   const closeSettings = () => setShowSettings(false);

//   return (
//     <>
//       {/* Sidebar */}
//       <div
//         className={`fixed top-0 left-0 h-full w-64 bg-[#D0E6F8]  transform ${
//           isOpen ? 'translate-x-0' : '-translate-x-full'
//         } transition-transform duration-300 ease-in-out z-40`}
//       >
//         {/* Sidebar toggle */}
//         {isOpen && (
//           <button
//             onClick={toggleSidebar}
//             className="absolute top-4 right-4 text-4xl text-[#3E5973] cursor-pointer"
//           >
//             <FiSidebar />
//           </button>
//         )}

//         {/* Sidebar content */}
//         <div className="flex flex-col justify-between h-full pt-9 pb-6 px-8">
//           {/* Top: Username and Links */}
//           <div className="flex flex-col space-y-6 items-center w-full">
//             {/* Username */}
//             <div className="text-center w-full">
//               <p className="text-2xl font-bold text-[#3E5973]">Nitin</p>
//               <div className="mt-2 h-[1px] w-35 bg-[#3E5973] mx-auto rounded-full" />
//             </div>

//             {/* Nav Links */}
//             <Link
//   to="/dashboard"
//   className="flex items-center gap-4 text-[#3E5973]  text-xl font-medium"
// >
//   <AiOutlineHome size={25} />
//   <span className="relative top-[1px]">Home</span>
// </Link>



//             <Link
//               to="/journals"
//               className="text-[#3E5973]  text-xl font-medium"
//             >
//               All Journals
//             </Link>

//             <Link
//               to="/habits"
//               className="text-[#3E5973]  text-xl font-medium"
//             >
//               All Habits
//             </Link>

//             <Link
//               to="/goals"
//               className="text-[#3E5973] text-xl font-medium"
//             >
//               All Goals
//             </Link>
//           </div>

//           {/* Bottom: Settings */}
//           <button
//   onClick={openSettings}
//   className="flex items-center gap-4 text-[#3E5973] text-xl font-medium justify-center cursor-pointer"
// >

//             <FiSettings size={26} />
//             <span>Settings</span>
//           </button>
//         </div>
//       </div>

//       {/* Settings modal */}
//       {showSettings && <SettingsModal onClose={closeSettings} />}
//     </>
//   );
// };

// export default LeftSideBar;





















// import React, { useState } from 'react';
// import { AiOutlineHome } from 'react-icons/ai';
// import { FiSidebar, FiSettings } from 'react-icons/fi';
// import { Link } from 'react-router-dom';

// // Settings Modal
// const SettingsModal = ({ onClose }) => (
//   <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20">
//     <div className="bg-white rounded-xl p-8 shadow-2xl w-[90%] max-w-xl animate-settingsOpen">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-2xl font-bold text-[#3E5973]">Settings</h2>
//         <button onClick={onClose} className="text-3xl text-[#3E5973] hover:text-red-500">
//           &times;
//         </button>
//       </div>
//       <p className="text-[#3E5973] text-lg">This is your settings panel.</p>
//     </div>
//   </div>
// );

// const LeftSideBar = ({ isOpen, toggleSidebar }) => {
//   const [showSettings, setShowSettings] = useState(false);
//   const openSettings = () => setShowSettings(true);
//   const closeSettings = () => setShowSettings(false);

//   return (
//     <>
//       {/* Dark overlay on small screens */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black/40 z-30 lg:hidden"
//           onClick={toggleSidebar}
//         />
//       )}

//       {/* Sidebar */}
//       <div
//         className={`fixed top-0 left-0 h-full w-64 bg-[#D0E6F8] z-40 transform transition-transform duration-300 ease-in-out
//         ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static`}
//       >
//         {/* Close button for mobile */}
//         <div className="lg:hidden absolute top-4 right-4">
//           <button onClick={toggleSidebar} className="text-3xl text-[#3E5973]">
//             <FiSidebar />
//           </button>
//         </div>

//         {/* Sidebar Content */}
//         <div className="flex flex-col justify-between h-full pt-9 pb-6 px-8">
//           <div className="flex flex-col space-y-6 items-center">
//             <p className="text-2xl font-bold">Nitin</p>
//             <div className="w-24 h-[1px] bg-[#3E5973]" />

//             <Link to="/dashboard" className="flex items-center gap-3 text-xl text-[#3E5973]">
//               <AiOutlineHome size={24} /> Home
//             </Link>
//             <Link to="/journals" className="text-xl text-[#3E5973]">All Journals</Link>
//             <Link to="/habits" className="text-xl text-[#3E5973]">All Habits</Link>
//             <Link to="/goals" className="text-xl text-[#3E5973]">All Goals</Link>
//           </div>

//           <button
//             onClick={openSettings}
//             className="flex items-center justify-center gap-2 text-[#3E5973] text-xl"
//           >
//             <FiSettings size={24} />
//             Settings
//           </button>
//         </div>
//       </div>

//       {/* Settings Modal */}
//       {showSettings && <SettingsModal onClose={closeSettings} />}
//     </>
//   );
// };

// export default LeftSideBar;





// src/components/LeftSideBar.jsx
import React, { useState } from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { FiSidebar, FiSettings } from 'react-icons/fi';
import { Link } from 'react-router-dom';

// Settings Modal
const SettingsModal = ({ onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20">
    <div className="bg-white rounded-xl p-8 shadow-2xl w-[90%] max-w-xl animate-settingsOpen">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-[#3E5973]">Settings</h2>
        <button onClick={onClose} className="text-3xl text-[#3E5973] hover:text-red-500">
          &times;
        </button>
      </div>
      <p className="text-[#3E5973] text-lg">This is your settings panel.</p>
    </div>
  </div>
);

const LeftSideBar = ({ isOpen, toggleSidebar }) => {
  const [showSettings, setShowSettings] = useState(false);
  const openSettings = () => setShowSettings(true);
  const closeSettings = () => setShowSettings(false);

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[#D0E6F8] z-40 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static`}
      >
        {/* Mobile close button */}
        <div className="lg:hidden absolute top-4 right-4">
          <button onClick={toggleSidebar} className="text-3xl text-[#3E5973]">
            <FiSidebar />
          </button>
        </div>

        {/* Sidebar Content */}
        <div className="flex flex-col justify-between h-full pt-9 pb-6 px-8">
          <div className="flex flex-col space-y-6 items-center">
            <p className="text-2xl font-bold">Nitin</p>
            <div className="w-24 h-[1px] bg-[#3E5973]" />

            <Link to="/dashboard" className="flex items-center gap-3 text-xl text-[#3E5973]">
              <AiOutlineHome size={24} /> Home
            </Link>
            <Link to="/journals" className="text-xl text-[#3E5973]">All Journals</Link>
            <Link to="/habits" className="text-xl text-[#3E5973]">All Habits</Link>
            <Link to="/goals" className="text-xl text-[#3E5973]">All Goals</Link>
          </div>

          <button
            onClick={openSettings}
            className="flex items-center justify-center gap-2 text-[#3E5973] text-xl"
          >
            <FiSettings size={24} />
            Settings
          </button>
        </div>
      </div>

      {/* Settings Modal */}
      {showSettings && <SettingsModal onClose={closeSettings} />}
    </>
  );
};

export default LeftSideBar;
