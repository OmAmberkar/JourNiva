//   // src/pages/VisionBoard.jsx
// import React, { useState, useRef } from "react";
// import {
//   FiArrowLeft,
//   FiBookmark,
//   FiImage,
//   FiPlus,
//   FiType,
//   FiX,
// } from "react-icons/fi";
// import { Link } from "react-router-dom";
// import axios from "axios";

// // ✅ Canvas where users drop images/text
// export const VisionBoardCanvas = ({ elements, setElements }) => {
//   const canvasRef = useRef(null);

//   const handleDragOver = (e) => {
//     e.preventDefault();
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     const imageUrl = e.dataTransfer.getData("imageUrl");
//     const x = e.clientX - canvasRef.current.getBoundingClientRect().left;
//     const y = e.clientY - canvasRef.current.getBoundingClientRect().top;

//     if (imageUrl) {
//       setElements((prev) => [...prev, { type: "image", src: imageUrl, x, y }]);
//     }
//   };

//   return (
//     <div
//       ref={canvasRef}
//       className="relative flex w-full max-w-[1440px] h-[83vh] md:h-[700px] lg:h-[800px] xl:h-[900px] border border-[#aacbe1] rounded-md bg-[#DCEEFF] p-4 overflow-hidden items-center justify-center"
//       onDragOver={handleDragOver}
//       onDrop={handleDrop}
//     >
//       {elements.map((el, idx) => {
//         if (el.type === "image") {
//           return (
//             <img
//               key={idx}
//               src={el.src}
//               alt="user-img"
//               className="absolute w-32 h-32 object-cover cursor-move"
//               style={{ top: el.y, left: el.x }}
//             />
//           );
//         }
//         return null;
//       })}

//       {elements.length === 0 && (
//         <div className="flex flex-col items-center justify-center gap-2 opacity-30 transition-opacity duration-300 text-center">
//           <FiPlus className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl" />
//           <p className="text-sm">Drag images or add something!</p>
//         </div>
//       )}
//     </div>
//   );
// };

// const VisionBoard = () => {
//   const [elements, setElements] = useState([]);
//   const [imageResults, setImageResults] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");

//   const fetchImages = async () => {
//     try {
//       const res = await axios.get("https://api.unsplash.com/search/photos", {
//         params: { query: searchTerm, per_page: 12 },
//         headers: {
//           Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`,
//         },
//       });
//       setImageResults(res.data.results);
//     } catch (err) {
//       console.error("Unsplash error:", err);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#DCEEFF] p-6 font-Livvic text-[#3E5973]">
//       {/* Top Bar */}
//       <div className="flex flex-col lg:flex-row justify-between items-center mb-6 gap-4">
//         <div className="flex items-center gap-3 text-lg sm:text-xl font-semibold">
//           <Link to="/dashboard" className="text-[#3E5973] hover:text-[#1e2a35] transition">
//             <FiArrowLeft className="text-2xl" />
//           </Link>
//           Craft the Life You Desire
//         </div>

//         <div className="flex gap-3 flex-wrap justify-center">
//           <button className="flex items-center gap-1 px-4 py-2 rounded-xl shadow-md bg-[#DCEEFF] hover:shadow-lg transition">
//             Add Text <FiType />
//           </button>
//           <button
//             onClick={fetchImages}
//             className="flex items-center gap-1 px-4 py-2 rounded-xl shadow-md bg-[#DCEEFF] hover:shadow-lg transition"
//           >
//             Add Images <FiImage />
//           </button>
//           <button className="flex items-center gap-1 px-4 py-2 rounded-xl shadow-md bg-[#DCEEFF] hover:shadow-lg transition">
//             Save <FiBookmark />
//           </button>
//         </div>
//       </div>

//       {/* Image Gallery */}
//       {imageResults.length > 0 && (
//         <div className="mb-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//           {imageResults.map((img) => (
//             <img
//               key={img.id}
//               src={img.urls.small}
//               alt={img.alt_description}
//               draggable
//               onDragStart={(e) => e.dataTransfer.setData("imageUrl", img.urls.small)}
//               className="w-full h-40 object-cover rounded-md shadow hover:scale-105 transition"
//             />
//           ))}
//         </div>
//       )}

//       {/* Canvas Section */}
//       <VisionBoardCanvas elements={elements} setElements={setElements} />
//     </div>
//   );
// };

// export default VisionBoard;
  
  
  
  
  
  
  
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
