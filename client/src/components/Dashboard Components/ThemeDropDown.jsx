import React, { useState, useRef, useEffect } from "react";

const themes = [
  { name: "Blue", description: "Calm & Clear" },
  { name: "Green", description: "Soft & Peaceful" },
  { name: "Peach", description: "Light & Happy" },
  { name: "Purple", description: "Bold & Bright" },
  { name: "Pink", description: "Loved & Gentle" },
];

const ThemeDropdown = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (theme) => {
    console.log("Selected theme:", theme);
    setOpen(false);
  };

  return (
    <div ref={menuRef} className="relative inline-block text-left">
      <button
        onClick={() => setOpen(!open)}
        className="bg-[#3E5973] text-[#c3d7e8] px-4 py-2 rounded-full cursor-pointer"
      >
        Your Mood, Your Theme
      </button>

      {open && (
        <div className="absolute z-20 mt-4 min-w-full bg-[#C7D7EC] border border-[#3E5973] rounded-lg shadow-lg p-2 ">
          {themes.map((theme) => (
            <div
              key={theme.name}
              onClick={() => handleSelect(theme)}
              className="px-1 py-2 text-[#3E5973] cursor-pointer hover:bg-[#3E5973] hover:text-white rounded-md"
            >
              <span className="font-medium">{theme.name}</span> –{" "}
              <span className="italic">{theme.description}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThemeDropdown;
