// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import MoodDropdown from "../components/Dashboard Components/MoodDropDown";
import LeftBar from "../components/Dashboard Components/LeftBar";
import MobileLeftBar from "../components/Dashboard Components/MobileLeftBar";
import RightBar from "../components/Dashboard Components/RightBar";
import { Link } from "react-router-dom";
import { FiTrendingUp } from "react-icons/fi";
import { VisionBoardCanvas } from "../components/VisionBoard Components/VisionBoardCanvas";

const formatDate = (dateObj) =>
  dateObj.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

const getDayOfYear = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
};

const greetings = [
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
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  useEffect(() => {
    const handleResize = () => {
      const isLg = window.innerWidth >= 1024;
      setIsLargeScreen(isLg);
      setSidebarOpen(false);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));

    const index = getDayOfYear() % greetings.length;
    setGreetingMessage(greetings[index]);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#DCEFFF] text-[#3E5973] font-Livvic">
      {isLargeScreen ? (
        <LeftBar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      ) : (
        <MobileLeftBar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      )}

      <div
        className={`
          lg:flex transition-all duration-300
          ${rightSidebarOpen ? "lg:mr-[30rem] xl:mr-[34rem]" : "lg:mr-[4rem]"}
        `}
      >
        <div
          className={`
            flex-1 transition-all duration-300 px-4 sm:px-6 md:px-10 lg:px-16 py-4
            ${sidebarOpen && isLargeScreen ? "lg:ml-64" : "lg:ml-0"}
          `}
        >
          <header className="flex flex-col sm:flex-row items-center justify-between ml-5 gap-4 bg-[#DCEFFF]/60 p-1 rounded-md">
            <div className="flex items-center gap-4 text-center sm:text-left">
              {user.avatarUrl && (
                <img
                  src={user.avatarUrl}
                  alt="avatar"
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-[#3E5973]"
                />
              )}
              <h1 className="text-2xl sm:text-3xl font-semibold">
                Hello {user.name}, {greetingMessage}
              </h1>
            </div>
          </header>

          <div className="mt-4 h-[1px] w-full bg-[#3E5973] rounded-full" />

          <main className="mt-6 space-y-6">
            <input
              type="text"
              placeholder="Journal Title"
              className="w-full text-2xl sm:text-3xl md:text-4xl font-semibold bg-transparent outline-none placeholder:text-2xl sm:placeholder:text-3xl"
            />

            <div className="flex flex-col gap-2 text-base sm:text-lg">
              <p>
                <span className="font-semibold">Date:</span> {today}
              </p>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                <span>Your Mood:</span>
                <MoodDropdown />
              </div>
            </div>

            <textarea
              placeholder="Start Writing..."
              className="w-full h-[60vh] text-lg sm:text-xl bg-transparent outline-none leading-relaxed resize-none"
            />

            {/* Clone of RightBar content for small screens */}
            {!isLargeScreen && rightSidebarOpen && (
              <div className="mt-10 px-2 sm:px-6 md:px-10 text-[#3E5973]">
                <Link
                  to="/visionboard"
                  className="flex items-center gap-3 text-xl font-semibold hover:text-[#1e2a35] transition mb-4"
                >
                  <FiTrendingUp className="w-6 h-6" />
                  <span>Vision Board</span>
                </Link>

                <div className="relative overflow-hidden rounded-xl border border-[#3E5973] bg-white w-full aspect-[16/10] mb-6">
                  <div
                    className="absolute top-0 left-0"
                    style={{
                      transform: "scale(0.321)",
                      transformOrigin: "top left",
                      width: "1440px",
                      height: "900px",
                      pointerEvents: "none",
                    }}
                  >
                    <VisionBoardCanvas
                      elements={[
                        { id: 1, type: "text", content: "Sample Text" },
                        {
                          id: 2,
                          type: "image",
                          url: "https://via.placeholder.com/220x160",
                        },
                      ]}
                      onRemove={() => {}}
                      previewMode
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-6 justify-between w-full">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2 text-center">
                      ➤ Habits
                    </h3>
                    <div className="min-h-[160px] border border-transparent hover:border-[#3E5973] rounded-lg px-2 py-2">
                      {/* Show habits here or placeholder */}
                      <p className="text-center text-sm opacity-50">
                        No habits added
                      </p>
                    </div>
                  </div>

                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2 text-center">
                      ➤ Goals
                    </h3>
                    <div className="min-h-[160px] border border-transparent hover:border-[#3E5973] rounded-lg px-2 py-2">
                      {/* Show goals here or placeholder */}
                      <p className="text-center text-sm opacity-50">
                        No goals added
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>

        {isLargeScreen && (
          <RightBar
            isOpen={rightSidebarOpen}
            toggle={() => setRightSidebarOpen((prev) => !prev)}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;

// import React, { useEffect, useState } from "react";
// import MoodDropdown from "../components/Dashboard Components/MoodDropDown";
// import LeftBar from "../components/Dashboard Components/LeftBar";
// import MobileLeftBar from "../components/Dashboard Components/MobileLeftBar";
// import RightBar from "../components/Dashboard Components/RightBar";

// // Helper to format date
// const formatDate = (dateObj) =>
//   dateObj.toLocaleDateString("en-GB", {
//     day: "2-digit",
//     month: "2-digit",
//     year: "numeric",
//   });

// const getDayOfYear = () => {
//   const now = new Date();
//   const start = new Date(now.getFullYear(), 0, 0);
//   const diff = now - start;
//   const oneDay = 1000 * 60 * 60 * 24;
//   return Math.floor(diff / oneDay);
// };

// // Random greeting list
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

//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);
//   const [rightSidebarOpen, setRightSidebarOpen] = useState(true); // default: open

//   const toggleSidebar = () => setSidebarOpen((prev) => !prev);

//   useEffect(() => {
//     const handleResize = () => {
//       const isLg = window.innerWidth >= 1024;
//       setIsLargeScreen(isLg);
//       setSidebarOpen(false);
//     };

//     window.addEventListener("resize", handleResize);
//     handleResize();

//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   useEffect(() => {
//     const stored = localStorage.getItem("user");
//     if (stored) setUser(JSON.parse(stored));

//     const index = getDayOfYear() % greetings.length;
//     setGreetingMessage(greetings[index]);
//   }, []);

//   return (
//     <div className="relative min-h-screen bg-[#DCEFFF] text-[#3E5973] font-Livvic">
//       {/* Left Sidebar */}
//       {isLargeScreen ? (
//         <LeftBar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
//       ) : (
//         <MobileLeftBar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
//       )}

//       {/* Dashboard Content & RightBar */}
//       <div
//   className={`
//     lg:flex transition-all duration-300
//     ${rightSidebarOpen ? "lg:mr-[30rem] xl:mr-[34rem]" : "lg:mr-[4rem]"}
//   `}
// >

//         {/* Main Content */}
//         <div
//           className={`
//             flex-1 transition-all duration-300 px-4 sm:px-6 md:px-10 lg:px-16 py-4
//             ${sidebarOpen && isLargeScreen ? "lg:ml-64" : "lg:ml-0"}
//           `}
//         >
//           {/* Header */}
//           <header className="flex flex-col sm:flex-row items-center justify-between ml-5 gap-4 bg-[#DCEFFF]/60 p-1 rounded-md">
//             <div className="flex items-center gap-4 text-center sm:text-left">
//               {user.avatarUrl && (
//                 <img
//                   src={user.avatarUrl}
//                   alt="avatar"
//                   className="w-12 h-12 rounded-full object-cover ring-2 ring-[#3E5973]"
//                 />
//               )}
//               <h1 className="text-2xl sm:text-3xl font-semibold">
//                 Hello {user.name}, {greetingMessage}
//               </h1>
//             </div>
//           </header>

//           <div className="mt-4 h-[1px] w-full bg-[#3E5973] rounded-full" />

//           {/* Journal Content */}
//           <main className="mt-6 space-y-6">
//             <input
//               type="text"
//               placeholder="Journal Title"
//               className="w-full text-2xl sm:text-3xl md:text-4xl font-semibold bg-transparent outline-none placeholder:text-2xl sm:placeholder:text-3xl"
//             />

//             <div className="flex flex-col gap-2 text-base sm:text-lg">
//               <p>
//                 <span className="font-semibold">Date:</span> {today}
//               </p>

//               <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
//                 <span>Your Mood:</span>
//                 <MoodDropdown />
//               </div>
//             </div>

//             <textarea
//   placeholder="Start Writing..."
//   className="w-full h-[60vh] text-lg sm:text-xl bg-transparent outline-none leading-relaxed resize-none"
// />

//           </main>
//         </div>

//         {/* Right Sidebar */}
//         {isLargeScreen && (
//           <RightBar
//             isOpen={rightSidebarOpen}
//             toggle={() => setRightSidebarOpen((prev) => !prev)}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
