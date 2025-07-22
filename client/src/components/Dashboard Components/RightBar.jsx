// RightBar.jsx
import {
  FiTrendingUp,
  FiArrowUpRight,
  FiPlus,
  FiSidebar,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import ThemeDropdown from "./ThemeDropDown";
import { VisionBoardCanvas } from "../../pages/VisionBoard";

const QuickLinkCard = ({ to, title, subtitle, leadingIcon: Leading }) => (
  <Link
    to={to}
    className="flex flex-col items-center gap-3 text-[#3E5973] hover:text-[#1e2a35] transition"
  >
    <div className="flex items-center gap-1 text-xl sm:text-2xl font-semibold">
      {Leading && <Leading className="w-5 h-5" />}
      <span>{title}</span>
      <FiArrowUpRight className="w-5 h-5" />
    </div>
    <p className="text-sm opacity-70 text-center max-w-[10rem] leading-snug">
      {subtitle}
    </p>
    <FiPlus className="w-6 h-6 opacity-90" />
  </Link>
);

/* ⬇⬇  → now receives isOpen + toggle from Dashboard */
const RightBar = ({ isOpen, toggle }) => {
  return (
    <aside
      className={` 
        fixed top-0 right-0 h-full z-50
        ${
          isOpen
            ? "w-[20rem] xl:w-[24rem] bg-[#DCEFFF]"
            : "w-[4rem] bg-[#D0E6F8]"
        }
        p-4 flex flex-col gap-6 items-center
        border-l border-transparent hover:border-[#3E5973]
        transition-all duration-300 ease-in-out
      `}
    >
      {/* Top toggle row */}
      <div className="w-full flex justify-between items-center">
        <button
          onClick={toggle}
          className={`text-3xl ${isOpen ? "text-[#3E5973]" : "text-[#3E5973]"}`}
        >
          <FiSidebar />
        </button>

        {isOpen && <ThemeDropdown />}
      </div>

      {/* Vision‑board section */}
      {isOpen && (
        <div className="px-2 flex flex-col items-center gap-3 text-[#3E5973]">
          <Link
            to="/visionboard"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xl sm:text-2xl font-semibold hover:text-[#1e2a35] transition"
          >
            <FiTrendingUp className="w-5 h-5" />
            <span>Vision Board</span>
            <FiArrowUpRight className="w-5 h-5" />
          </Link>

          {/* live preview */}
          <Link
            to="/visionboard"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full px-4"
          >
            <div
              className="relative overflow-hidden rounded-xl border border-[#3E5973] bg-white mx-auto"
              style={{
                width: "100%",
                maxWidth: "290px",
                aspectRatio: "20.5 / 10",
              }}
            >
              <div
                style={{
                  transform: "scale(0.215)",
                  transformOrigin: "top left",
                  width: "1440px",
                  height: "900px",
                  pointerEvents: "none",
                }}
              >
                <VisionBoardCanvas previewMode />
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* quick‑links */}
      {isOpen && (
        <div className="w-full px-2 flex items-center justify-center group gap-8">
          <QuickLinkCard
            to="/habits"
            title="Habits"
            subtitle="Track your habits"
          />
          <div className="h-24 w-[1px] bg-[#3E5973] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300" />
          <QuickLinkCard
            to="/goals"
            title="Goals"
            subtitle="Track your goals"
          />
        </div>
      )}
    </aside>
  );
};

export default RightBar;

// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   FiTrendingUp,
//   FiArrowUpRight,
//   FiPlus,
//   FiSidebar,
// } from "react-icons/fi";
// import ThemeDropdown from "./ThemeDropDown";
// import { VisionBoardCanvas } from "../../pages/VisionBoard";

// const QuickLinkCard = ({ to, title, subtitle, leadingIcon: Leading }) => (
//   <Link
//     to={to}
//     className="flex flex-col items-center gap-3 text-[#3E5973] hover:text-[#1e2a35] transition"
//   >
//     <div className="flex items-center gap-1 text-xl sm:text-2xl font-semibold">
//       {Leading && <Leading className="w-5 h-5" />}
//       <span>{title}</span>
//       <FiArrowUpRight className="w-5 h-5" />
//     </div>
//     <p className="text-sm opacity-70 text-center max-w-[10rem] leading-snug">
//       {subtitle}
//     </p>
//     <FiPlus className="w-6 h-6 opacity-90" />
//   </Link>
// );

// const RightBar = () => {
//   const [isOpen, setIsOpen] = useState(true);

//   return (
//     <aside
//       className={`
//   fixed top-0 right-0 h-full z-50
//   ${isOpen ? "w-[20rem] xl:w-[24rem] bg-[#DCEFFF]" : "w-[4rem] bg-[#D0E6F8]"}
//   p-4 flex flex-col gap-6 items-center
//   border-l border-transparent
//   hover:border-[#3E5973]
//   transition-all duration-300 ease-in-out
// `}
//     >
//       {/* Top Toggle Row */}
//       <div className="w-full flex justify-between items-center">
//         <button
//           className={`text-3xl ${isOpen ? "text-[#3E5973]" : "text-[#3E5973]"}`}
//           onClick={() => setIsOpen(!isOpen)}
//         >
//           <FiSidebar />
//         </button>

//         {isOpen && <ThemeDropdown />}
//       </div>

//       {/* Vision Board Section */}
//       {isOpen && (
//         <div className="px-2 flex flex-col items-center gap-3 text-[#3E5973]">
//           <Link
//             to="/visionboard"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="flex items-center gap-2 text-xl sm:text-2xl font-semibold hover:text-[#1e2a35] transition"
//           >
//             <FiTrendingUp className="w-5 h-5" />
//             <span>Vision Board</span>
//             <FiArrowUpRight className="w-5 h-5" />
//           </Link>

//           <Link
//             to="/visionboard"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="w-full px-4"
//           >
//             <div
//               className="relative overflow-hidden rounded-xl border border-[#3E5973] bg-white mx-auto"
//               style={{
//                 width: "100%",
//                 maxWidth: "290px",
//                 aspectRatio: "20.5 / 10",
//               }}
//             >
//               <div
//                 style={{
//                   transform: "scale(0.215)",
//                   transformOrigin: "top left",
//                   width: "1440px",
//                   height: "900px",
//                   pointerEvents: "none",
//                 }}
//               >
//                 <VisionBoardCanvas previewMode />
//               </div>
//             </div>
//           </Link>
//         </div>
//       )}

//       {/* Quick Links */}
//       {isOpen && (
//         <div className="w-full px-2 flex items-center justify-center group gap-8">
//           <QuickLinkCard
//             to="/habits"
//             title="Habits"
//             subtitle="Track Your Habits"
//           />
//           <div className="h-24 w-[1px] bg-[#3E5973] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300" />
//           <QuickLinkCard
//             to="/goals"
//             title="Goals"
//             subtitle="Track Your Goals"
//           />
//         </div>
//       )}
//     </aside>
//   );
// };

// export default RightBar;

// // src/components/Dashboard Components/RightBar.jsx
// import React from "react";
// import { Link } from "react-router-dom";
// import {
//   FiTrendingUp,
//   FiArrowUpRight,
//   FiPlus,
//   FiSidebar,
// } from "react-icons/fi";
// import ThemeDropdown from "./ThemeDropDown";

// // A little helper so all three “cards” share the same look
// const QuickLinkCard = ({ to, title, subtitle, leadingIcon: Leading }) => (
//   <Link
//     to={to}
//     className="flex flex-col items-center gap-3 text-[#3E5973] hover:text-[#1e2a35] transition"
//   >
//     {/* Heading row */}
//     <div className="flex items-center gap-1 text-xl sm:text-2xl font-semibold">
//       {Leading && <Leading className="w-5 h-5" />}
//       <span>{title}</span>
//       <FiArrowUpRight className="w-5 h-5" />
//     </div>

//     {/* Sub‑caption */}
//     <p className="text-sm opacity-70 text-center max-w-[10rem] leading-snug">
//       {subtitle}
//     </p>

//     {/* Plus icon */}
//     <FiPlus className="w-6 h-6 opacity-90" />
//   </Link>
// );
// const RightBar = () => {
//   return (
//     <aside
//       className="
//         flex flex-col
//         w-full lg:w-80 xl:w-96
//         bg-[#DCEFFF]
//          lg:py-5
//         gap-10
//       "
//     >
//       {/* --- Top strip with sidebar button on left and ThemeDropdown on right --- */}

//       <div className="relative w-full h-25">
//         <button className="absolute left-4 text-3xl text-[#3E5973] cursor-pointer">
//           <FiSidebar />
//         </button>

//         <div className="absolute right-4">
//           <ThemeDropdown />
//         </div>
//       </div>

//       {/* --- Vision Board card --- */}
//       <QuickLinkCard
//         to="/visionboard"
//         title="Vision Board"
//         subtitle="Craft your desired future"
//         leadingIcon={FiTrendingUp}
//       />

//       {/* --- Habits & Goals section --- */}
//       <div className="w-full px-6 flex items-center justify-center group gap-8">
//         <QuickLinkCard
//           to="/habits"
//           title="Habits"
//           subtitle="Track Your Habits"
//         />
//         <div className="h-24 w-[1px] bg-[#3E5973] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300" />
//         <QuickLinkCard to="/goals" title="Goals" subtitle="Track Your Goals" />
//       </div>
//     </aside>
//   );
// };

// // const RightBar = () => {
// //   return (
// //     <aside
// //       className="
// //         flex flex-col items-center
// //         w-full lg:w-80 xl:w-96
// //         bg-[#DCEFFF]
// //         py-6 lg:py-8
// //         gap-10
// //         "
// //     >
// //       <button className="fixed top-5 left-260 text-3xl text-[#3E5973] cursor-pointer">
// //         <FiSidebar />
// //       </button>
// //       {/* --- Top strip (Theme dropdown pill) --- */}
// //       <ThemeDropdown />

// //       {/* --- Vision Board card --- */}
// //       <QuickLinkCard
// //         to="/visionboard"
// //         title="Vision Board"
// //         subtitle="Craft your desired future"
// //         leadingIcon={FiTrendingUp}
// //       />
// //       <div className="h-[1px] w-24 bg-[#3E5973] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300" />
// //       {/* Spacer to push Habits & Goals lower*/}
// //       <div className="h-12" />

// //       {/* --- Habits & Goals (two‑column grid on ≥sm, stacked on xs) --- */}
// //       <div className="w-full px-6 flex items-center justify-center group gap-8">
// //         <QuickLinkCard
// //           to="/habits"
// //           title="Habits"
// //           subtitle="Track Your Habits"
// //         />

// //         {/* Vertical line that appears only on hover */}
// //         <div className="h-24 w-[1px] bg-[#3E5973] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300" />

// //         <QuickLinkCard to="/goals" title="Goals" subtitle="Track Your Goals" />
// //       </div>
// //     </aside>
// //   );
// // };

// export default RightBar;

// src/components/Dashboard Components/RightBar.jsx
// src/components/Dashboard Components/RightBar.jsx

// import React from "react";
// import { Link, Outlet } from "react-router-dom";
// import {
//   FiTrendingUp,
//   FiArrowUpRight,
//   FiPlus,
//   FiSidebar,
// } from "react-icons/fi";
// import ThemeDropdown from "./ThemeDropDown";
// import VisionBoard from "../../pages/VisionBoard"; // Import your VisionBoard component

// // Reusable card component
// const QuickLinkCard = ({ to, title, subtitle, leadingIcon: Leading }) => (
//   <Link
//     to={to}
//     className="flex flex-col items-center gap-3 text-[#3E5973] hover:text-[#1e2a35] transition"
//   >
//     {/* Heading row */}
//     <div className="flex items-center gap-1 text-xl sm:text-2xl font-semibold">
//       {Leading && <Leading className="w-5 h-5" />}
//       <span>{title}</span>
//       <FiArrowUpRight className="w-5 h-5" />
//     </div>

//     {/* Sub-caption */}
//     <p className="text-sm opacity-70 text-center max-w-[10rem] leading-snug">
//       {subtitle}
//     </p>

//     {/* Plus icon */}
//     <FiPlus className="w-6 h-6 opacity-90" />
//   </Link>
// );

// const RightBar = () => {
//   return (
//     <aside
//       className="
//         flex flex-col
//         w-full lg:w-80 xl:w-96
//         bg-[#DCEFFF]
//         lg:py-5
//         gap-10
//       "
//     >
//       {/* --- Top strip with sidebar button on left and ThemeDropdown on right --- */}
//       <div className="relative w-full h-25">
//         <button className="absolute left-4 text-3xl text-[#3E5973] cursor-pointer">
//           <FiSidebar />
//         </button>

//         <div className="absolute right-4">
//           <ThemeDropdown />
//         </div>
//       </div>

//       {/* --- Vision Board section --- */}
//       <div className="px-6 flex flex-col items-center gap-3 text-[#3E5973]">
//         <div className="flex items-center gap-2 text-xl sm:text-2xl font-semibold">
//           <FiTrendingUp className="w-5 h-5" />
//           <span>Vision Board</span>
//           <FiArrowUpRight className="w-5 h-5" />
//         </div>
//         <p className="text-sm opacity-70 text-center max-w-[12rem] leading-snug">
//           Craft your desired future
//         </p>

//         {/* Embedded route output (your file's UI) */}
//         <div className="w-full mt-2 rounded-xl border-2 border-[#3E5973] overflow-hidden">
//           <VisionBoard />
//         </div>
//       </div>

//       {/* --- Habits & Goals section --- */}
//       <div className="w-full px-6 flex items-center justify-center group gap-8">
//         <QuickLinkCard
//           to="/habits"
//           title="Habits"
//           subtitle="Track Your Habits"
//         />
//         <div className="h-24 w-[1px] bg-[#3E5973] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300" />
//         <QuickLinkCard to="/goals" title="Goals" subtitle="Track Your Goals" />
//       </div>
//     </aside>
//   );
// };

// export default RightBar;

// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   FiTrendingUp,
//   FiArrowUpRight,
//   FiPlus,
//   FiSidebar,
// } from "react-icons/fi";
// import ThemeDropdown from "./ThemeDropDown";
// import { VisionBoardCanvas } from "../../pages/VisionBoard";

// const QuickLinkCard = ({ to, title, subtitle, leadingIcon: Leading }) => (
//   <Link
//     to={to}
//     className="flex flex-col items-center gap-3 text-[#3E5973] hover:text-[#1e2a35] transition"
//   >
//     <div className="flex items-center gap-1 text-xl sm:text-2xl font-semibold">
//       {Leading && <Leading className="w-5 h-5" />}
//       <span>{title}</span>
//       <FiArrowUpRight className="w-5 h-5" />
//     </div>
//     <p className="text-sm opacity-70 text-center max-w-[10rem] leading-snug">
//       {subtitle}
//     </p>
//     <FiPlus className="w-6 h-6 opacity-90" />
//   </Link>
// );

// const RightBar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   if (!isOpen) {
//     return (
//       <div className="fixed top-4 right-4 z-50">
//         <button
//           className="text-3xl text-[#3E5973] bg-white shadow-lg rounded-full p-2"
//           onClick={() => setIsOpen(true)}
//         >
//           <FiSidebar />
//         </button>
//       </div>
//     );
//   }

//   return (
//     <aside
//       className="
//         fixed top-0 right-0 h-full z-50
//         w-full sm:w-[20rem] xl:w-[24rem]
//         bg-[#DCEFFF]
//         p-5 flex flex-col gap-10
//         shadow-lg transition-all duration-500
//       "
//     >
//       <div className="flex justify-end">
//         <button
//           className="text-3xl text-[#3E5973]"
//           onClick={() => setIsOpen(false)}
//         >
//           ✕
//         </button>
//       </div>

//       <div className="flex justify-end">
//         <ThemeDropdown />
//       </div>

//       <div className="px-2 flex flex-col items-center gap-3 text-[#3E5973]">
//         <Link
//           to="/visionboard"
//           className="flex items-center gap-2 text-xl sm:text-2xl font-semibold hover:text-[#1e2a35] transition"
//         >
//           <FiTrendingUp className="w-5 h-5" />
//           <span>Vision Board</span>
//           <FiArrowUpRight className="w-5 h-5" />
//         </Link>
//         <p className="text-sm opacity-70 text-center max-w-[12rem] leading-snug">
//           Craft your desired future
//         </p>

//         {/* Responsive Mini Preview */}

// {/* Vision Board Preview */}
// <Link to="/visionboard" className="w-full  px-4">
//   <div
//     className="relative overflow-hidden rounded-xl border border-[#3E5973] bg-white mx-auto"
//     style={{
//       width: "100%",
//       maxWidth: "290px",       // limits width on large screens
//       aspectRatio: "20.5 / 10",   // maintains same shape as full canvas
//     }}
//   >
//     <div
//       style={{
//         transform: "scale(0.215)",     // ✅ tweak scale to match your original canvas
//         transformOrigin: "top left",
//         width: "1440px",             // match your original canvas width
//         height: "900px",             // match original height
//         pointerEvents: "none",       // ensures clicks don’t affect inner elements
//       }}
//     >
//       <VisionBoardCanvas />
//     </div>
//   </div>
// </Link>

//       </div>

//       <div className="w-full px-2 flex items-center justify-center group gap-8">
//         <QuickLinkCard
//           to="/habits"
//           title="Habits"
//           subtitle="Track Your Habits"
//         />
//         <div className="h-24 w-[1px] bg-[#3E5973] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300" />
//         <QuickLinkCard to="/goals" title="Goals" subtitle="Track Your Goals" />
//       </div>
//     </aside>
//   );
// };

// export default RightBar;
