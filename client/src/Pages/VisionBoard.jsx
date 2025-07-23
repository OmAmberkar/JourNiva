// src/pages/VisionBoard.jsx
import React from "react";
import { FiArrowLeft, FiBookmark, FiImage, FiType } from "react-icons/fi";

// ✅ This is the canvas-only previewable component
// ✅ This is the canvas-only previewable component
export const VisionBoardCanvas = () => {
  return (
    <div className="w-full h-screen max-h-[100vh] border border-[#aacbe1] rounded-md bg-[#DCEEFF] p-4 overflow-hidden">
      {/* Canvas content will go here */}
      <h1>
        MEOW MEOW MEOW MEOW MEOW MEOW MEOW MEOW MEOW MEOW MEOW MEOW MEOW MEOW
        MEOW MEOW MEOW MEOW MEOW MEOW MEOW MEOW MEOW MEOW meo
        <br /> MEOW
        <br /> MEOW
        <br /> MEOW
        <br /> MEOW
        <br /> MEOW
        <br /> MEOW
        <br /> MEOW
        <br /> MEOW
        <br /> MEOW
        <br /> MEOW
        <br /> MEOW
        <br /> MEOW
        <br /> MEOW
        <br /> MEOW
        <br /> MEOW
        <br /> MEOW
        <br /> MEOW
        <br /> MEOW
        <br /> MEOW
        <br /> MEOW
        <br /> MEOW
        <br /> MEOW
        <br /> MEOW
        <br /> MEOW
        <br /> MEOW
        <br /> MEOW <br /> MEOW <br /> meow
      </h1>
    </div>
  );
};

const VisionBoard = () => {
  return (
    <div className="min-h-screen bg-[#DCEEFF] p-6 font-Livvic text-[#3E5973]">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3 text-lg sm:text-xl font-semibold">
          <FiArrowLeft className="text-2xl" />
          Craft the Life You Desire
        </div>

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

      {/* Canvas Section */}
      <VisionBoardCanvas />
    </div>
  );
};

export default VisionBoard;
