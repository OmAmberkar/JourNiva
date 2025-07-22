// src/components/Dashboard Components/RightBar.jsx
import React from "react";
import { Link } from "react-router-dom";
import {
  FiTrendingUp,
  FiArrowUpRight,
  FiPlus,
  FiSidebar,
} from "react-icons/fi";
import ThemeDropdown from "./ThemeDropDown";

// A little helper so all three “cards” share the same look
const QuickLinkCard = ({ to, title, subtitle, leadingIcon: Leading }) => (
  <Link
    to={to}
    className="flex flex-col items-center gap-3 text-[#3E5973] hover:text-[#1e2a35] transition"
  >
    {/* Heading row */}
    <div className="flex items-center gap-1 text-xl sm:text-2xl font-semibold">
      {Leading && <Leading className="w-5 h-5" />}
      <span>{title}</span>
      <FiArrowUpRight className="w-5 h-5" />
    </div>

    {/* Sub‑caption */}
    <p className="text-sm opacity-70 text-center max-w-[10rem] leading-snug">
      {subtitle}
    </p>

    {/* Plus icon */}
    <FiPlus className="w-6 h-6 opacity-90" />
  </Link>
);
const RightBar = () => {
  return (
    <aside
      className="
        flex flex-col
        w-full lg:w-80 xl:w-96
        bg-[#DCEFFF]
        py-6 lg:py-8
        gap-10
      "
    >
      {/* --- Top strip with sidebar button on left and ThemeDropdown on right --- */}

      <div className="relative w-full h-25">
        <button className="absolute left-4 text-3xl text-[#3E5973] cursor-pointer">
          <FiSidebar />
        </button>

        <div className="absolute right-4">
          <ThemeDropdown />
        </div>
      </div>

      {/* --- Vision Board card --- */}
      <QuickLinkCard
        to="/visionboard"
        title="Vision Board"
        subtitle="Craft your desired future"
        leadingIcon={FiTrendingUp}
      />

      {/* Spacer to push Habits & Goals lower*/}
      <div className="h-20" />

      {/* --- Habits & Goals section --- */}
      <div className="w-full px-6 flex items-center justify-center group gap-8">
        <QuickLinkCard
          to="/habits"
          title="Habits"
          subtitle="Track Your Habits"
        />
        <div className="h-24 w-[1px] bg-[#3E5973] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300" />
        <QuickLinkCard to="/goals" title="Goals" subtitle="Track Your Goals" />
      </div>
    </aside>
  );
};

// const RightBar = () => {
//   return (
//     <aside
//       className="
//         flex flex-col items-center
//         w-full lg:w-80 xl:w-96
//         bg-[#DCEFFF]
//         py-6 lg:py-8
//         gap-10
//         "
//     >
//       <button className="fixed top-5 left-260 text-3xl text-[#3E5973] cursor-pointer">
//         <FiSidebar />
//       </button>
//       {/* --- Top strip (Theme dropdown pill) --- */}
//       <ThemeDropdown />

//       {/* --- Vision Board card --- */}
//       <QuickLinkCard
//         to="/visionboard"
//         title="Vision Board"
//         subtitle="Craft your desired future"
//         leadingIcon={FiTrendingUp}
//       />
//       <div className="h-[1px] w-24 bg-[#3E5973] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300" />
//       {/* Spacer to push Habits & Goals lower*/}
//       <div className="h-12" />

//       {/* --- Habits & Goals (two‑column grid on ≥sm, stacked on xs) --- */}
//       <div className="w-full px-6 flex items-center justify-center group gap-8">
//         <QuickLinkCard
//           to="/habits"
//           title="Habits"
//           subtitle="Track Your Habits"
//         />

//         {/* Vertical line that appears only on hover */}
//         <div className="h-24 w-[1px] bg-[#3E5973] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300" />

//         <QuickLinkCard to="/goals" title="Goals" subtitle="Track Your Goals" />
//       </div>
//     </aside>
//   );
// };

export default RightBar;
