import React, { useState } from "react";
import {
  FiArrowLeft,
  FiBookmark,
  FiImage,
  FiType,
  FiCheck,
  FiPlus,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { Rnd } from "react-rnd";
import axios from "axios";

// ---- Text Modal ----
const AddTextModal = ({ onClose, onAdd }) => {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if (input.trim()) {
      onAdd({ id: Date.now(), type: "text", content: input.trim() });
      setInput("");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20">
      <div className="bg-[#DCEFFF] relative rounded-xl p-6 shadow-xl w-[90%] max-w-sm animate-settingsOpen">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-3xl text-[#3E5973] hover:text-red-500"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold text-[#3E5973] mb-4">Add Text</h2>
        <input
          type="text"
          maxLength={20}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text"
          className="w-full p-3 rounded-md text-[#3E5973] bg-white border border-[#3E5973] outline-none text-lg"
        />
        <div className="flex justify-end mt-4">
          <button
            onClick={handleSubmit}
            className="text-4xl text-[#3E5973] hover:text-green-600"
          >
            <FiCheck />
          </button>
        </div>
      </div>
    </div>
  );
};

// ---- Image Modal ----
const AddImageModal = ({ onClose, onAdd }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const searchImages = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/unsplash-search", {
        params: { query },
      });
      setResults(res.data.results);
    } catch (err) {
      console.error("Unsplash API Error:", err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20">
      <div className="bg-[#DCEFFF] relative rounded-xl p-6 shadow-xl w-[90%] max-w-2xl animate-settingsOpen">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-3xl text-[#3E5973] hover:text-red-500"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold text-[#3E5973] mb-4">Search Image</h2>
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search image"
            className="w-full p-3 rounded-md text-[#3E5973] bg-white border border-[#3E5973] outline-none text-base"
          />
          <button
            onClick={searchImages}
            className="bg-[#3E5973] text-white px-4 py-2 rounded-md"
          >
            Search
          </button>
        </div>
        <div className="grid grid-cols-3 gap-3 mt-4 max-h-[300px] overflow-y-auto">
          {results.map((img) => (
            <img
              key={img.id}
              src={img.urls.thumb}
              alt={img.alt_description}
              onClick={() => {
                onAdd({ id: Date.now(), type: "image", url: img.urls.small });
                onClose();
              }}
              className="cursor-pointer hover:scale-105 transition rounded-lg"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// ---- Vision Board Canvas ----
export const VisionBoardCanvas = ({
  elements = [],
  onRemove,
  previewMode = false,
}) => {
  return (
    <div className="relative w-full max-w-[1440px] h-[83vh] md:h-[700px] lg:h-[800px] xl:h-[900px] border border-[#aacbe1] rounded-md bg-[#DCEEFF] p-4 overflow-hidden">
      {/* FiPlus icon when empty */}
      {elements.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <FiPlus className="text-6xl text-[#3E5973] opacity-20" />
        </div>
      )}

      {elements.map((el, index) => (
        <Rnd
          key={el.id}
          default={{
            x: 100 + index * 10,
            y: 100 + index * 10,
            width: el.type === "text" ? 200 : 220,
            height: el.type === "text" ? 60 : 160,
          }}
          bounds="parent"
          disableDragging={previewMode}
          enableResizing={!previewMode}
          className="group z-[50]"
        >
          {el.type === "text" ? (
            <div className="relative w-full h-full bg-white rounded-md border border-[#3E5973] p-2 flex items-center justify-center text-[#3E5973] font-bold text-xl sm:text-2xl text-center">
              {el.content}
              {!previewMode && (
                <button
                  onClick={() => onRemove(el.id)}
                  className="absolute -top-4 -right-4 bg-red-500 text-white rounded-full w-6 h-6 text-sm hidden group-hover:flex items-center justify-center z-10"
                >
                  ×
                </button>
              )}
            </div>
          ) : (
            <div className="relative w-full h-full">
              <img
                src={el.url}
                alt="vision-img"
                className="w-full h-full object-cover rounded-md pointer-events-none"
              />
              {!previewMode && (
                <button
                  onClick={() => onRemove(el.id)}
                  className="absolute -top-4 -right-4 bg-red-500 text-white rounded-full w-6 h-6 text-sm hidden group-hover:flex items-center justify-center z-10"
                >
                  ×
                </button>
              )}
            </div>
          )}
        </Rnd>
      ))}
    </div>
  );
};

// ---- Main VisionBoard Page ----
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

      {/* Canvas */}
      <VisionBoardCanvas elements={elements} onRemove={handleRemoveElement} />

      {/* Modals */}
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

// import React, { useState } from "react";
// import { FiArrowLeft, FiBookmark, FiImage, FiType, FiCheck } from "react-icons/fi";
// import { Link } from "react-router-dom";
// import { Rnd } from "react-rnd";
// import axios from "axios";

// // ---- Text Modal ----
// const AddTextModal = ({ onClose, onAdd }) => {
//   const [input, setInput] = useState("");

//   const handleSubmit = () => {
//     if (input.trim()) {
//       onAdd({ id: Date.now(), text: input.trim() });
//       setInput("");
//       onClose();
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20">
//       <div className="bg-[#DCEFFF] relative rounded-xl p-6 shadow-xl w-[90%] max-w-sm animate-settingsOpen">
//         <button onClick={onClose} className="absolute top-3 right-4 text-3xl text-[#3E5973] hover:text-red-500">×</button>
//         <h2 className="text-2xl font-bold text-[#3E5973] mb-4">Add Text</h2>
//         <input
//           type="text"
//           maxLength={20}
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Enter text"
//           className="w-full p-3 rounded-md text-[#3E5973] bg-white border border-[#3E5973] outline-none text-base"
//         />
//         <div className="flex justify-end mt-4">
//           <button onClick={handleSubmit} className="text-4xl text-[#3E5973] hover:text-green-600">
//             <FiCheck />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ---- Image Modal ----
// const AddImageModal = ({ onClose, onAdd }) => {
//   const [query, setQuery] = useState("");
//   const [results, setResults] = useState([]);

//   const searchImages = async () => {
//     try {
//       const res = await axios.get("http://localhost:4000/api/unsplash-search", {
//         params: { query },
//       });
//       setResults(res.data.results);
//     } catch (err) {
//       console.error("Unsplash API Error:", err);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20">
//       <div className="bg-[#DCEFFF] relative rounded-xl p-6 shadow-xl w-[90%] max-w-2xl animate-settingsOpen">
//         <button onClick={onClose} className="absolute top-3 right-4 text-3xl text-[#3E5973] hover:text-red-500">×</button>
//         <h2 className="text-2xl font-bold text-[#3E5973] mb-4">Search Image</h2>
//         <div className="flex gap-2">
//           <input
//             type="text"
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             placeholder="Search image"
//             className="w-full p-3 rounded-md text-[#3E5973] bg-white border border-[#3E5973] outline-none text-base"
//           />
//           <button onClick={searchImages} className="bg-[#3E5973] text-white px-4 py-2 rounded-md">Search</button>
//         </div>
//         <div className="grid grid-cols-3 gap-3 mt-4 max-h-[300px] overflow-y-auto">
//           {results.map((img) => (
//             <img
//               key={img.id}
//               src={img.urls.thumb}
//               alt={img.alt_description}
//               onClick={() => {
//                 onAdd({ id: Date.now(), url: img.urls.small });
//                 onClose();
//               }}
//               className="cursor-pointer hover:scale-105 transition rounded-lg"
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// // ---- Canvas ----
// export const VisionBoardCanvas = ({
//   texts = [],
//   onRemoveText,
//   images = [],
//   onRemoveImage,
//   previewMode = false,
// }) => {
//   return (
//     <div className="relative w-full max-w-[1440px] h-[83vh] md:h-[700px] lg:h-[800px] xl:h-[900px] border border-[#aacbe1] rounded-md bg-[#DCEEFF] p-4 overflow-hidden">

//       {/* Text Elements */}
//       {texts.map((item) => (
//         <Rnd
//           key={item.id}
//           default={{ x: 100, y: 100, width: 200, height: 60 }}
//           bounds="parent"
//           disableDragging={previewMode}
//           enableResizing={!previewMode}
//           className="group"
//         >
//           <div className="relative w-full h-full bg-white rounded-md border border-[#3E5973] p-2 flex items-center justify-center text-[#3E5973] font-semibold text-xl sm:text-2xl text-center">
//             {item.text}
//             {!previewMode && (
//               <button
//                 onClick={() => onRemoveText(item.id)}
//                 className="absolute -top-4 -right-4 bg-red-500 text-white rounded-full w-6 h-6 text-sm hidden group-hover:flex items-center justify-center z-10"
//               >
//                 ×
//               </button>
//             )}
//           </div>
//         </Rnd>
//       ))}

//       {/* Image Elements */}
//       {images.map((img) => (
//         <Rnd
//           key={img.id}
//           default={{ x: 150, y: 150, width: 200, height: 150 }}
//           bounds="parent"
//           disableDragging={previewMode}
//           enableResizing={!previewMode}
//           dragHandleClassName="drag-area"
//           className="group"
//         >
//           <div className="relative w-full h-full drag-area cursor-move">
//             <img
//               src={img.url}
//               alt="canvas-img"
//               className="w-full h-full object-cover rounded-md pointer-events-none"
//             />
//             {!previewMode && (
//               <button
//                 onClick={() => onRemoveImage(img.id)}
//                 className="absolute -top-4 -right-4 bg-red-500 text-white rounded-full w-6 h-6 text-sm hidden group-hover:flex items-center justify-center z-10"
//               >
//                 ×
//               </button>
//             )}
//           </div>
//         </Rnd>
//       ))}

//     </div>
//   );
// };

// // ---- Main Page ----
// const VisionBoard = () => {
//   const [showTextModal, setShowTextModal] = useState(false);
//   const [showImageModal, setShowImageModal] = useState(false);
//   const [texts, setTexts] = useState([]);
//   const [images, setImages] = useState([]);

//   const handleAddText = (textItem) => setTexts((prev) => [...prev, textItem]);
//   const handleAddImage = (imgItem) => setImages((prev) => [...prev, imgItem]);
//   const handleRemoveText = (id) => setTexts((prev) => prev.filter((t) => t.id !== id));
//   const handleRemoveImage = (id) => setImages((prev) => prev.filter((i) => i.id !== id));

//   return (
//     <div className="min-h-screen bg-[#DCEEFF] p-6 font-Livvic text-[#3E5973]">
//       {/* Top Bar */}
//       <div className="flex justify-between items-center mb-6">
//         <div className="flex items-center gap-3 text-lg sm:text-xl font-semibold">
//           <Link to="/dashboard" className="text-[#3E5973] hover:text-[#1e2a35] transition">
//             <FiArrowLeft className="text-2xl" />
//           </Link>
//           Craft the Life You Desire
//         </div>

//         <div className="flex gap-3">
//           <button onClick={() => setShowTextModal(true)} className="flex items-center gap-1 px-4 py-2 rounded-xl shadow-md bg-[#DCEEFF] hover:shadow-lg transition">
//             Add Text <FiType />
//           </button>
//           <button onClick={() => setShowImageModal(true)} className="flex items-center gap-1 px-4 py-2 rounded-xl shadow-md bg-[#DCEEFF] hover:shadow-lg transition">
//             Add Images <FiImage />
//           </button>
//           <button className="flex items-center gap-1 px-4 py-2 rounded-xl shadow-md bg-[#DCEEFF] hover:shadow-lg transition">
//             Save <FiBookmark />
//           </button>
//         </div>
//       </div>

//       {/* Canvas */}
//       <VisionBoardCanvas
//         texts={texts}
//         images={images}
//         onRemoveText={handleRemoveText}
//         onRemoveImage={handleRemoveImage}
//       />

//       {/* Modals */}
//       {showTextModal && <AddTextModal onClose={() => setShowTextModal(false)} onAdd={handleAddText} />}
//       {showImageModal && <AddImageModal onClose={() => setShowImageModal(false)} onAdd={handleAddImage} />}
//     </div>
//   );
// };

// export default VisionBoard;

// import React, { useState } from "react";
// import { FiArrowLeft, FiBookmark, FiImage, FiType, FiCheck } from "react-icons/fi";
// import { Link } from "react-router-dom";
// import { Rnd } from "react-rnd";
// import axios from "axios";

// // ---- Text Modal ----
// const AddTextModal = ({ onClose, onAdd }) => {
//   const [input, setInput] = useState("");

//   const handleSubmit = () => {
//     if (input.trim().length > 0) {
//       onAdd({ id: Date.now(), text: input.trim() });
//       setInput("");
//       onClose();
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20">
//       <div className="bg-[#DCEFFF] relative rounded-xl p-6 shadow-xl w-[90%] max-w-sm animate-settingsOpen">
//         <button
//           onClick={onClose}
//           className="absolute top-3 right-4 text-3xl text-[#3E5973] hover:text-red-500"
//         >
//           ×
//         </button>
//         <h2 className="text-2xl font-bold text-[#3E5973] mb-4">Add Text</h2>
//         <input
//           type="text"
//           maxLength={20}
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Enter text"
//           className="w-full p-3 rounded-md text-[#3E5973] bg-white border border-[#3E5973] outline-none text-base"
//         />
//         <div className="flex justify-end mt-4">
//           <button
//             onClick={handleSubmit}
//             className="text-4xl text-[#3E5973] hover:text-green-600"
//           >
//             <FiCheck />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ---- Image Modal ----
// const AddImageModal = ({ onClose, onAdd }) => {
//   const [query, setQuery] = useState("");
//   const [results, setResults] = useState([]);

//   const searchImages = async () => {
//     try {
//       const res = await axios.get("http://localhost:4000/api/unsplash-search", {
//         params: { query },
//       });
//       setResults(res.data.results);
//     } catch (err) {
//       console.error("Unsplash API Error:", err);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20">
//       <div className="bg-[#DCEFFF] relative rounded-xl p-6 shadow-xl w-[90%] max-w-2xl animate-settingsOpen">
//         <button
//           onClick={onClose}
//           className="absolute top-3 right-4 text-3xl text-[#3E5973] hover:text-red-500"
//         >
//           ×
//         </button>
//         <h2 className="text-2xl font-bold text-[#3E5973] mb-4">Search Image</h2>
//         <div className="flex gap-2">
//           <input
//             type="text"
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             placeholder="Search image"
//             className="w-full p-3 rounded-md text-[#3E5973] bg-white border border-[#3E5973] outline-none text-base"
//           />
//           <button
//             onClick={searchImages}
//             className="bg-[#3E5973] text-white px-4 py-2 rounded-md"
//           >
//             Search
//           </button>
//         </div>
//         <div className="grid grid-cols-3 gap-3 mt-4 max-h-[300px] overflow-y-auto">
//           {results.map((img) => (
//             <img
//               key={img.id}
//               src={img.urls.thumb}
//               alt={img.alt_description}
//               onClick={() => {
//                 onAdd({ id: Date.now(), url: img.urls.small });
//                 onClose();
//               }}
//               className="cursor-pointer hover:scale-105 transition rounded-lg"
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// // ---- Canvas ----
// export const VisionBoardCanvas = ({ texts, onRemoveText, images, onRemoveImage }) => {
//   return (
//     <div className="relative w-full max-w-[1440px] h-[83vh] md:h-[700px] lg:h-[800px] xl:h-[900px] border border-[#aacbe1] rounded-md bg-[#DCEEFF] p-4 overflow-hidden">
//       {texts.map((item) => (
//         <Rnd key={item.id} default={{ x: 100, y: 100, width: 150, height: 50 }} bounds="parent" className="group">
//           <div className="relative w-full h-full bg-white rounded-md border border-[#3E5973] p-2 flex items-center justify-center text-[#3E5973] font-semibold text-center">
//             {item.text}
//             <button
//               onClick={() => onRemoveText(item.id)}
//               className="absolute -top-4 -right-4 bg-red-500 text-white rounded-full w-6 h-6 text-sm hidden group-hover:flex items-center justify-center z-10"
//             >
//               ×
//             </button>
//           </div>
//         </Rnd>
//       ))}
//       {images.map((img) => (
//         <Rnd key={img.id} default={{ x: 150, y: 150, width: 200, height: 150 }} bounds="parent" className="group">
//           <div className="relative w-full h-full">
//             <img src={img.url} alt="canvas-img" className="w-full h-full object-cover rounded-md" />
//             <button
//               onClick={() => onRemoveImage(img.id)}
//               className="absolute -top-4 -right-4 bg-red-500 text-white rounded-full w-6 h-6 text-sm hidden group-hover:flex items-center justify-center z-10"
//             >
//               ×
//             </button>
//           </div>
//         </Rnd>
//       ))}
//     </div>
//   );
// };

// // ---- Main Page ----
// const VisionBoard = () => {
//   const [showTextModal, setShowTextModal] = useState(false);
//   const [showImageModal, setShowImageModal] = useState(false);
//   const [texts, setTexts] = useState([]);
//   const [images, setImages] = useState([]);

//   const handleAddText = (textItem) => {
//     setTexts((prev) => [...prev, textItem]);
//   };

//   const handleAddImage = (imgItem) => {
//     setImages((prev) => [...prev, imgItem]);
//   };

//   const handleRemoveText = (id) => {
//     setTexts((prev) => prev.filter((t) => t.id !== id));
//   };

//   const handleRemoveImage = (id) => {
//     setImages((prev) => prev.filter((i) => i.id !== id));
//   };

//   return (
//     <div className="min-h-screen bg-[#DCEEFF] p-6 font-Livvic text-[#3E5973]">
//       {/* Top Bar */}
//       <div className="flex justify-between items-center mb-6">
//         <div className="flex items-center gap-3 text-lg sm:text-xl font-semibold">
//           <Link to="/dashboard" className="text-[#3E5973] hover:text-[#1e2a35] transition">
//             <FiArrowLeft className="text-2xl" />
//           </Link>
//           Craft the Life You Desire
//         </div>

//         <div className="flex gap-3">
//           <button
//             onClick={() => setShowTextModal(true)}
//             className="flex items-center gap-1 px-4 py-2 rounded-xl shadow-md bg-[#DCEEFF] hover:shadow-lg transition"
//           >
//             Add Text <FiType />
//           </button>
//           <button
//             onClick={() => setShowImageModal(true)}
//             className="flex items-center gap-1 px-4 py-2 rounded-xl shadow-md bg-[#DCEEFF] hover:shadow-lg transition"
//           >
//             Add Images <FiImage />
//           </button>
//           <button className="flex items-center gap-1 px-4 py-2 rounded-xl shadow-md bg-[#DCEEFF] hover:shadow-lg transition">
//             Save <FiBookmark />
//           </button>
//         </div>
//       </div>

//       {/* Canvas Section */}
//       <VisionBoardCanvas
//         texts={texts}
//         onRemoveText={handleRemoveText}
//         images={images}
//         onRemoveImage={handleRemoveImage}
//       />

//       {showTextModal && (
//         <AddTextModal onClose={() => setShowTextModal(false)} onAdd={handleAddText} />
//       )}

//       {showImageModal && (
//         <AddImageModal onClose={() => setShowImageModal(false)} onAdd={handleAddImage} />
//       )}
//     </div>
//   );
// };

// export default VisionBoard;

// import React, { useState } from "react";
// import { FiArrowLeft, FiBookmark, FiImage, FiPlus, FiType, FiCheck } from "react-icons/fi";
// import { Link } from "react-router-dom";
// import { Rnd } from "react-rnd";
// import axios from "axios";

// // Access API Key from Vite env
// const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
// console.log("accessKey is:", import.meta.env.VITE_UNSPLASH_ACCESS_KEY);

// // ---- Text Modal ----
// const AddTextModal = ({ onClose, onAdd }) => {
//   const [input, setInput] = useState("");

//   const handleSubmit = () => {
//     if (input.trim().length > 0) {
//       onAdd({ id: Date.now(), text: input.trim() });
//       setInput("");
//       onClose();
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20">
//       <div className="bg-[#DCEFFF] relative rounded-xl p-6 shadow-xl w-[90%] max-w-sm animate-settingsOpen">
//         <button
//           onClick={onClose}
//           className="absolute top-3 right-4 text-3xl text-[#3E5973] hover:text-red-500"
//         >
//           ×
//         </button>
//         <h2 className="text-2xl font-bold text-[#3E5973] mb-4">Add Text</h2>
//         <input
//           type="text"
//           maxLength={20}
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Enter text"
//           className="w-full p-3 rounded-md text-[#3E5973] bg-white border border-[#3E5973] outline-none text-base"
//         />
//         <div className="flex justify-end mt-4">
//           <button
//             onClick={handleSubmit}
//             className="text-4xl text-[#3E5973] hover:text-green-600"
//           >
//             <FiCheck />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ---- Image Modal ----
// const AddImageModal = ({ onClose, onAdd }) => {
//   const [query, setQuery] = useState("");
//   const [results, setResults] = useState([]);

//   const searchImages = async () => {
//     try {
//       const res = await axios.get(
//   `https://api.unsplash.com/search/photos?query=${query}&per_page=9`,
//   {
//     headers: {
//       Authorization: `Client-ID ${accessKey}`,
//     },
//   }
// );
//       setResults(res.data.results);
//     } catch (err) {
//       console.error("Unsplash API Error:", err);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20">
//       <div className="bg-[#DCEFFF] relative rounded-xl p-6 shadow-xl w-[90%] max-w-2xl animate-settingsOpen">
//         <button
//           onClick={onClose}
//           className="absolute top-3 right-4 text-3xl text-[#3E5973] hover:text-red-500"
//         >
//           ×
//         </button>
//         <h2 className="text-2xl font-bold text-[#3E5973] mb-4">Search Image</h2>
//         <div className="flex gap-2">
//           <input
//             type="text"
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             placeholder="Search image"
//             className="w-full p-3 rounded-md text-[#3E5973] bg-white border border-[#3E5973] outline-none text-base"
//           />
//           <button
//             onClick={searchImages}
//             className="bg-[#3E5973] text-white px-4 py-2 rounded-md"
//           >
//             Search
//           </button>
//         </div>
//         <div className="grid grid-cols-3 gap-3 mt-4 max-h-[300px] overflow-y-auto">
//           {results.map((img) => (
//             <img
//               key={img.id}
//               src={img.urls.thumb}
//               alt={img.alt_description}
//               onClick={() => {
//                 onAdd({ id: Date.now(), url: img.urls.small });
//                 onClose();
//               }}
//               className="cursor-pointer hover:scale-105 transition rounded-lg"
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// // ---- Canvas ----
// export const VisionBoardCanvas = ({ texts, onRemoveText, images, onRemoveImage }) => {
//   return (
//     <div className="relative w-full max-w-[1440px] h-[83vh] md:h-[700px] lg:h-[800px] xl:h-[900px] border border-[#aacbe1] rounded-md bg-[#DCEEFF] p-4 overflow-hidden">
//       {texts.map((item) => (
//         <Rnd key={item.id} default={{ x: 100, y: 100, width: 150, height: 50 }} bounds="parent" className="group">
//           <div className="relative w-full h-full bg-white rounded-md border border-[#3E5973] p-2 flex items-center justify-center text-[#3E5973] font-semibold text-center">
//             {item.text}
//             <button
//               onClick={() => onRemoveText(item.id)}
//               className="absolute -top-4 -right-4 bg-red-500 text-white rounded-full w-6 h-6 text-sm hidden group-hover:flex items-center justify-center z-10"
//             >
//               ×
//             </button>
//           </div>
//         </Rnd>
//       ))}
//       {images.map((img) => (
//         <Rnd key={img.id} default={{ x: 150, y: 150, width: 200, height: 150 }} bounds="parent" className="group">
//           <div className="relative w-full h-full">
//             <img src={img.url} alt="canvas-img" className="w-full h-full object-cover rounded-md" />
//             <button
//               onClick={() => onRemoveImage(img.id)}
//               className="absolute -top-4 -right-4 bg-red-500 text-white rounded-full w-6 h-6 text-sm hidden group-hover:flex items-center justify-center z-10"
//             >
//               ×
//             </button>
//           </div>
//         </Rnd>
//       ))}
//     </div>
//   );
// };

// // ---- Main Page ----
// const VisionBoard = () => {
//   const [showTextModal, setShowTextModal] = useState(false);
//   const [showImageModal, setShowImageModal] = useState(false);
//   const [texts, setTexts] = useState([]);
//   const [images, setImages] = useState([]);

//   const handleAddText = (textItem) => {
//     setTexts((prev) => [...prev, textItem]);
//   };

//   const handleAddImage = (imgItem) => {
//     setImages((prev) => [...prev, imgItem]);
//   };

//   const handleRemoveText = (id) => {
//     setTexts((prev) => prev.filter((t) => t.id !== id));
//   };

//   const handleRemoveImage = (id) => {
//     setImages((prev) => prev.filter((i) => i.id !== id));
//   };

//   return (
//     <div className="min-h-screen bg-[#DCEEFF] p-6 font-Livvic text-[#3E5973]">
//       {/* Top Bar */}
//       <div className="flex justify-between items-center mb-6">
//         <div className="flex items-center gap-3 text-lg sm:text-xl font-semibold">
//           <Link to="/dashboard" className="text-[#3E5973] hover:text-[#1e2a35] transition">
//             <FiArrowLeft className="text-2xl" />
//           </Link>
//           Craft the Life You Desire
//         </div>

//         <div className="flex gap-3">
//           <button
//             onClick={() => setShowTextModal(true)}
//             className="flex items-center gap-1 px-4 py-2 rounded-xl shadow-md bg-[#DCEEFF] hover:shadow-lg transition"
//           >
//             Add Text <FiType />
//           </button>
//           <button
//             onClick={() => setShowImageModal(true)}
//             className="flex items-center gap-1 px-4 py-2 rounded-xl shadow-md bg-[#DCEEFF] hover:shadow-lg transition"
//           >
//             Add Images <FiImage />
//           </button>
//           <button className="flex items-center gap-1 px-4 py-2 rounded-xl shadow-md bg-[#DCEEFF] hover:shadow-lg transition">
//             Save <FiBookmark />
//           </button>
//         </div>
//       </div>

//       {/* Canvas Section */}
//       <VisionBoardCanvas
//         texts={texts}
//         onRemoveText={handleRemoveText}
//         images={images}
//         onRemoveImage={handleRemoveImage}
//       />

//       {showTextModal && (
//         <AddTextModal onClose={() => setShowTextModal(false)} onAdd={handleAddText} />
//       )}

//       {showImageModal && (
//         <AddImageModal onClose={() => setShowImageModal(false)} onAdd={handleAddImage} />
//       )}
//     </div>
//   );
// };

// export default VisionBoard;

// // src/pages/VisionBoard.jsx
// import React, { useState } from "react";
// import axios from "axios";
// import { FiArrowLeft, FiBookmark, FiImage, FiType, FiCheck } from "react-icons/fi";
// import { Link } from "react-router-dom";
// import { Rnd } from "react-rnd";

// const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

// const AddTextModal = ({ onClose, onAdd }) => {
//   const [input, setInput] = useState("");

//   const handleSubmit = () => {
//     if (input.trim().length > 0) {
//       onAdd({ id: Date.now(), text: input.trim() });
//       setInput("");
//       onClose();
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
//       <div className="bg-[#DCEFFF] relative rounded-xl p-6 shadow-xl w-[90%] max-w-sm animate-settingsOpen">
//         <button
//           onClick={onClose}
//           className="absolute top-3 right-4 text-3xl text-[#3E5973] hover:text-red-500"
//         >
//           &times;
//         </button>
//         <h2 className="text-2xl font-bold text-[#3E5973] mb-4">Add Text</h2>
//         <input
//           type="text"
//           maxLength={20}
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Enter text"
//           className="w-full p-3 rounded-md text-[#3E5973] bg-white border border-[#3E5973] outline-none text-base"
//         />
//         <div className="flex justify-end mt-4">
//           <button
//             onClick={handleSubmit}
//             className="text-4xl text-[#3E5973] hover:text-green-600"
//           >
//             <FiCheck />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const AddImageModal = ({ onClose, onAdd }) => {
//   const [query, setQuery] = useState("");
//   const [results, setResults] = useState([]);

//   const searchImages = async (query) => {
//   try {
//     const response = await axios.get(
//       `https://api.unsplash.com/search/photos?query=${query}&per_page=9`,
//       {
//         headers: {
//           Authorization: `Client-ID ${accessKey}`,
//         },
//       }
//     );
//     console.log(response.data);
//   } catch (err) {
//     console.error("Unsplash API Error:", err);
//   }
// };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
//       <div className="bg-[#DCEFFF] rounded-xl p-6 shadow-xl w-[90%] max-w-2xl animate-settingsOpen relative">
//         <button
//           onClick={onClose}
//           className="absolute top-3 right-4 text-3xl text-[#3E5973] hover:text-red-500"
//         >
//           &times;
//         </button>
//         <h2 className="text-2xl font-bold text-[#3E5973] mb-4">Search Images</h2>
//         <div className="flex gap-2 mb-4">
//           <input
//             type="text"
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             placeholder="Search Unsplash..."
//             className="w-full p-3 rounded-md text-[#3E5973] bg-white border border-[#3E5973] outline-none text-base"
//           />
//           <button
//             onClick={searchImages}
//             className="px-4 py-2 bg-[#3E5973] text-white rounded-md"
//           >
//             Search
//           </button>
//         </div>
//         <div className="grid grid-cols-3 gap-4 max-h-80 overflow-y-auto">
//           {results.map((img) => (
//             <img
//               key={img.id}
//               src={img.urls.small}
//               alt={img.alt_description}
//               className="rounded-lg cursor-pointer hover:opacity-80 transition"
//               onClick={() => {
//                 onAdd({ id: Date.now(), url: img.urls.small });
//                 onClose();
//               }}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export const VisionBoardCanvas = ({ texts, images, onRemoveText, onRemoveImage }) => {
//   return (
//     <div className="relative w-full max-w-[1440px] h-[83vh] md:h-[700px] lg:h-[800px] xl:h-[900px] border border-[#aacbe1] rounded-md bg-[#DCEEFF] p-4 overflow-hidden">
//       {texts.map((item) => (
//         <Rnd
//           key={item.id}
//           default={{ x: 100, y: 100, width: 150, height: 50 }}
//           bounds="parent"
//           className="group"
//         >
//           <div className="relative w-full h-full bg-white rounded-md border border-[#3E5973] p-2 flex items-center justify-center text-[#3E5973] font-semibold text-center">
//             {item.text}
//             <button
//               onClick={() => onRemoveText(item.id)}
//               className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full w-6 h-6 text-sm hidden group-hover:flex items-center justify-center z-10"
//             >
//               ×
//             </button>
//           </div>
//         </Rnd>
//       ))}

//       {images.map((item) => (
//         <Rnd
//           key={item.id}
//           default={{ x: 150, y: 150, width: 200, height: 200 }}
//           bounds="parent"
//           className="group"
//         >
//           <div className="relative w-full h-full">
//             <img
//               src={item.url}
//               alt="Unsplash"
//               className="w-full h-full object-cover rounded-md"
//             />
//             <button
//               onClick={() => onRemoveImage(item.id)}
//               className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full w-6 h-6 text-sm hidden group-hover:flex items-center justify-center z-10"
//             >
//               ×
//             </button>
//           </div>
//         </Rnd>
//       ))}
//     </div>
//   );
// };

// const VisionBoard = () => {
//   const [showTextModal, setShowTextModal] = useState(false);
//   const [showImageModal, setShowImageModal] = useState(false);
//   const [texts, setTexts] = useState([]);
//   const [images, setImages] = useState([]);

//   const handleAddText = (textItem) => {
//     setTexts((prev) => [...prev, textItem]);
//   };

//   const handleAddImage = (imageItem) => {
//     setImages((prev) => [...prev, imageItem]);
//   };

//   const handleRemoveText = (id) => {
//     setTexts((prev) => prev.filter((t) => t.id !== id));
//   };

//   const handleRemoveImage = (id) => {
//     setImages((prev) => prev.filter((i) => i.id !== id));
//   };

//   return (
//     <div className="min-h-screen bg-[#DCEEFF] p-6 font-Livvic text-[#3E5973]">
//       <div className="flex justify-between items-center mb-6">
//         <div className="flex items-center gap-3 text-lg sm:text-xl font-semibold">
//           <Link
//             to="/dashboard"
//             className="text-[#3E5973] hover:text-[#1e2a35] transition"
//           >
//             <FiArrowLeft className="text-2xl" />
//           </Link>
//           Craft the Life You Desire
//         </div>

//         <div className="flex gap-3">
//           <button
//             onClick={() => setShowTextModal(true)}
//             className="flex items-center gap-1 px-4 py-2 rounded-xl shadow-md bg-[#DCEEFF] hover:shadow-lg transition"
//           >
//             Add Text <FiType />
//           </button>
//           <button
//             onClick={() => setShowImageModal(true)}
//             className="flex items-center gap-1 px-4 py-2 rounded-xl shadow-md bg-[#DCEEFF] hover:shadow-lg transition"
//           >
//             Add Images <FiImage />
//           </button>
//           <button className="flex items-center gap-1 px-4 py-2 rounded-xl shadow-md bg-[#DCEEFF] hover:shadow-lg transition">
//             Save <FiBookmark />
//           </button>
//         </div>
//       </div>

//       <VisionBoardCanvas
//         texts={texts}
//         images={images}
//         onRemoveText={handleRemoveText}
//         onRemoveImage={handleRemoveImage}
//       />

//       {showTextModal && (
//         <AddTextModal onClose={() => setShowTextModal(false)} onAdd={handleAddText} />
//       )}
//       {showImageModal && (
//         <AddImageModal onClose={() => setShowImageModal(false)} onAdd={handleAddImage} />
//       )}
//     </div>
//   );
// };

// export default VisionBoard;

// import React, { useState } from "react";
// import {
//   FiArrowLeft,
//   FiBookmark,
//   FiImage,
//   FiPlus,
//   FiType,
//   FiCheck,
// } from "react-icons/fi";
// import { Link } from "react-router-dom";
// import { Rnd } from "react-rnd";
// import axios from "axios";

// const AddTextModal = ({ onClose, onAdd }) => {
//   const [input, setInput] = useState("");

//   const handleSubmit = () => {
//     if (input.trim().length > 0) {
//       onAdd({ id: Date.now(), type: "text", text: input.trim() });
//       setInput("");
//       onClose();
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20">
//       <div className="bg-[#DCEFFF] relative rounded-xl p-6 shadow-xl w-[90%] max-w-sm animate-settingsOpen">
//         <button
//           onClick={onClose}
//           className="absolute top-3 right-4 text-3xl text-[#3E5973] hover:text-red-500"
//         >
//           &times;
//         </button>
//         <h2 className="text-2xl font-bold text-[#3E5973] mb-4">Add Text</h2>
//         <input
//           type="text"
//           maxLength={20}
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Enter text"
//           className="w-full p-3 rounded-md text-[#3E5973] bg-white border border-[#3E5973] outline-none text-base"
//         />
//         <div className="flex justify-end mt-4">
//           <button
//             onClick={handleSubmit}
//             className="text-4xl text-[#3E5973] hover:text-green-600"
//           >
//             <FiCheck />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const AddImageModal = ({ onClose, onAdd }) => {
//   const [query, setQuery] = useState("");
//   const [results, setResults] = useState([]);

//   const searchImages = async () => {
//     try {
//       const res = await axios.get("https://api.unsplash.com/search/photos", {
//         params: { query, per_page: 9 },
//         headers: {
//           Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_KEY}`,
//         },
//       });
//       setResults(res.data.results);
//     } catch (error) {
//       console.error("Unsplash API Error:", error);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20">
//       <div className="bg-[#DCEFFF] relative rounded-xl p-6 shadow-xl w-[95%] max-w-2xl animate-settingsOpen">
//         <button
//           onClick={onClose}
//           className="absolute top-3 right-4 text-3xl text-[#3E5973] hover:text-red-500"
//         >
//           &times;
//         </button>
//         <h2 className="text-2xl font-bold text-[#3E5973] mb-4">Search Image</h2>
//         <div className="flex gap-2 mb-4">
//           <input
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             placeholder="Search Unsplash"
//             className="flex-1 p-2 border border-[#3E5973] rounded-md outline-none"
//           />
//           <button
//             onClick={searchImages}
//             className="px-4 py-2 bg-[#3E5973] text-white rounded-md hover:bg-[#2c4358]"
//           >
//             Search
//           </button>
//         </div>

//         <div className="grid grid-cols-3 gap-4 max-h-[300px] overflow-y-auto">
//           {results.map((img) => (
//             <img
//               key={img.id}
//               src={img.urls.thumb}
//               alt={img.alt_description}
//               className="cursor-pointer rounded hover:scale-105 transition"
//               onClick={() => {
//                 onAdd({ id: Date.now(), type: "image", url: img.urls.small });
//                 onClose();
//               }}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export const VisionBoardCanvas = ({ items, onRemove }) => {
//   return (
//     <div className="relative w-full max-w-[1440px] h-[83vh] md:h-[700px] lg:h-[800px] xl:h-[900px] border border-[#aacbe1] rounded-md bg-[#DCEEFF] p-4 overflow-hidden">
//       {items.map((item) => (
//         <Rnd
//           key={item.id}
//           default={{ x: 100, y: 100, width: item.type === "text" ? 150 : 200, height: item.type === "text" ? 50 : 200 }}
//           bounds="parent"
//           className="group"
//         >
//           <div className="relative w-full h-full">
//             {item.type === "text" ? (
//               <div className="w-full h-full bg-white border border-[#3E5973] p-2 flex items-center justify-center text-[#3E5973] font-semibold text-center">
//                 {item.text}
//               </div>
//             ) : (
//               <img
//                 src={item.url}
//                 alt="vision"
//                 className="w-full h-full object-cover rounded-md border border-[#3E5973]"
//               />
//             )}
//             <button
//               onClick={() => onRemove(item.id)}
//               className="absolute top-[-10px] right-[-10px] bg-red-500 text-white rounded-full w-6 h-6 text-sm hidden group-hover:flex items-center justify-center z-10"
//             >
//               ×
//             </button>
//           </div>
//         </Rnd>
//       ))}
//     </div>
//   );
// };

// const VisionBoard = () => {
//   const [showTextModal, setShowTextModal] = useState(false);
//   const [showImageModal, setShowImageModal] = useState(false);
//   const [items, setItems] = useState([]);

//   const handleAddItem = (item) => setItems((prev) => [...prev, item]);
//   const handleRemoveItem = (id) => setItems((prev) => prev.filter((i) => i.id !== id));

//   return (
//     <div className="min-h-screen bg-[#DCEEFF] p-6 font-Livvic text-[#3E5973]">
//       {/* Top Bar */}
//       <div className="flex justify-between items-center mb-6">
//         <div className="flex items-center gap-3 text-lg sm:text-xl font-semibold">
//           <Link to="/dashboard" className="text-[#3E5973] hover:text-[#1e2a35] transition">
//             <FiArrowLeft className="text-2xl" />
//           </Link>
//           Craft the Life You Desire
//         </div>

//         <div className="flex gap-3">
//           <button
//             onClick={() => setShowTextModal(true)}
//             className="flex items-center gap-1 px-4 py-2 rounded-xl shadow-md bg-[#DCEEFF] hover:shadow-lg transition"
//           >
//             Add Text <FiType />
//           </button>
//           <button
//             onClick={() => setShowImageModal(true)}
//             className="flex items-center gap-1 px-4 py-2 rounded-xl shadow-md bg-[#DCEEFF] hover:shadow-lg transition"
//           >
//             Add Images <FiImage />
//           </button>
//           <button className="flex items-center gap-1 px-4 py-2 rounded-xl shadow-md bg-[#DCEEFF] hover:shadow-lg transition">
//             Save <FiBookmark />
//           </button>
//         </div>
//       </div>

//       {/* Canvas */}
//       <VisionBoardCanvas items={items} onRemove={handleRemoveItem} />

//       {showTextModal && <AddTextModal onClose={() => setShowTextModal(false)} onAdd={handleAddItem} />}
//       {showImageModal && <AddImageModal onClose={() => setShowImageModal(false)} onAdd={handleAddItem} />}
//     </div>
//   );
// };

// export default VisionBoard;

// import React, { useState, useEffect } from "react";
// import {
//   FiArrowLeft,
//   FiBookmark,
//   FiImage,
//   FiPlus,
//   FiType,
//   FiCheck,
// } from "react-icons/fi";
// import { Link } from "react-router-dom";
// import { Rnd } from "react-rnd";
// import axios from "axios";

// const AddTextModal = ({ onClose, onAdd }) => {
//   const [input, setInput] = useState("");

//   const handleSubmit = () => {
//     if (input.trim().length > 0) {
//       onAdd({ id: Date.now(), text: input.trim() });
//       setInput("");
//       onClose();
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20">
//       <div className="bg-[#DCEFFF] relative rounded-xl p-6 shadow-xl w-[90%] max-w-sm animate-settingsOpen">
//         <button
//           onClick={onClose}
//           className="absolute top-3 right-4 text-3xl text-[#3E5973] hover:text-red-500"
//         >
//           &times;
//         </button>
//         <h2 className="text-2xl font-bold text-[#3E5973] mb-4">Add Text</h2>
//         <input
//           type="text"
//           maxLength={20}
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Enter text"
//           className="w-full p-3 rounded-md text-[#3E5973] bg-white border border-[#3E5973] outline-none text-base"
//         />
//         <div className="flex justify-end mt-4">
//           <button
//             onClick={handleSubmit}
//             className="text-4xl text-[#3E5973] hover:text-green-600"
//           >
//             <FiCheck />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const AddImageModal = ({ onClose, onAdd }) => {
//   const [query, setQuery] = useState("");
//   const [results, setResults] = useState([]);

//   const searchImages = async () => {
//     try {
//       const response = await axios.get("https://api.unsplash.com/search/photos", {
//         params: { query, per_page: 9 },
//         headers: {
//           Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_KEY}`,
//         },
//       });
//       setResults(response.data.results);
//     } catch (error) {
//       console.error("Image search failed", error);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20">
//       <div className="bg-[#DCEFFF] relative rounded-xl p-6 shadow-xl w-[90%] max-w-2xl animate-settingsOpen">
//         <button
//           onClick={onClose}
//           className="absolute top-3 right-4 text-3xl text-[#3E5973] hover:text-red-500"
//         >
//           &times;
//         </button>
//         <h2 className="text-2xl font-bold text-[#3E5973] mb-4">Search Unsplash</h2>
//         <div className="flex gap-2 mb-4">
//           <input
//             type="text"
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             placeholder="Search images..."
//             className="flex-1 p-3 rounded-md border border-[#3E5973] text-[#3E5973] bg-white outline-none"
//           />
//           <button
//             onClick={searchImages}
//             className="px-4 py-2 bg-[#3E5973] text-white rounded-md hover:bg-[#2e435a]"
//           >
//             Search
//           </button>
//         </div>
//         <div className="grid grid-cols-3 gap-4 max-h-[300px] overflow-y-auto">
//           {results.map((img) => (
//             <img
//               key={img.id}
//               src={img.urls.small}
//               alt="unsplash"
//               className="w-full h-32 object-cover rounded cursor-pointer hover:opacity-70"
//               onClick={() => {
//                 onAdd({ id: Date.now(), url: img.urls.small });
//                 onClose();
//               }}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export const VisionBoardCanvas = ({ texts, images, onRemoveText, onRemoveImage }) => {
//   return (
//     <div className="relative w-full max-w-[1440px] h-[83vh] md:h-[700px] lg:h-[800px] xl:h-[900px] border border-[#aacbe1] rounded-md bg-[#DCEEFF] p-4 overflow-hidden">
//       {texts.map((item) => (
//         <Rnd
//           key={item.id}
//           default={{ x: 100, y: 100, width: 150, height: 50 }}
//           bounds="parent"
//           className="group"
//         >
//           <div className="relative w-full h-full bg-white rounded-md border border-[#3E5973] p-2 flex items-center justify-center text-[#3E5973] font-semibold text-center">
//             {item.text}
//             <button
//               onClick={() => onRemoveText(item.id)}
//               className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 bg-red-500 text-white rounded-full w-6 h-6 text-sm hidden group-hover:flex items-center justify-center z-10"
//             >
//               ×
//             </button>
//           </div>
//         </Rnd>
//       ))}

//       {images.map((img) => (
//         <Rnd
//           key={img.id}
//           default={{ x: 150, y: 150, width: 200, height: 150 }}
//           bounds="parent"
//           className="group"
//         >
//           <div className="relative w-full h-full">
//             <img
//               src={img.url}
//               alt="user-img"
//               className="w-full h-full object-cover rounded-md border border-[#3E5973]"
//             />
//             <button
//               onClick={() => onRemoveImage(img.id)}
//               className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 bg-red-500 text-white rounded-full w-6 h-6 text-sm hidden group-hover:flex items-center justify-center z-10"
//             >
//               ×
//             </button>
//           </div>
//         </Rnd>
//       ))}
//     </div>
//   );
// };

// const VisionBoard = () => {
//   const [showTextModal, setShowTextModal] = useState(false);
//   const [showImageModal, setShowImageModal] = useState(false);
//   const [texts, setTexts] = useState([]);
//   const [images, setImages] = useState([]);

//   const handleAddText = (textItem) => setTexts((prev) => [...prev, textItem]);
//   const handleRemoveText = (id) => setTexts((prev) => prev.filter((t) => t.id !== id));
//   const handleAddImage = (imgItem) => setImages((prev) => [...prev, imgItem]);
//   const handleRemoveImage = (id) => setImages((prev) => prev.filter((img) => img.id !== id));

//   return (
//     <div className="min-h-screen bg-[#DCEEFF] p-6 font-Livvic text-[#3E5973]">
//       {/* Top Bar */}
//       <div className="flex justify-between items-center mb-6">
//         <div className="flex items-center gap-3 text-lg sm:text-xl font-semibold">
//           <Link
//             to="/dashboard"
//             className="text-[#3E5973] hover:text-[#1e2a35] transition"
//           >
//             <FiArrowLeft className="text-2xl" />
//           </Link>
//           Craft the Life You Desire
//         </div>

//         <div className="flex gap-3">
//           <button
//             onClick={() => setShowTextModal(true)}
//             className="flex items-center gap-1 px-4 py-2 rounded-xl shadow-md bg-[#DCEEFF] hover:shadow-lg transition"
//           >
//             Add Text <FiType />
//           </button>
//           <button
//             onClick={() => setShowImageModal(true)}
//             className="flex items-center gap-1 px-4 py-2 rounded-xl shadow-md bg-[#DCEEFF] hover:shadow-lg transition"
//           >
//             Add Images <FiImage />
//           </button>
//           <button className="flex items-center gap-1 px-4 py-2 rounded-xl shadow-md bg-[#DCEEFF] hover:shadow-lg transition">
//             Save <FiBookmark />
//           </button>
//         </div>
//       </div>

//       {/* Canvas */}
//       <VisionBoardCanvas
//         texts={texts}
//         images={images}
//         onRemoveText={handleRemoveText}
//         onRemoveImage={handleRemoveImage}
//       />

//       {/* Modals */}
//       {showTextModal && (
//         <AddTextModal
//           onClose={() => setShowTextModal(false)}
//           onAdd={handleAddText}
//         />
//       )}
//       {showImageModal && (
//         <AddImageModal
//           onClose={() => setShowImageModal(false)}
//           onAdd={handleAddImage}
//         />
//       )}
//     </div>
//   );
// };

// export default VisionBoard;

// import React, { useState } from "react";
// import { FiArrowLeft, FiBookmark, FiImage, FiPlus, FiType, FiCheck } from "react-icons/fi";
// import { Link } from "react-router-dom";
// import { Rnd } from "react-rnd"; // ✅ drag + resize

// const AddTextModal = ({ onClose, onAdd }) => {
//   const [input, setInput] = useState("");

//   const handleSubmit = () => {
//     if (input.trim().length > 0) {
//       onAdd({ id: Date.now(), text: input.trim() });
//       setInput("");
//       onClose();
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20">
//       <div className="bg-[#DCEFFF] relative rounded-xl p-6 shadow-xl w-[90%] max-w-sm animate-settingsOpen">
//         <button
//           onClick={onClose}
//           className="absolute top-3 right-4 text-3xl text-[#3E5973] hover:text-red-500"
//         >
//           &times;
//         </button>
//         <h2 className="text-2xl font-bold text-[#3E5973] mb-4">Add Text</h2>
//         <input
//           type="text"
//           maxLength={20}
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Enter text"
//           className="w-full p-3 rounded-md text-[#3E5973] bg-white border border-[#3E5973] outline-none text-base"
//         />
//         <div className="flex justify-end mt-4">
//           <button
//             onClick={handleSubmit}
//             className="text-4xl text-[#3E5973] hover:text-green-600"
//           >
//             <FiCheck />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export const VisionBoardCanvas = ({ texts, onRemoveText }) => {
//   return (
//     <div className="relative w-full max-w-[1440px] h-[83vh] md:h-[700px] lg:h-[800px] xl:h-[900px] border border-[#aacbe1] rounded-md bg-[#DCEEFF] p-4 overflow-hidden">
//       {texts.map((item) => (
//         <Rnd
//   key={item.id}
//   default={{ x: 100, y: 100, width: 150, height: 50 }}
//   bounds="parent"
//   className="group"
// >
//   <div className="relative w-full h-full bg-white rounded-md border border-[#3E5973] p-2 flex items-center justify-center text-[#3E5973] font-semibold text-center">
//     {item.text}
//     <button
//       onClick={() => onRemoveText(item.id)}
//       className="absolute -top-4 -right-4 bg-red-500 text-white rounded-full w-6 h-6 text-sm hidden group-hover:flex items-center justify-center z-10"
//     >
//       ×
//     </button>
//   </div>
// </Rnd>

//       ))}
//     </div>
//   );
// };

// const VisionBoard = () => {
//   const [showTextModal, setShowTextModal] = useState(false);
//   const [texts, setTexts] = useState([]);

//   const handleAddText = (textItem) => {
//     setTexts((prev) => [...prev, textItem]);
//   };

//   const handleRemoveText = (id) => {
//     setTexts((prev) => prev.filter((t) => t.id !== id));
//   };

//   return (
//     <div className="min-h-screen bg-[#DCEEFF] p-6 font-Livvic text-[#3E5973]">
//       {/* Top Bar */}
//       <div className="flex justify-between items-center mb-6">
//         <div className="flex items-center gap-3 text-lg sm:text-xl font-semibold">
//           <Link
//             to="/dashboard"
//             className="text-[#3E5973] hover:text-[#1e2a35] transition"
//           >
//             <FiArrowLeft className="text-2xl" />
//           </Link>
//           Craft the Life You Desire
//         </div>

//         <div className="flex gap-3">
//           <button
//             onClick={() => setShowTextModal(true)}
//             className="flex items-center gap-1 px-4 py-2 rounded-xl shadow-md bg-[#DCEEFF] hover:shadow-lg transition"
//           >
//             Add Text <FiType />
//           </button>
//           <button
//             className="flex items-center gap-1 px-4 py-2 rounded-xl shadow-md bg-[#DCEEFF] hover:shadow-lg transition"
//           >
//             Add Images <FiImage />
//           </button>
//           <button className="flex items-center gap-1 px-4 py-2 rounded-xl shadow-md bg-[#DCEEFF] hover:shadow-lg transition">
//             Save <FiBookmark />
//           </button>
//         </div>
//       </div>

//       {/* Canvas Section */}
//       <VisionBoardCanvas texts={texts} onRemoveText={handleRemoveText} />

//       {showTextModal && (
//         <AddTextModal
//           onClose={() => setShowTextModal(false)}
//           onAdd={handleAddText}
//         />
//       )}
//     </div>
//   );
// };

// export default VisionBoard;

// // src/pages/VisionBoard.jsx
// import React from "react";
// import {
//   FiArrowLeft,
//   FiBookmark,
//   FiImage,
//   FiPlus,
//   FiType,
// } from "react-icons/fi";
// import { Link } from "react-router-dom";
// import { useState } from "react";

// // ✅ This is the canvas-only previewable component
// // ✅ This is the canvas-only previewable component
// export const VisionBoardCanvas = ({ previewMode = false }) => {
//   const [hasContent, setHasContent] = useState(false);
//   return (
//     <div className="flex w-full max-w-[1440px] h-[83vh] md:h-[700px] lg:h-[800px] xl:h-[900px] border border-[#aacbe1] rounded-md bg-[#DCEEFF] p-4 overflow-hidden items-center justify-center">
//       {!hasContent && (
//         <div className="flex flex-col items-center justify-center gap-2 opacity-30 transition-opacity duration-300 text-center">
//           <FiPlus className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl" />
//         </div>
//       )}

//       {/* Your content logic goes here */}
//       {/* Example: if user adds a block, call setHasContent(true) */}
//     </div>
//   );
// };

// const VisionBoard = () => {
//   return (
//     <div className="min-h-screen bg-[#DCEEFF] p-6 font-Livvic text-[#3E5973]">
//       {/* Top Bar */}
//       <div className="flex justify-between items-center mb-6">
//         <div className="flex items-center gap-3 text-lg sm:text-xl font-semibold">
//           <Link
//             to="/dashboard"
//             className="text-[#3E5973] hover:text-[#1e2a35] transition"
//           >
//             <FiArrowLeft className="text-2xl" />
//           </Link>
//           Craft the Life You Desire
//         </div>

//         <div className="flex gap-3">
//           <button className="flex items-center gap-1 px-4 py-2 rounded-xl shadow-md bg-[#DCEEFF] hover:shadow-lg transition">
//             Add Text <FiType />
//           </button>
//           <button className="flex items-center gap-1 px-4 py-2 rounded-xl shadow-md bg-[#DCEEFF] hover:shadow-lg transition">
//             Add Images <FiImage />
//           </button>
//           <button className="flex items-center gap-1 px-4 py-2 rounded-xl shadow-md bg-[#DCEEFF] hover:shadow-lg transition">
//             Save <FiBookmark />
//           </button>
//         </div>
//       </div>

//       {/* Canvas Section */}
//       <VisionBoardCanvas />
//     </div>
//   );
// };

// export default VisionBoard;
