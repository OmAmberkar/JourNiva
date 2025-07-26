// import React, { useState } from "react";
// import { FiCheck } from "react-icons/fi";

// const AddTextModal = ({ onClose, onAdd }) => {
//   const [input, setInput] = useState("");

//   const handleSubmit = () => {
//     if (input.trim()) {
//       onAdd({ id: Date.now(), type: "text", content: input.trim(), zIndex: Date.now() });
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
//           className="w-full p-3 rounded-md text-[#3E5973] bg-white border border-[#3E5973] outline-none text-lg"
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

// export default AddTextModal;



import React, { useState } from "react";
import { FiCheck } from "react-icons/fi";

const AddTextModal = ({ onClose, onAdd }) => {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if (input.trim()) {
      onAdd({ id: Date.now(), type: "text", content: input.trim(), zIndex: 1 });
      setInput("");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20">
      <div className="bg-[#DCEFFF] relative rounded-xl p-6 shadow-xl w-[90%] max-w-sm animate-settingsOpen">
        <button onClick={onClose} className="absolute top-3 right-4 text-3xl text-[#3E5973] hover:text-red-500">×</button>
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
          <button onClick={handleSubmit} className="text-4xl text-[#3E5973] hover:text-green-600">
            <FiCheck />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTextModal;
