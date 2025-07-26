import React, { useState, useRef, useEffect } from "react";

const moodOptions = [
  { value: "smile", icon: "/src/assets/blue_mood.png" },
  { value: "wink", icon: "/src/assets/green_mood.png" },
  { value: "happy", icon: "/src/assets/peach_mood.png" },
  { value: "neutral", icon: "/src/assets/purple_mood.png" },
  { value: "sad", icon: "/src/assets/pink_mood.png" },
];

const MoodDropdown = ({onMoodSelect}) => {
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
    onMoodSelect(mood) // extra to notify the parent code as this is the child component
    setIsOpen(false);
  };

  return (
    <div ref={menuRef} className="relative inline-block">
      {/* Trigger button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 p-2 bg-[#D0E6F8]/10 underline cursor-pointer"
      >
        {selectedMood ? (
          <img
            src={selectedMood.icon}
            alt={selectedMood.value}
            className="w-10 h-10"
          />
        ) : (
          "- Choose -"
        )}
      </button>

      {/* Dropdown list */}
      {isOpen && (
        <div className="absolute z-20 mt-2 min-w-full bg-[#C7D7EC] border border-[#3E5973] rounded-md shadow-md">
          {moodOptions.map((mood) => (
            <div
              key={mood.value}
              onClick={() => handleSelect(mood)}
              className="flex justify-center items-center p-2 cursor-pointer hover:bg-[#3E5973]"
            >
              <img src={mood.icon} alt={mood.value} className="w-10 h-10" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MoodDropdown;
