import React from "react";
import { FiArrowLeft, FiBookmark, FiImage, FiType } from "react-icons/fi";

const VisionBoard = () => {
  return (
    <div className="min-h-screen bg-[#DCEEFF] p-6 font-Livvic text-[#3E5973]">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-6">
        {/* Left: Back + Title */}
        <div className="flex items-center gap-3 text-lg sm:text-xl font-semibold">
          <FiArrowLeft className="text-2xl" />
          Craft the Life You Desire
        </div>

        {/* Right: Buttons */}
        <div className="flex gap-3">
          <button className="flex items-center gap-1 px-4 py-2 rounded-xl shadow-md bg-[#DCEEFF] hover:shadow-lg transition">
            Add Text <FiType />
          </button>
          <button className="flex items-center gap-1 px-4 py-2 rounded-xl shadow-md bg-[#DCEEFF] hover:shadow-lg transition">
            Add Images <FiImage />
          </button>
          <button className="flex items-center gap-1 px-4 py-2 rounded-xl shadow-md bg-[#DCEEFF] hover:shadow-lg transition">
            Save <FiBookmark />
          </button>
        </div>
      </div>

      {/* Vision Board Canvas */}
      <div className="w-full h-[85vh] border border-[#aacbe1] rounded-md bg-[#DCEEFF] shadow-inner p-4">
        {/* Canvas content will go here */}
      </div>
    </div>
  );
};

export default VisionBoard;
