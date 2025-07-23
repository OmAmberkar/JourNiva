// src/pages/VisionBoard.jsx
import React from "react";
import {
  FiArrowLeft,
  FiBookmark,
  FiImage,
  FiPlus,
  FiType,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { useState } from "react";

// ✅ This is the canvas-only previewable component
// ✅ This is the canvas-only previewable component
export const VisionBoardCanvas = ({ previewMode = false }) => {
  const [hasContent, setHasContent] = useState(false);
  return (
    <div className="flex w-full max-w-[1440px] h-[83vh] md:h-[700px] lg:h-[800px] xl:h-[900px] border border-[#aacbe1] rounded-md bg-[#DCEEFF] p-4 overflow-hidden items-center justify-center">
      {!hasContent && (
        <div className="flex flex-col items-center justify-center gap-2 opacity-30 transition-opacity duration-300 text-center">
          <FiPlus className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl" />
        </div>
      )}

      {/* Your content logic goes here */}
      {/* Example: if user adds a block, call setHasContent(true) */}
    </div>
  );
};

const VisionBoard = () => {
  return (
    <div className="min-h-screen bg-[#DCEEFF] p-6 font-Livvic text-[#3E5973]">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3 text-lg sm:text-xl font-semibold">
          <Link
            to="/dashboard"
            className="text-[#3E5973] hover:text-[#1e2a35] transition"
          >
            <FiArrowLeft className="text-2xl" />
          </Link>
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
