import React, { useState } from "react";
import {
  FiTrendingUp,
  FiArrowUpRight,
  FiPlus,
  FiSidebar,
  FiCheck,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import ThemeDropdown from "./ThemeDropDown";
import { VisionBoardCanvas } from "../../pages/VisionBoard";

// ✅ Modal for adding tasks
const AddTaskModal = ({ type, onClose, onAdd }) => {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if (input.trim().length > 0) {
      onAdd({ id: Date.now(), text: input.trim() });
      setInput("");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20">
      <div className="bg-[#DCEFFF] relative rounded-xl p-6 shadow-xl w-[90%] max-w-sm animate-settingsOpen">
        {/* ❌ Cross button to close modal */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-3xl text-[#3E5973] hover:text-red-500"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold text-[#3E5973] mb-4">Add {type}</h2>
        <input
          type="text"
          maxLength={25}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Enter ${type}`}
          className="w-full p-3 rounded-md text-[#3E5973] bg-white border border-[#3E5973] outline-none text-base"
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

// ✅ Task Component
const Task = ({ text, onRemove }) => {
  const [done, setDone] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const handleCheck = () => {
    setDone(true);
    setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => onRemove(), 300);
    }, 300);
  };

  return !fadeOut ? (
    <label
      className={`flex items-start gap-2 text-[#3E5973] cursor-pointer transition-opacity duration-300 ${
        done ? "opacity-0" : "opacity-100"
      }`}
    >
      <div
        className={`w-4 h-4 mt-[2px] flex-shrink-0 border-2 rounded-sm flex items-center justify-center transition-all duration-200 ${
          done ? "bg-green-500 border-green-500" : "border-[#3E5973]"
        }`}
        onClick={handleCheck}
      >
        {done && <FiCheck className="text-white text-[10px]" />}
      </div>
      <div className="flex-1 max-w-[85%]">
        <p
          className={`text-xs text-[#3E5973] leading-tight break-words max-h-[2.8em] overflow-hidden ${
            done ? "line-through opacity-70" : ""
          }`}
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {text}
        </p>
      </div>
    </label>
  ) : null;
};

// ✅ RightBar Component
const RightBar = ({ isOpen, toggle }) => {
  const [showHabitModal, setShowHabitModal] = useState(false);
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [habits, setHabits] = useState([]);
  const [goals, setGoals] = useState([]);

  return (
    <aside
      className={`fixed top-0 right-0 h-full z-50 p-6 flex flex-col gap-8 items-center border-l border-transparent hover:border-[#3E5973] transition-all duration-300 ease-in-out ${
        isOpen ? "w-[30rem] xl:w-[34rem] bg-[#DCEFFF]" : "w-[4rem] bg-[#D0E6F8]"
      }`}
    >
      {/* Top Bar */}
      <div className="w-full flex justify-between items-center">
        <button
          onClick={toggle}
          className="text-3xl text-[#3E5973] cursor-pointer"
        >
          <FiSidebar />
        </button>
        {isOpen && <ThemeDropdown />}
      </div>

      {/* Vision Board Section */}
      {isOpen && (
        <div className="px-4 flex flex-col items-center gap-6 text-[#3E5973] w-full">
          <Link
            to="/visionboard"
            className="flex items-center gap-3 text-2xl font-semibold hover:text-[#1e2a35] transition"
          >
            <FiTrendingUp className="w-6 h-6" />
            <span>Vision Board</span>
          </Link>

          <Link to="/visionboard" className="w-full">
            <div
              className="relative overflow-hidden rounded-xl border border-[#3E5973] bg-white mx-auto"
              style={{ width: "100%", aspectRatio: "19 / 10" }}
            >
              <div
                style={{
                  transform: "scale(0.335)",
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

          {/* Habits and Goals */}
          <div className="w-[460px] flex flex-row gap-6 justify-between">
            {[
              {
                label: "Habits",
                tasks: habits,
                setTasks: setHabits,
                onOpen: setShowHabitModal,
              },
              {
                label: "Goals",
                tasks: goals,
                setTasks: setGoals,
                onOpen: setShowGoalModal,
              },
            ].map(({ label, tasks, setTasks, onOpen }) => (
              <div key={label} className="w-[220px] flex flex-col">
                <h3 className="font-bold text-lg mb-2 text-center text-[#3E5973]">
                  ➤ {label}
                </h3>

                <div className="h-[160px] w-full border border-[#3E5973] rounded-lg px-2 py-2 overflow-hidden">
                  {tasks.length === 0 ? (
                    <div className="h-full flex justify-center items-center">
                      <button
                        onClick={() => onOpen(true)}
                        className="text-[#3E5973] hover:text-[#1e2a35] cursor-pointer"
                      >
                        <FiPlus size={24} />
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-end mb-2">
                        <button
                          onClick={() => onOpen(true)}
                          className="cursor-pointer"
                        >
                          <FiPlus size={16} />
                        </button>
                      </div>

                      <div className="overflow-y-auto max-h-[110px] pr-1 scrollbar-thin scrollbar-thumb-[#3E5973]/60 scrollbar-track-transparent">
                        {tasks.map((t) => (
                          <Task
                            key={t.id}
                            text={t.text}
                            onRemove={() =>
                              setTasks((prev) =>
                                prev.filter((x) => x.id !== t.id)
                              )
                            }
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modals */}
      {showHabitModal && (
        <AddTaskModal
          type="Habit"
          onClose={() => setShowHabitModal(false)}
          onAdd={(task) => setHabits([...habits, task])}
        />
      )}
      {showGoalModal && (
        <AddTaskModal
          type="Goal"
          onClose={() => setShowGoalModal(false)}
          onAdd={(task) => setGoals([...goals, task])}
        />
      )}
    </aside>
  );
};

export default RightBar;











// import React, { useState } from "react";
// import {
//   FiTrendingUp,
//   FiArrowUpRight,
//   FiPlus,
//   FiSidebar,
//   FiCheck,
// } from "react-icons/fi";
// import { Link } from "react-router-dom";
// import ThemeDropdown from "./ThemeDropDown";
// import { VisionBoardCanvas } from "../../pages/VisionBoard";

// // Modal for adding tasks
// const AddTaskModal = ({ type, onClose, onAdd }) => {
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
//       <div className="bg-[#DCEFFF] rounded-xl p-6 shadow-xl w-[90%] max-w-sm animate-settingsOpen">
//         <h2 className="text-2xl font-bold text-[#3E5973] mb-4">Add {type}</h2>
//         <input
//           type="text"
//           maxLength={25}
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder={`Enter ${type}`}
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

// // Task Component
// const Task = ({ text, onRemove }) => {
//   const [done, setDone] = useState(false);
//   const [fadeOut, setFadeOut] = useState(false);

//   const handleCheck = () => {
//     setDone(true);
//     setTimeout(() => {
//       setFadeOut(true);
//       setTimeout(() => onRemove(), 300);
//     }, 300);
//   };

//   return !fadeOut ? (
//     <label
//       className={`flex items-start gap-2 text-[#3E5973] cursor-pointer transition-opacity duration-300 ${
//         done ? "opacity-0" : "opacity-100"
//       }`}
//     >
//       <div
//         className={`w-4 h-4 mt-[2px] flex-shrink-0 border-2 rounded-sm flex items-center justify-center transition-all duration-200 ${
//           done ? "bg-green-500 border-green-500" : "border-[#3E5973]"
//         }`}
//         onClick={handleCheck}
//       >
//         {done && <FiCheck className="text-white text-[10px]" />}
//       </div>
//       <div className="flex-1 max-w-[85%]">
//         <p
//           className={`text-xs text-[#3E5973] leading-tight break-words max-h-[2.8em] overflow-hidden ${
//             done ? "line-through opacity-70" : ""
//           }`}
//           style={{
//             display: "-webkit-box",
//             WebkitLineClamp: 2,
//             WebkitBoxOrient: "vertical",
//           }}
//         >
//           {text}
//         </p>
//       </div>
//     </label>
//   ) : null;
// };

// const RightBar = ({ isOpen, toggle }) => {
//   const [showHabitModal, setShowHabitModal] = useState(false);
//   const [showGoalModal, setShowGoalModal] = useState(false);
//   const [habits, setHabits] = useState([]);
//   const [goals, setGoals] = useState([]);

//   return (
//     <aside
//       className={`fixed top-0 right-0 h-full z-50 p-6 flex flex-col gap-8 items-center border-l border-transparent hover:border-[#3E5973] transition-all duration-300 ease-in-out ${
//         isOpen ? "w-[30rem] xl:w-[34rem] bg-[#DCEFFF]" : "w-[4rem] bg-[#D0E6F8]"
//       }`}
//     >
//       {/* Top Bar */}
//       <div className="w-full flex justify-between items-center">
//         <button
//           onClick={toggle}
//           className="text-3xl text-[#3E5973] cursor-pointer"
//         >
//           <FiSidebar />
//         </button>
//         {isOpen && <ThemeDropdown />}
//       </div>

//       {/* Vision Board Section */}
//       {isOpen && (
//         <div className="px-4 flex flex-col items-center gap-6 text-[#3E5973] w-full">
//           <Link
//             to="/visionboard"
            
//             className="flex items-center gap-3 text-2xl font-semibold hover:text-[#1e2a35] transition"
//           >
//             <FiTrendingUp className="w-6 h-6" />
//             <span>Vision Board</span>
//             {/* <FiArrowUpRight className="w-6 h-6" /> */}
//           </Link>

//           <Link
//             to="/visionboard"
            
//             className="w-full"
//           >
//             <div
//               className="relative overflow-hidden rounded-xl border border-[#3E5973] bg-white mx-auto"
//               style={{ width: "100%", aspectRatio: "19 / 10" }}
//             >
//               <div
//                 style={{
//                   transform: "scale(0.335)",
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

//           {/* Habits and Goals */}
//           <div className="w-[460px] flex flex-row gap-6 justify-between">
//             {[
//               {
//                 label: "Habits",
//                 tasks: habits,
//                 setTasks: setHabits,
//                 onOpen: setShowHabitModal,
//               },
//               {
//                 label: "Goals",
//                 tasks: goals,
//                 setTasks: setGoals,
//                 onOpen: setShowGoalModal,
//               },
//             ].map(({ label, tasks, setTasks, onOpen }) => (
//               <div key={label} className="w-[220px] flex flex-col">
//                 <h3 className="font-bold text-lg mb-2 text-center text-[#3E5973]">
//                   ➤ {label}
//                 </h3>

//                 <div className="h-[160px] w-full border border-[#3E5973] rounded-lg px-2 py-2 overflow-hidden">
//                   {tasks.length === 0 ? (
//                     <div className="h-full flex justify-center items-center">
//                       <button
//                         onClick={() => onOpen(true)}
//                         className="text-[#3E5973] hover:text-[#1e2a35] cursor-pointer"
//                       >
//                         <FiPlus size={24} />
//                       </button>
//                     </div>
//                   ) : (
//                     <>
//                       <div className="flex items-center justify-end mb-2">
//                         <button
//                           onClick={() => onOpen(true)}
//                           className="cursor-pointer"
//                         >
//                           <FiPlus size={16} />
//                         </button>
//                       </div>

//                       <div className="overflow-y-auto max-h-[110px] pr-1 scrollbar-thin scrollbar-thumb-[#3E5973]/60 scrollbar-track-transparent">
//                         {tasks.map((t) => (
//                           <Task
//                             key={t.id}
//                             text={t.text}
//                             onRemove={() =>
//                               setTasks((prev) =>
//                                 prev.filter((x) => x.id !== t.id)
//                               )
//                             }
//                           />
//                         ))}
//                       </div>
//                     </>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Modals */}
//       {showHabitModal && (
//         <AddTaskModal
//           type="Habit"
//           onClose={() => setShowHabitModal(false)}
//           onAdd={(task) => setHabits([...habits, task])}
//         />
//       )}
//       {showGoalModal && (
//         <AddTaskModal
//           type="Goal"
//           onClose={() => setShowGoalModal(false)}
//           onAdd={(task) => setGoals([...goals, task])}
//         />
//       )}
//     </aside>
//   );
// };

// export default RightBar;

// // RightBar.jsx
// import {
//   FiTrendingUp,
//   FiArrowUpRight,
//   FiPlus,
//   FiSidebar,
// } from "react-icons/fi";
// import { Link } from "react-router-dom";
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

// /* ⬇⬇  → now receives isOpen + toggle from Dashboard */
// const RightBar = ({ isOpen, toggle }) => {
//   return (
//     <aside
//       className={`
//         fixed top-0 right-0 h-full z-50
//         ${
//           isOpen
//             ? "w-[20rem] xl:w-[24rem] bg-[#DCEFFF]"
//             : "w-[4rem] bg-[#D0E6F8]"
//         }
//         p-4 flex flex-col gap-6 items-center
//         border-l border-transparent hover:border-[#3E5973]
//         transition-all duration-300 ease-in-out
//       `}
//     >
//       {/* Top toggle row */}
//       <div className="w-full flex justify-between items-center">
//         <button
//           onClick={toggle}
//           className={`text-3xl cursor-pointer ${isOpen ?  "text-[#3E5973]" : "text-[#3E5973]"}`}
//         >
//           <FiSidebar />
//         </button>

//         {isOpen && <ThemeDropdown />}
//       </div>

//       {/* Vision‑board section */}
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

//           {/* live preview */}
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

//       {/* quick‑links */}
//       {isOpen && (
//         <div className="w-full px-2 flex items-center justify-center group gap-8">
//           <QuickLinkCard
//             to="/habits"
//             title="Habits"
//             subtitle="Track your habits"
//           />
//           <div className="h-24 w-[1px] bg-[#3E5973] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300" />
//           <QuickLinkCard
//             to="/goals"
//             title="Goals"
//             subtitle="Track your goals"
//           />
//         </div>
//       )}
//     </aside>
//   );
// };

// export default RightBar;

// import React, { useState } from "react";
// import {
//   FiTrendingUp,
//   FiArrowUpRight,
//   FiPlus,
//   FiSidebar,
//   FiCheck,
// } from "react-icons/fi";
// import { Link } from "react-router-dom";
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

// const AddTaskModal = ({ type, onClose, onAdd }) => {
//   const [input, setInput] = useState("");

//   const handleSubmit = () => {
//     if (input.trim().length > 0) {
//       onAdd(input.trim());
//       setInput("");
//       onClose();
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20">
//       <div className="bg-[#DCEFFF] rounded-xl p-6 shadow-xl w-[90%] max-w-sm animate-settingsOpen">
//         <h2 className="text-xl font-bold text-[#3E5973] mb-3">Add {type}</h2>
//         <input
//           type="text"
//           maxLength={25}
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder={`Enter ${type}`}
//           className="w-full p-2 rounded-md text-[#3E5973] bg-white border border-[#3E5973] outline-none"
//         />
//         <div className="flex justify-end mt-4">
//           <button
//             onClick={handleSubmit}
//             className="text-3xl text-[#3E5973] hover:text-green-600"
//           >
//             <FiCheck />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const Task = ({ text }) => {
//   const [done, setDone] = useState(false);
//   const [fadeOut, setFadeOut] = useState(false);

//   const handleCheck = () => {
//     setDone(true);
//     setTimeout(() => setFadeOut(true), 800);
//   };

//   return !fadeOut ? (
//     <div
//       onClick={handleCheck}
//       className="relative cursor-pointer px-4 py-2 rounded-md bg-white border border-[#3E5973] w-full text-sm flex items-center gap-2 text-[#3E5973] hover:bg-[#cfe9ff] transition duration-300"
//     >
//       <div className="w-4 h-4 border-2 rounded-sm" />
//       <span className="truncate">{text}</span>
//       {done && (
//         <div className="absolute inset-0 bg-green-400 rounded-md opacity-70 animate-[fadeOut_0.8s_forwards] flex items-center justify-center text-white font-bold">
//           <FiCheck size={20} />
//         </div>
//       )}
//     </div>
//   ) : null;
// };

// const RightBar = ({ isOpen, toggle }) => {
//   const [showHabitModal, setShowHabitModal] = useState(false);
//   const [showGoalModal, setShowGoalModal] = useState(false);
//   const [habits, setHabits] = useState([
//     "Drink 4 Ltr of water",
//     "Walk 10 mins",
//     "Save Rs.500",
//     "Go to Gym",
//   ]);
//   const [goals, setGoals] = useState([
//     "Score above 90%",
//     "Complete Assignments",
//     "Save Rs.500 everyday",
//     "Go to Gym consistently",
//   ]);

//   return (
//     <aside
//       className={`
//         fixed top-0 right-0 h-full z-50
//         ${
//           isOpen
//             ? "w-[20rem] xl:w-[24rem] bg-[#DCEFFF]"
//             : "w-[4rem] bg-[#D0E6F8]"
//         }
//         p-4 flex flex-col gap-6 items-center
//         border-l border-transparent hover:border-[#3E5973]
//         transition-all duration-300 ease-in-out
//       `}
//     >
//       <div className="w-full flex justify-between items-center">
//         <button
//           onClick={toggle}
//           className="text-3xl cursor-pointer text-[#3E5973]"
//         >
//           <FiSidebar />
//         </button>
//         {isOpen && <ThemeDropdown />}
//       </div>

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
//               style={{ width: "100%", maxWidth: "290px", aspectRatio: "20.5 / 10" }}
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

//           {/* Tasks Section */}
//           <div className="mt-6 w-full flex flex-col gap-4">
//             <div className="flex items-center justify-between">
//               <h3 className="font-bold">➤ Habits ↗</h3>
//               <button onClick={() => setShowHabitModal(true)}><FiPlus /></button>
//             </div>
//             {habits.map((habit, idx) => <Task key={idx} text={habit} />)}

//             <div className="flex items-center justify-between mt-4">
//               <h3 className="font-bold">➤ Goals ↗</h3>
//               <button onClick={() => setShowGoalModal(true)}><FiPlus /></button>
//             </div>
//             {goals.map((goal, idx) => <Task key={idx} text={goal} />)}
//           </div>
//         </div>
//       )}

//       {showHabitModal && (
//         <AddTaskModal
//           type="Habit"
//           onClose={() => setShowHabitModal(false)}
//           onAdd={(text) => setHabits([...habits, text])}
//         />
//       )}
//       {showGoalModal && (
//         <AddTaskModal
//           type="Goal"
//           onClose={() => setShowGoalModal(false)}
//           onAdd={(text) => setGoals([...goals, text])}
//         />
//       )}
//     </aside>
//   );
// };

// export default RightBar;

// import React, { useState } from "react";
// import {
//   FiTrendingUp,
//   FiArrowUpRight,
//   FiPlus,
//   FiSidebar,
//   FiCheck,
// } from "react-icons/fi";
// import { Link } from "react-router-dom";
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

// const AddTaskModal = ({ type, onClose, onAdd }) => {
//   const [input, setInput] = useState("");

//   const handleSubmit = () => {
//     if (input.trim().length > 0) {
//       onAdd(input.trim());
//       setInput("");
//       onClose();
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20">
//       <div className="bg-[#DCEFFF] rounded-xl p-6 shadow-xl w-[90%] max-w-sm animate-settingsOpen">
//         <h2 className="text-xl font-bold text-[#3E5973] mb-3">Add {type}</h2>
//         <input
//           type="text"
//           maxLength={25}
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder={`Enter ${type}`}
//           className="w-full p-2 rounded-md text-[#3E5973] bg-white border border-[#3E5973] outline-none"
//         />
//         <div className="flex justify-end mt-4">
//           <button
//             onClick={handleSubmit}
//             className="text-3xl text-[#3E5973] hover:text-green-600"
//           >
//             <FiCheck />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const Task = ({ text }) => {
//   const [done, setDone] = useState(false);

//   return (
//     <label className="flex items-center gap-2 text-xs text-[#3E5973] cursor-pointer">
//       <div
//         className={`w-4 h-4 border-2 rounded-sm flex items-center justify-center transition-all duration-200 ${done ? "bg-green-500 border-green-500" : "border-[#3E5973]"}`}
//         onClick={() => setDone((prev) => !prev)}
//       >
//         {done && <FiCheck className="text-white text-[10px]" />}
//       </div>
//       <span className={`truncate ${done ? "line-through opacity-70" : ""}`}>{text}</span>
//     </label>
//   );
// };

// const RightBar = ({ isOpen, toggle }) => {
//   const [showHabitModal, setShowHabitModal] = useState(false);
//   const [showGoalModal, setShowGoalModal] = useState(false);
//   const [habits, setHabits] = useState([
//     "Drink 4 Ltr of water",
//     "Walk 10 mins",
//     "Save Rs.500",
//     "Go to Gym",
//   ]);
//   const [goals, setGoals] = useState([
//     "Score above 90%",
//     "Complete Assignments",
//     "Save Rs.500 everyday",
//     "Go to Gym consistently",
//   ]);

//   return (
//     <aside
//       className={`
//         fixed top-0 right-0 h-full z-50
//         ${
//           isOpen
//             ? "w-[20rem] xl:w-[24rem] bg-[#DCEFFF]"
//             : "w-[4rem] bg-[#D0E6F8]"
//         }
//         p-4 flex flex-col gap-6 items-center
//         border-l border-transparent hover:border-[#3E5973]
//         transition-all duration-300 ease-in-out
//       `}
//     >
//       <div className="w-full flex justify-between items-center">
//         <button
//           onClick={toggle}
//           className="text-3xl cursor-pointer text-[#3E5973]"
//         >
//           <FiSidebar />
//         </button>
//         {isOpen && <ThemeDropdown />}
//       </div>

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
//               style={{ width: "100%", maxWidth: "290px", aspectRatio: "20.5 / 10" }}
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

//           {/* Tasks Section */}
//           <div className="mt-6 w-full flex flex-row gap-4 items-start justify-between">
//             {/* Habits */}
//             <div className="flex-1">
//               <div className="flex items-center justify-between mb-2">
//                 <h3 className="font-bold text-sm">➤ Habits ↗</h3>
//                 <button onClick={() => setShowHabitModal(true)}><FiPlus size={14} /></button>
//               </div>
//               <div className="flex flex-col gap-2">
//                 {habits.map((habit, idx) => <Task key={idx} text={habit} />)}
//               </div>
//             </div>

//             {/* Goals */}
//             <div className="flex-1">
//               <div className="flex items-center justify-between mb-2">
//                 <h3 className="font-bold text-sm">➤ Goals ↗</h3>
//                 <button onClick={() => setShowGoalModal(true)}><FiPlus size={14} /></button>
//               </div>
//               <div className="flex flex-col gap-2">
//                 {goals.map((goal, idx) => <Task key={idx} text={goal} />)}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {showHabitModal && (
//         <AddTaskModal
//           type="Habit"
//           onClose={() => setShowHabitModal(false)}
//           onAdd={(text) => setHabits([...habits, text])}
//         />
//       )}
//       {showGoalModal && (
//         <AddTaskModal
//           type="Goal"
//           onClose={() => setShowGoalModal(false)}
//           onAdd={(text) => setGoals([...goals, text])}
//         />
//       )}
//     </aside>
//   );
// };

// export default RightBar;

// import React, { useState } from "react";
// import {
//   FiTrendingUp,
//   FiArrowUpRight,
//   FiPlus,
//   FiSidebar,
//   FiCheck,
// } from "react-icons/fi";
// import { Link } from "react-router-dom";
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

// const AddTaskModal = ({ type, onClose, onAdd }) => {
//   const [input, setInput] = useState("");

//   const handleSubmit = () => {
//     if (input.trim().length > 0) {
//       onAdd(input.trim());
//       setInput("");
//       onClose();
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20">
//       <div className="bg-[#DCEFFF] rounded-xl p-6 shadow-xl w-[90%] max-w-sm animate-settingsOpen">
//         <h2 className="text-xl font-bold text-[#3E5973] mb-3">Add {type}</h2>
//         <input
//           type="text"
//           maxLength={25}
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder={`Enter ${type}`}
//           className="w-full p-2 rounded-md text-[#3E5973] bg-white border border-[#3E5973] outline-none"
//         />
//         <div className="flex justify-end mt-4">
//           <button
//             onClick={handleSubmit}
//             className="text-3xl text-[#3E5973] hover:text-green-600"
//           >
//             <FiCheck />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const Task = ({ text, onRemove }) => {
//   const [done, setDone] = useState(false);
//   const [fadeOut, setFadeOut] = useState(false);

//   const handleCheck = () => {
//     setDone(true);
//     setTimeout(() => {
//       setFadeOut(true);
//       setTimeout(() => onRemove(), 300); // final removal
//     }, 300);
//   };

//   return !fadeOut ? (
//     <label
//       className={`flex items-center gap-2 text-xs text-[#3E5973] cursor-pointer transition-opacity duration-300 ${done ? "opacity-0" : "opacity-100"}`}
//     >
//       <div
//         className={`w-4 h-4 border-2 rounded-sm flex items-center justify-center transition-all duration-200 ${done ? "bg-green-500 border-green-500" : "border-[#3E5973]"}`}
//         onClick={handleCheck}
//       >
//         {done && <FiCheck className="text-white text-[10px]" />}
//       </div>
//       <span className={`truncate ${done ? "line-through opacity-70" : ""}`}>{text}</span>
//     </label>
//   ) : null;
// };

// const RightBar = ({ isOpen, toggle }) => {
//   const [showHabitModal, setShowHabitModal] = useState(false);
//   const [showGoalModal, setShowGoalModal] = useState(false);
//   const [habits, setHabits] = useState([
//     "Drink 4 Ltr of water",
//     "Walk 10 mins",
//     "Save Rs.500",
//     "Go to Gym",
//   ]);
//   const [goals, setGoals] = useState([
//     "Score above 90%",
//     "Complete Assignments",
//     "Save Rs.500 everyday",
//     "Go to Gym consistently",
//   ]);

//   const removeHabit = (index) => {
//     setHabits((prev) => prev.filter((_, i) => i !== index));
//   };

//   const removeGoal = (index) => {
//     setGoals((prev) => prev.filter((_, i) => i !== index));
//   };

//   return (
//     <aside
//       className={`
//         fixed top-0 right-0 h-full z-50
//         ${
//           isOpen
//             ? "w-[20rem] xl:w-[24rem] bg-[#DCEFFF]"
//             : "w-[4rem] bg-[#D0E6F8]"
//         }
//         p-4 flex flex-col gap-6 items-center
//         border-l border-transparent hover:border-[#3E5973]
//         transition-all duration-300 ease-in-out
//       `}
//     >
//       <div className="w-full flex justify-between items-center">
//         <button
//           onClick={toggle}
//           className="text-3xl cursor-pointer text-[#3E5973]"
//         >
//           <FiSidebar />
//         </button>
//         {isOpen && <ThemeDropdown />}
//       </div>

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
//               style={{ width: "100%", maxWidth: "290px", aspectRatio: "20.5 / 10" }}
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

//           {/* Tasks Section */}
//           <div className="mt-6 w-full flex flex-row gap-4 items-start justify-between">
//             {/* Habits */}
//             <div className="flex-1">
//               <div className="flex items-center justify-between mb-2">
//                 <h3 className="font-bold text-sm">➤ Habits ↗</h3>
//                 <button onClick={() => setShowHabitModal(true)}><FiPlus size={14} /></button>
//               </div>
//               <div className="flex flex-col gap-2">
//                 {habits.map((habit, idx) => (
//                   <Task key={idx} text={habit} onRemove={() => removeHabit(idx)} />
//                 ))}
//               </div>
//             </div>

//             {/* Goals */}
//             <div className="flex-1">
//               <div className="flex items-center justify-between mb-2">
//                 <h3 className="font-bold text-sm">➤ Goals ↗</h3>
//                 <button onClick={() => setShowGoalModal(true)}><FiPlus size={14} /></button>
//               </div>
//               <div className="flex flex-col gap-2">
//                 {goals.map((goal, idx) => (
//                   <Task key={idx} text={goal} onRemove={() => removeGoal(idx)} />
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {showHabitModal && (
//         <AddTaskModal
//           type="Habit"
//           onClose={() => setShowHabitModal(false)}
//           onAdd={(text) => setHabits([...habits, text])}
//         />
//       )}
//       {showGoalModal && (
//         <AddTaskModal
//           type="Goal"
//           onClose={() => setShowGoalModal(false)}
//           onAdd={(text) => setGoals([...goals, text])}
//         />
//       )}
//     </aside>
//   );
// };

// export default RightBar;

// import React, { useState } from "react";
// import {
//   FiTrendingUp,
//   FiArrowUpRight,
//   FiPlus,
//   FiSidebar,
//   FiCheck,
// } from "react-icons/fi";
// import { Link } from "react-router-dom";
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

// const AddTaskModal = ({ type, onClose, onAdd }) => {
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
//       <div className="bg-[#DCEFFF] rounded-xl p-6 shadow-xl w-[90%] max-w-sm animate-settingsOpen">
//         <h2 className="text-xl font-bold text-[#3E5973] mb-3">Add {type}</h2>
//         <input
//           type="text"
//           maxLength={25}
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder={`Enter ${type}`}
//           className="w-full p-2 rounded-md text-[#3E5973] bg-white border border-[#3E5973] outline-none"
//         />
//         <div className="flex justify-end mt-4">
//           <button
//             onClick={handleSubmit}
//             className="text-3xl text-[#3E5973] hover:text-green-600"
//           >
//             <FiCheck />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const Task = ({ text, onRemove }) => {
//   const [done, setDone] = useState(false);
//   const [fadeOut, setFadeOut] = useState(false);

//   const handleCheck = () => {
//     setDone(true);
//     setTimeout(() => {
//       setFadeOut(true);
//       setTimeout(() => onRemove(), 300);
//     }, 300);
//   };

//   return !fadeOut ? (
//     <label
//       className={`flex items-center gap-2 text-xs text-[#3E5973] cursor-pointer transition-opacity duration-300 ${done ? "opacity-0" : "opacity-100"}`}
//     >
//       <div
//         className={`w-4 h-4 border-2 rounded-sm flex items-center justify-center transition-all duration-200 ${done ? "bg-green-500 border-green-500" : "border-[#3E5973]"}`}
//         onClick={handleCheck}
//       >
//         {done && <FiCheck className="text-white text-[10px]" />}
//       </div>
//       <span className={`truncate ${done ? "line-through opacity-70" : ""}`}>{text}</span>
//     </label>
//   ) : null;
// };

// const RightBar = ({ isOpen, toggle }) => {
//   const [showHabitModal, setShowHabitModal] = useState(false);
//   const [showGoalModal, setShowGoalModal] = useState(false);
//   const [habits, setHabits] = useState([]);
//   const [goals, setGoals] = useState([]);

//   const removeHabit = (id) => setHabits((prev) => prev.filter((t) => t.id !== id));
//   const removeGoal = (id) => setGoals((prev) => prev.filter((t) => t.id !== id));

//   return (
//     <aside
//       className={`fixed top-0 right-0 h-full z-50 p-4 flex flex-col gap-6 items-center border-l border-transparent hover:border-[#3E5973] transition-all duration-300 ease-in-out ${isOpen ? "w-[20rem] xl:w-[24rem] bg-[#DCEFFF]" : "w-[4rem] bg-[#D0E6F8]"}`}
//     >
//       <div className="w-full flex justify-between items-center">
//         <button
//           onClick={toggle}
//           className="text-3xl cursor-pointer text-[#3E5973]"
//         >
//           <FiSidebar />
//         </button>
//         {isOpen && <ThemeDropdown />}
//       </div>

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
//             <div className="relative overflow-hidden rounded-xl border border-[#3E5973] bg-white mx-auto" style={{ width: "100%", maxWidth: "290px", aspectRatio: "20.5 / 10" }}>
//               <div style={{ transform: "scale(0.215)", transformOrigin: "top left", width: "1440px", height: "900px", pointerEvents: "none" }}>
//                 <VisionBoardCanvas previewMode />
//               </div>
//             </div>
//           </Link>

//           <div className="mt-6 w-full flex flex-row gap-4 items-start justify-between">
//             {[{ label: "Habits", tasks: habits, setTasks: setHabits, onOpen: setShowHabitModal }, { label: "Goals", tasks: goals, setTasks: setGoals, onOpen: setShowGoalModal }].map(({ label, tasks, setTasks, onOpen }, idx) => (
//               <div className="flex-1 h-[160px] relative border border-[#3E5973] rounded-lg px-2 py-1">
//                 {tasks.length === 0 ? (
//                   <div className="h-full flex justify-center items-center">
//                     <button onClick={() => onOpen(true)} className="text-[#3E5973] hover:text-[#1e2a35]">
//                       <FiPlus size={20} />
//                     </button>
//                   </div>
//                 ) : (
//                   <>
//                     <div className="flex items-center justify-between mb-1">
//                       <h3 className="font-bold text-sm">➤ {label} ↗</h3>
//                       <button onClick={() => onOpen(true)}><FiPlus size={14} /></button>
//                     </div>
//                     <div className="overflow-y-auto max-h-[130px] pr-1 scrollbar-thin scrollbar-thumb-[#3E5973]/60 scrollbar-track-transparent">
//                       {tasks.map((t) => (
//                         <Task
//                           key={t.id}
//                           text={t.text}
//                           onRemove={() => setTasks((prev) => prev.filter((x) => x.id !== t.id))}
//                         />
//                       ))}
//                     </div>
//                   </>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {showHabitModal && (
//         <AddTaskModal
//           type="Habit"
//           onClose={() => setShowHabitModal(false)}
//           onAdd={(task) => setHabits([...habits, task])}
//         />
//       )}
//       {showGoalModal && (
//         <AddTaskModal
//           type="Goal"
//           onClose={() => setShowGoalModal(false)}
//           onAdd={(task) => setGoals([...goals, task])}
//         />
//       )}
//     </aside>
//   );
// };

// export default RightBar;

// import React, { useState } from "react";
// import {
//   FiTrendingUp,
//   FiArrowUpRight,
//   FiPlus,
//   FiSidebar,
//   FiCheck,
// } from "react-icons/fi";
// import { Link } from "react-router-dom";
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

// const AddTaskModal = ({ type, onClose, onAdd }) => {
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
//       <div className="bg-[#DCEFFF] rounded-xl p-6 shadow-xl w-[90%] max-w-sm animate-settingsOpen">
//         <h2 className="text-xl font-bold text-[#3E5973] mb-3">Add {type}</h2>
//         <input
//           type="text"
//           maxLength={25}
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder={`Enter ${type}`}
//           className="w-full p-2 rounded-md text-[#3E5973] bg-white border border-[#3E5973] outline-none"
//         />
//         <div className="flex justify-end mt-4">
//           <button
//             onClick={handleSubmit}
//             className="text-3xl text-[#3E5973] hover:text-green-600"
//           >
//             <FiCheck />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const Task = ({ text, onRemove }) => {
//   const [done, setDone] = useState(false);
//   const [fadeOut, setFadeOut] = useState(false);

//   const handleCheck = () => {
//     setDone(true);
//     setTimeout(() => {
//       setFadeOut(true);
//       setTimeout(() => onRemove(), 300);
//     }, 300);
//   };

//   return !fadeOut ? (
//     <label
//   className={`flex items-start gap-2 text-[#3E5973] cursor-pointer transition-opacity duration-300 ${
//     done ? "opacity-0" : "opacity-100"
//   }`}
// >
//   <div
//     className={`w-4 h-4 mt-1 border-2 rounded-sm flex-shrink-0 flex items-center justify-center transition-all duration-200 ${
//       done ? "bg-green-500 border-green-500" : "border-[#3E5973]"
//     }`}
//     onClick={handleCheck}
//   >
//     {done && <FiCheck className="text-white text-[10px]" />}
//   </div>

//   <div className="flex-1 max-w-[85%]">
//     <p
//       className={`text-xs leading-tight break-words max-h-[2.8em] overflow-hidden ${
//         done ? "line-through opacity-70" : ""
//       }`}
//       style={{
//         display: "-webkit-box",
//         WebkitLineClamp: 2,
//         WebkitBoxOrient: "vertical",
//       }}
//     >
//       {text}
//     </p>
//   </div>
// </label>

//   ) : null;
// };

// const RightBar = ({ isOpen, toggle }) => {
//   const [showHabitModal, setShowHabitModal] = useState(false);
//   const [showGoalModal, setShowGoalModal] = useState(false);
//   const [habits, setHabits] = useState([]);
//   const [goals, setGoals] = useState([]);

//   const removeHabit = (id) => setHabits((prev) => prev.filter((t) => t.id !== id));
//   const removeGoal = (id) => setGoals((prev) => prev.filter((t) => t.id !== id));

//   return (
//     <aside
//   className={`fixed top-0 right-0 h-full z-50 p-4 flex flex-col gap-6 items-center border-l border-transparent hover:border-[#3E5973] transition-all duration-300 ease-in-out ${isOpen ? "w-[28rem] xl:w-[32rem] bg-[#DCEFFF]" : "w-[4rem] bg-[#D0E6F8]"}`}
// >

//       <div className="w-full flex justify-between items-center">
//         <button
//           onClick={toggle}
//           className="text-3xl cursor-pointer text-[#3E5973]"
//         >
//           <FiSidebar />
//         </button>
//         {isOpen && <ThemeDropdown />}
//       </div>

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
//             <div className="relative overflow-hidden rounded-xl border border-[#3E5973] bg-white mx-auto" style={{ width: "100%", maxWidth: "290px", aspectRatio: "20.5 / 10" }}>
//               <div style={{ transform: "scale(0.215)", transformOrigin: "top left", width: "1440px", height: "900px", pointerEvents: "none" }}>
//                 <VisionBoardCanvas previewMode />
//               </div>
//             </div>
//           </Link>

//           <div className="mt-6 w-full flex flex-row gap-4 items-start justify-between">
//             {[{ label: "Habits", tasks: habits, setTasks: setHabits, onOpen: setShowHabitModal }, { label: "Goals", tasks: goals, setTasks: setGoals, onOpen: setShowGoalModal }].map(({ label, tasks, setTasks, onOpen }, idx) => (
//               <div className="flex-1">
//                 <h3 className="font-bold text-sm mb-1 text-center">➤ {label} ↗</h3>
//                 <div className="h-[160px] relative border border-[#3E5973] rounded-lg px-2 py-1">
//                   {tasks.length === 0 ? (
//                     <div className="h-full flex justify-center items-center">
//                       <button onClick={() => onOpen(true)} className="text-[#3E5973] hover:text-[#1e2a35]">
//                         <FiPlus size={20} />
//                       </button>
//                     </div>
//                   ) : (
//                     <>
//                       <div className="flex items-center justify-end mb-1">
//                         <button onClick={() => onOpen(true)}><FiPlus size={14} /></button>
//                       </div>
//                       <div className="overflow-y-auto max-h-[130px] pr-1 scrollbar-thin scrollbar-thumb-[#3E5973]/60 scrollbar-track-transparent">
//                         {tasks.map((t) => (
//                           <Task
//                             key={t.id}
//                             text={t.text}
//                             onRemove={() => setTasks((prev) => prev.filter((x) => x.id !== t.id))}
//                           />
//                         ))}
//                       </div>
//                     </>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {showHabitModal && (
//         <AddTaskModal
//           type="Habit"
//           onClose={() => setShowHabitModal(false)}
//           onAdd={(task) => setHabits([...habits, task])}
//         />
//       )}
//       {showGoalModal && (
//         <AddTaskModal
//           type="Goal"
//           onClose={() => setShowGoalModal(false)}
//           onAdd={(task) => setGoals([...goals, task])}
//         />
//       )}
//     </aside>
//   );
// };

// export default RightBar;

// import React, { useState } from "react";
// import {
//   FiTrendingUp,
//   FiArrowUpRight,
//   FiPlus,
//   FiSidebar,
//   FiCheck,
// } from "react-icons/fi";
// import { Link } from "react-router-dom";
// import ThemeDropdown from "./ThemeDropDown";
// import { VisionBoardCanvas } from "../../pages/VisionBoard";

// const AddTaskModal = ({ type, onClose, onAdd }) => {
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
//       <div className="bg-[#DCEFFF] rounded-xl p-6 shadow-xl w-[90%] max-w-sm animate-settingsOpen">
//         <h2 className="text-xl font-bold text-[#3E5973] mb-3">Add {type}</h2>
//         <input
//           type="text"
//           maxLength={25}
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder={`Enter ${type}`}
//           className="w-full p-2 rounded-md text-[#3E5973] bg-white border border-[#3E5973] outline-none"
//         />
//         <div className="flex justify-end mt-4">
//           <button
//             onClick={handleSubmit}
//             className="text-3xl text-[#3E5973] hover:text-green-600"
//           >
//             <FiCheck />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const Task = ({ text, onRemove }) => {
//   const [done, setDone] = useState(false);
//   const [fadeOut, setFadeOut] = useState(false);

//   const handleCheck = () => {
//     setDone(true);
//     setTimeout(() => {
//       setFadeOut(true);
//       setTimeout(() => onRemove(), 300);
//     }, 300);
//   };

//   return !fadeOut ? (
//     <label
//       className={`flex items-start gap-2 text-[#3E5973] cursor-pointer transition-opacity duration-300 ${
//         done ? "opacity-0" : "opacity-100"
//       }`}
//     >
//       <div
//         className={`w-4 h-4 mt-[2px] flex-shrink-0 border-2 rounded-sm flex items-center justify-center transition-all duration-200 ${
//           done ? "bg-green-500 border-green-500" : "border-[#3E5973]"
//         }`}
//         onClick={handleCheck}
//       >
//         {done && <FiCheck className="text-white text-[10px]" />}
//       </div>
//       <div className="flex-1 max-w-[85%]">
//         <p
//           className={`text-xs text-[#3E5973] leading-tight break-words max-h-[2.8em] overflow-hidden ${
//             done ? "line-through opacity-70" : ""
//           }`}
//           style={{
//             display: "-webkit-box",
//             WebkitLineClamp: 2,
//             WebkitBoxOrient: "vertical",
//           }}
//         >
//           {text}
//         </p>
//       </div>
//     </label>
//   ) : null;
// };

// const RightBar = ({ isOpen, toggle }) => {
//   const [showHabitModal, setShowHabitModal] = useState(false);
//   const [showGoalModal, setShowGoalModal] = useState(false);
//   const [habits, setHabits] = useState([]);
//   const [goals, setGoals] = useState([]);

//   return (
//     <aside
//       className={`fixed top-0 right-0 h-full z-50 p-4 flex flex-col gap-6 items-center border-l border-transparent hover:border-[#3E5973] transition-all duration-300 ease-in-out ${
//         isOpen ? "w-[30rem] xl:w-[34rem] bg-[#DCEFFF]" : "w-[4rem] bg-[#D0E6F8]"
//       }`}
//     >
//       <div className="w-full flex justify-between items-center">
//         <button onClick={toggle} className="text-3xl text-[#3E5973]">
//           <FiSidebar />
//         </button>
//         {isOpen && <ThemeDropdown />}
//       </div>

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
//               style={{ width: "100%", maxWidth: "290px", aspectRatio: "20.5 / 10" }}
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

//           <div className="mt-6 w-full max-w-[360px] flex flex-row gap-4 items-start justify-between">
//             {[{ label: "Habits", tasks: habits, setTasks: setHabits, onOpen: setShowHabitModal }, { label: "Goals", tasks: goals, setTasks: setGoals, onOpen: setShowGoalModal }].map(({ label, tasks, setTasks, onOpen }) => (
//               <div key={label} className="flex-1">
//                 <h3 className="font-bold text-sm mb-1 text-center">➤ {label} ↗</h3>
//                 <div className="h-[160px] w-full max-w-[160px] relative border border-[#3E5973] rounded-lg px-2 py-1 overflow-hidden">
//                   {tasks.length === 0 ? (
//                     <div className="h-full flex justify-center items-center">
//                       <button onClick={() => onOpen(true)} className="text-[#3E5973] hover:text-[#1e2a35]">
//                         <FiPlus size={20} />
//                       </button>
//                     </div>
//                   ) : (
//                     <>
//                       <div className="flex items-center justify-end mb-1">
//                         <button onClick={() => onOpen(true)}>
//                           <FiPlus size={14} />
//                         </button>
//                       </div>
//                       <div className="overflow-y-auto max-h-[130px] pr-1 scrollbar-thin scrollbar-thumb-[#3E5973]/60 scrollbar-track-transparent">
//                         {tasks.map((t) => (
//                           <Task
//                             key={t.id}
//                             text={t.text}
//                             onRemove={() => setTasks((prev) => prev.filter((x) => x.id !== t.id))}
//                           />
//                         ))}
//                       </div>
//                     </>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {showHabitModal && (
//         <AddTaskModal
//           type="Habit"
//           onClose={() => setShowHabitModal(false)}
//           onAdd={(task) => setHabits([...habits, task])}
//         />
//       )}
//       {showGoalModal && (
//         <AddTaskModal
//           type="Goal"
//           onClose={() => setShowGoalModal(false)}
//           onAdd={(task) => setGoals([...goals, task])}
//         />
//       )}
//     </aside>
//   );
// };

// export default RightBar;
