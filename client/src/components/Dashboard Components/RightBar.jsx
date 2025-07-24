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
            <div className="relative overflow-hidden rounded-xl border border-[#3E5973] bg-white w-full aspect-[16/10]">
              {/* Scaled canvas inside */}
              <div
                className="absolute top-0 left-0"
                style={{
                  transform: "scale(0.321)", // adjust as needed
                  transformOrigin: "top left",
                  width: "1440px", // matches full canvas width
                  height: "900px",
                  pointerEvents: "none", // disable interaction
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

                <div className="h-[160px] w-full border border-transparent hover:border-[#3E5973] rounded-lg px-2 py-2 overflow-hidden transition-all duration-300">
                  {tasks.length === 0 ? (
                    <div className="h-full flex justify-center items-center">
                      <button
                        onClick={() => onOpen(true)}
                        className="text-[#3E5973] hover:text-[#1e2a35] cursor-pointer"
                      >
                        <FiPlus
                          size={24}
                          className="opacity-30 transition-opacity duration-300"
                        />
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-end mb-2">
                        <button
                          onClick={() => onOpen(true)}
                          className="cursor-pointer"
                        >
                          <FiPlus
                            size={16}
                            className="opacity-30 transition-opacity duration-300"
                          />
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
