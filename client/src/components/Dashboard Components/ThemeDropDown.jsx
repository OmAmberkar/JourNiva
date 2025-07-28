// import React, { useState, useRef, useEffect } from "react";

// const themes = [
//   { name: "Blue", description: "Calm & Clear" },
//   { name: "Green", description: "Soft & Peaceful" },
//   { name: "Peach", description: "Light & Happy" },
//   { name: "Purple", description: "Bold & Bright" },
//   { name: "Pink", description: "Loved & Gentle" },
// ];

// const ThemeDropdown = () => {
//   const [open, setOpen] = useState(false);
//   const menuRef = useRef(null);

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (menuRef.current && !menuRef.current.contains(e.target)) {
//         setOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleSelect = (theme) => {
//     console.log("Selected theme:", theme);
//     setOpen(false);
//   };

//   return (
//     <div ref={menuRef} className="relative inline-block text-center">
//       <button
//         onClick={() => setOpen(!open)}
//         className="bg-[var(--color-dark)] text-[#c3d7e8] px-4 py-2 rounded-2xl cursor-pointer"
//       >
//         Your Mood, Your Theme
//       </button>

//       {open && (
//         <div className="absolute z-20 mt-4 min-w-full bg-[#C7D7EC] border border-[var(--color-dark)] rounded-lg shadow-lg p-2 ">
//           {themes.map((theme) => (
//             <div
//               key={theme.name}
//               onClick={() => handleSelect(theme)}
//               className="px-1 py-2 text-[var(--color-dark)] cursor-pointer hover:bg-[var(--color-dark)] hover:text-white rounded-md"
//             >
//               <span className="font-medium">{theme.name}</span> –{" "}
//               <span className="italic">{theme.description}</span>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ThemeDropdown;

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
    const themeClass = `theme-${theme.name.toLowerCase()}`;

    // Remove old theme
    document.body.classList.forEach((cls) => {
      if (cls.startsWith("theme-")) {
        document.body.classList.remove(cls);
      }
    });

    // Add new theme
    document.body.classList.add(themeClass);
    console.log("Selected theme:", themeClass);
    setOpen(false);
  };

  return (
    <div ref={menuRef} className="relative inline-block text-center">
      <button
        onClick={() => setOpen(!open)}
        className="bg-[var(--color-dark)] text-[var(--color-background)] px-4 py-2 rounded-2xl cursor-pointer"
      >
        Your Mood, Your Theme
      </button>

      {open && (
        <div className="absolute z-20 mt-4 min-w-full bg-[var(--color-drop)] border border-[var(--color-dark)] rounded-lg shadow-lg p-2 ">
          {themes.map((theme) => (
            <div
              key={theme.name}
              onClick={() => handleSelect(theme)}
              className="px-1 py-2 text-[var(--color-dark)] cursor-pointer hover:bg-[var(--color-dark)] hover:text-white rounded-md"
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
