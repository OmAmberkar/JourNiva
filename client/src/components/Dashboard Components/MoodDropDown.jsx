import React, { useState, useRef, useEffect } from "react";

const moodOptions = [
  { value: "sad", label: "Sad", icon: "/src/assets/blue_mood.png" },
  { value: "Angry", label: "Angry", icon: "/src/assets/green_mood.png" },
  { value: "happy", label: "Happy", icon: "/src/assets/peach_mood.png" },
  {
    value: "chill",
    label: "Chill",
    icon: "/src/assets/purple_mood.png",
  },
  { value: "love", label: "Love", icon: "/src/assets/pink_mood.png" },
];

const MoodDropdown = ({ onMoodSelect }) => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    window.addEventListener("mousedown", handleOutside);
    return () => window.removeEventListener("mousedown", handleOutside);
  }, []);

  const handleSelect = (mood) => {
    setSelectedMood(mood);
    if (onMoodSelect) {
      onMoodSelect(mood);
    }
    setIsOpen(false);
  };

  // const handleSelect = (mood) => {
  //   setSelectedMood(mood);
  //   onMoodSelect(mood);
  //   setIsOpen(false);

  // };

  return (
    <div ref={menuRef} className="relative inline-block">
      {/* Trigger button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 p-2 bg-[var(--color-background)]/10 cursor-pointer"
      >
        {selectedMood ? (
          <div className="flex items-center gap-2">
            <img
              src={selectedMood.icon}
              alt={selectedMood.value}
              className="w-8 h-8"
            />
            <span className="text-sm font-medium">{selectedMood.label}</span>
          </div>
        ) : (
          <span className="text-md text-gray-500">- Choose -</span>
        )}
      </button>

      {/* Dropdown list */}
      {isOpen && (
        <div className="absolute z-20 mt-2 w-28 bg-[var(--color-drop)] border border-[var(--color-dark)] rounded-md shadow-md">
          {moodOptions.map((mood) => (
            <div
              key={mood.value}
              onClick={() => handleSelect(mood)}
              className="flex items-center gap-3 p-2 cursor-pointer hover:bg-[var(--color-dark)] hover:text-white rounded-sm"
            >
              <img
                src={mood.icon}
                alt={mood.value}
                className="w-8 h-8 shrink-0"
              />
              <span className="text-sm font-medium truncate">{mood.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MoodDropdown;
