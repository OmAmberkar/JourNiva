// import React, { useState } from "react";
// import axios from "axios";

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
//                 const image = new Image();
//                 image.src = img.urls.small;
//                 image.onload = () => {
//                   onAdd({
//                     id: Date.now(),
//                     type: "image",
//                     url: img.urls.small,
//                     width: image.width / 4,
//                     height: image.height / 4,
//                     zIndex: Date.now(),
//                   });
//                   onClose();
//                 };
//               }}
//               className="cursor-pointer hover:scale-105 transition rounded-lg"
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddImageModal;




import React, { useState } from "react";
import axios from "axios";

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
        <button onClick={onClose} className="absolute top-3 right-4 text-3xl text-[#3E5973] hover:text-red-500">×</button>
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
                const image = new Image();
                image.src = img.urls.small;
                image.onload = () => {
                  onAdd({
                    id: Date.now(),
                    type: "image",
                    url: img.urls.small,
                    width: image.width / 4,
                    height: image.height / 4,
                    zIndex: 1,
                  });
                  onClose();
                };
              }}
              className="cursor-pointer hover:scale-105 transition rounded-lg"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddImageModal;
