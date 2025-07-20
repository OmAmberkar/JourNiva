import React, { useEffect, useState } from "react";
import MoodDropdown from "../components/Dashboard Components/MoodDropDown";
import TextareaAutosize from "react-textarea-autosize";
// import RightSideBar from "../components/Dashboard Components/RightSideBar";
import LeftSideBar from "../components/Dashboard Components/LeftSideBar";
import { FiSidebar } from "react-icons/fi";
import RightSideBar from "../components/Dashboard Components/RightSideBar";

/* Format JS Date → 08/07/2025 */
const formatDate = (dateObj) =>
  dateObj.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

/* Get day of the year (0-365) */
const getDayOfYear = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
};

/* Greeting messages (total 15 )*/
const greetings = [
  "How are you feeling today?",
  "How are you feeling today?",
  "what's your vibe?",
  "Mood check — where you at?",
  "Your thoughts matter. Share them.",
  "Pause. How’s your mind?",
  "What’s your heart saying?",
  "Let’s reflect.",
  "Any emotions visiting today?",
  "Ready to reflect today?",
  "Let’s see how today went.",
  "What’s on your mind today?",
  "Another day, another story.",
  "Time to write your heart out.",
  "Let the thoughts flow.",
];

const Dashboard = () => {
  const [user, setUser] = useState({ name: "username", avatarUrl: "" });
  const [today, setToday] = useState(formatDate(new Date()));
  const [greetingMessage, setGreetingMessage] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    // Load user from localStorage
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));

    // Set greeting based on day of year
    const index = getDayOfYear() % greetings.length;
    setGreetingMessage(greetings[index]);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#c3d7e8] text-[#3E5973] font-Livvic">
      {/* Sidebar */}
      <LeftSideBar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Sidebar toggle icon */}
      {!sidebarOpen && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 text-4xl text-[#3E5973]"
        >
          <FiSidebar />
        </button>
      )}

      {/* Main Content */}
      <div
        className={`transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-16"
        }`}
      >
        {/* ---------- Top bar ---------- */}
        <header className="flex items-center justify-between p-4 bg-[#c3d7e8]/60">
          <div className="flex items-center gap-4">
            {user.avatarUrl && (
              <img
                src={user.avatarUrl}
                alt="avatar"
                className="w-12 h-12 rounded-full object-cover ring-2 ring-[#3E5973]"
              />
            )}
            <h1 className="text-2xl md:text-3xl font-semibold">
              Hello {user.name}, {greetingMessage}
            </h1>
          </div>
          {/* <RightSideBar /> */}
        </header>

        <div className="mt-2 h-[1px] w-full bg-[#3E5973] mx-auto rounded-full" />

        {/* ---------- Journal sheet ---------- */}
        <main className="px-4 md:px-16 py-8">
          {/* Title */}
          <input
            type="text"
            placeholder="Journal Title"
            className="w-full text-3xl md:text-4xl font-semibold bg-transparent outline-none placeholder:text-3xl mb-6"
          />

          {/* Meta row: date + mood selector */}
          <div className="flex flex-col gap-4 mb-6">
            <p className="text-lg">
              <span className="font-semibold">Date:</span> {today}
            </p>

            <div className="flex items-center text-lg">
              <span>Your Mood:</span>
              <MoodDropdown />
            </div>
          </div>

          {/* Writing area */}
          <TextareaAutosize
            minRows={20}
            placeholder="Start Writing..."
            className="w-full text-xl bg-transparent outline-none leading-relaxed"
          />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

// import React, { useEffect, useState } from "react";
// import MoodDropdown from "../components/Dashboard Components/MoodDropDown";
// import TextareaAutosize from "react-textarea-autosize";
// import ThemeDropdown from "../components/Dashboard Components/ThemeDropDown";

// /* Format JS Date → 08/07/2025 */
// const formatDate = (dateObj) =>
//   dateObj.toLocaleDateString("en-GB", {
//     day: "2-digit",
//     month: "2-digit",
//     year: "numeric",
//   });

// /* Get day of the year (0-365) */
// const getDayOfYear = () => {
//   const now = new Date();
//   const start = new Date(now.getFullYear(), 0, 0);
//   const diff = now - start;
//   const oneDay = 1000 * 60 * 60 * 24;
//   return Math.floor(diff / oneDay);
// };

// /* Greeting messages (total 15 )*/
// const greetings = [
//   "How are you feeling today?",
//   "How are you feeling today?",
//   "what's your vibe?",
//   "Mood check — where you at?",
//   "Your thoughts matter. Share them.",
//   "Pause. How’s your mind?",
//   "What’s your heart saying?",
//   "Let’s reflect.",
//   "Any emotions visiting today?",
//   "Ready to reflect today?",
//   "Let’s see how today went.",
//   "What’s on your mind today?",
//   "Another day, another story.",
//   "Time to write your heart out.",
//   "Let the thoughts flow.",
// ];

// const Dashboard = () => {
//   const [user, setUser] = useState({ name: "username", avatarUrl: "" });
//   const [today, setToday] = useState(formatDate(new Date()));
//   const [greetingMessage, setGreetingMessage] = useState("");

//   useEffect(() => {
//     // Load user from localStorage
//     const stored = localStorage.getItem("user");
//     if (stored) setUser(JSON.parse(stored));

//     // Set greeting based on day of year
//     const index = getDayOfYear() % greetings.length;
//     setGreetingMessage(greetings[index]);
//   }, []);

//   return (
//     <div className="min-h-screen bg-[#c3d7e8] text-[#3E5973] font-Livvic">
//       {/* ---------- Top bar ---------- */}
//       <header className="flex items-center justify-between p-4 bg-[#c3d7e8]/60">
//         <div className="flex items-center gap-4">
//           {user.avatarUrl && (
//             <img
//               src={user.avatarUrl}
//               alt="avatar"
//               className="w-12 h-12 rounded-full object-cover ring-2 ring-[#3E5973]"
//             />
//           )}
//           <h1 className="text-2xl md:text-3xl font-semibold">
//             Hello {user.name}, {greetingMessage}
//           </h1>
//         </div>
//       </header>
//       <div className="mt-2 h-[1px] w-full bg-[#3E5973] mx-auto rounded-full" />

//       {/* ---------- Journal sheet ---------- */}
//       <main className="px-4 md:px-16 py-8">
//         {/* Title */}
//         <input
//           type="text"
//           placeholder="Journal Title"
//           className="w-full text-3xl md:text-4xl font-semibold bg-transparent outline-none placeholder:text-3xl mb-6"
//         />

//         {/* Meta row: date + mood selector */}
//         <div className="flex flex-col gap-4 mb-6">
//           <p className="text-lg">
//             <span className="font-semibold">Date:</span> {today}
//           </p>

//           <div className="flex items-center text-lg">
//             <span>Your Mood:</span>
//             <MoodDropdown />
//           </div>
//         </div>

//         {/* Writing area */}
//         <TextareaAutosize
//           minRows={20}
//           placeholder="Start Writing..."
//           className="w-full text-xl bg-transparent outline-none leading-relaxed"
//         />
//       </main>
//     </div>
//   );
// };

// export default Dashboard;
