import React, { useState } from "react";
import { FiArrowLeft, FiBookmark, FiImage, FiType } from "react-icons/fi";
import { Link } from "react-router-dom";
import VisionBoardCanvas from "../components/VisionBoard Components/VisionBoardCanvas";
import AddTextModal from "../components/VisionBoard Components/AddTextModal";
import AddImageModal from "../components/VisionBoard Components/AddImageModal";

const VisionBoard = () => {
  const [showTextModal, setShowTextModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [elements, setElements] = useState([]);

  const handleAddElement = (element) =>
    setElements((prev) => [...prev, element]);
  const handleRemoveElement = (id) =>
    setElements((prev) => prev.filter((el) => el.id !== id));

  return (
    <div className="min-h-screen bg-[#DCEEFF] p-6 font-Livvic text-[#3E5973]">
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
          <button
            onClick={() => setShowTextModal(true)}
            className="flex items-center gap-1 px-4 py-2 rounded-xl shadow-md bg-[#DCEEFF] hover:shadow-lg transition"
          >
            Add Text <FiType />
          </button>
          <button
            onClick={() => setShowImageModal(true)}
            className="flex items-center gap-1 px-4 py-2 rounded-xl shadow-md bg-[#DCEEFF] hover:shadow-lg transition"
          >
            Add Images <FiImage />
          </button>
          <button className="flex items-center gap-1 px-4 py-2 rounded-xl shadow-md bg-[#DCEEFF] hover:shadow-lg transition">
            Save <FiBookmark />
          </button>
        </div>
      </div>

      {/* Canvas with blur when modal is open */}
      <div
        className={`${
          showTextModal || showImageModal ? "blur-sm" : ""
        } transition duration-300`}
      >
        <VisionBoardCanvas
          elements={elements}
          onRemove={handleRemoveElement}
          setElements={setElements}
        />
      </div>

      {showTextModal && (
        <AddTextModal
          onClose={() => setShowTextModal(false)}
          onAdd={handleAddElement}
        />
      )}
      {showImageModal && (
        <AddImageModal
          onClose={() => setShowImageModal(false)}
          onAdd={handleAddElement}
        />
      )}
    </div>
  );
};

export default VisionBoard;
