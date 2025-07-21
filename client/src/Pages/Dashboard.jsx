import React, { useEffect, useState } from "react";
import MoodDropdown from "../components/Dashboard Components/MoodDropDown";
import TextareaAutosize from "react-textarea-autosize";
import LeftBar from "../components/Dashboard Components/LeftBar";
import MobileLeftBar from "../components/Dashboard Components/MobileLeftBar";
import RightBar from "../components/Dashboard Components/RightBar";

// Format date to DD/MM/YYYY
const formatDate = (dateObj) =>
  dateObj.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

// Day of the year
const getDayOfYear = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
};

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
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  useEffect(() => {
    const handleResize = () => {
      const isLg = window.innerWidth >= 1024;
      setIsLargeScreen(isLg);
      setSidebarOpen(false); // Reset on resize
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
      {/* Sidebars */}
      {isLargeScreen ? (
        <LeftBar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      ) : (
        <MobileLeftBar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      )}

      {/* ✅ Dashboard Layout: Left (main content) + RightBar (lg only) */}
      <div className="lg:flex">
        {/* ---------- Main Content Area ---------- */}
        <div
          className={`flex-1 transition-all duration-300 px-4 sm:px-6 md:px-10 lg:px-16 py-4 ${
            sidebarOpen && isLargeScreen ? "lg:ml-64" : "lg:ml-0"
          }`}
        >
          {/* Top Bar */}
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

          {/* Divider */}
          <div className="mt-4 h-[1px] w-full bg-[#3E5973] rounded-full" />

          {/* Journal Area */}
          <main className="mt-6 space-y-6">
            {/* Title Input */}
            <input
              type="text"
              placeholder="Journal Title"
              className="w-full text-2xl sm:text-3xl md:text-4xl font-semibold bg-transparent outline-none placeholder:text-2xl sm:placeholder:text-3xl"
            />

            {/* Meta Info */}
            <div className="flex flex-col gap-2 text-base sm:text-lg">
              <p>
                <span className="font-semibold">Date:</span> {today}
              </p>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                <span>Your Mood:</span>
                <MoodDropdown />
              </div>
            </div>

            {/* Writing Box */}
            <TextareaAutosize
              minRows={20}
              placeholder="Start Writing..."
              className="w-full text-lg sm:text-xl bg-transparent outline-none leading-relaxed"
            />
          </main>
        </div>

        {/* ---------- RightBar (Only on large screens) ---------- */}
        <div className="hidden w-100 lg:block border-l border-transparent hover:border-[#3E5973]/40 transition">
          <RightBar />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

// import React, { useEffect, useState } from "react";
// import MoodDropdown from "../components/Dashboard Components/MoodDropDown";
// import TextareaAutosize from "react-textarea-autosize";
// import LeftBar from "../components/Dashboard Components/LeftBar";
// import MobileLeftBar from "../components/Dashboard Components/MobileLeftBar";

// // Format JS Date → 08/07/2025
// const formatDate = (dateObj) =>
//   dateObj.toLocaleDateString("en-GB", {
//     day: "2-digit",
//     month: "2-digit",
//     year: "numeric",
//   });

// // Get day of the year (0-365)
// const getDayOfYear = () => {
//   const now = new Date();
//   const start = new Date(now.getFullYear(), 0, 0);
//   const diff = now - start;
//   const oneDay = 1000 * 60 * 60 * 24;
//   return Math.floor(diff / oneDay);
// };

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

//   const toggleSidebar = () => setSidebarOpen((prev) => !prev);

//   // Handle screen size changes
//   useEffect(() => {
//     const handleResize = () => {
//       const isLg = window.innerWidth >= 1024;
//       setIsLargeScreen(isLg);
//       setSidebarOpen(false); // close sidebar when switching screen size
//     };

//     window.addEventListener("resize", handleResize);
//     handleResize();

//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // Load user & greeting on mount
//   useEffect(() => {
//     const stored = localStorage.getItem("user");
//     if (stored) setUser(JSON.parse(stored));

//     const index = getDayOfYear() % greetings.length;
//     setGreetingMessage(greetings[index]);
//   }, []);

//   return (
//     <div className="relative min-h-screen bg-[#DCEFFF] text-[#3E5973] font-Livvic">
//       {/* ---------- Sidebars ---------- */}
//       {isLargeScreen ? (
//         <LeftBar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
//       ) : (
//         <MobileLeftBar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
//       )}

//       {/* ---------- Main content wrapper ---------- */}
//       <div
//         className={`transition-all duration-300 sm:px-6 md:px-10 lg:px-16 py-4 ${
//           sidebarOpen ? "lg:ml-55" : "lg:ml-0"
//         }`}
//       >
//         {/* ---------- Top bar ---------- */}
//         <header className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#DCEFFF]/60 p-4 rounded-md">
//           <div className="flex items-center gap-4 text-center sm:text-left">
//             {user.avatarUrl && (
//               <img
//                 src={user.avatarUrl}
//                 alt="avatar"
//                 className="w-12 h-12 rounded-full object-cover ring-2 ring-[#3E5973]"
//               />
//             )}
//             <h1 className="text-2xl sm:text-3xl font-semibold">
//               Hello {user.name}, {greetingMessage}
//             </h1>
//           </div>
//         </header>

//         {/* Divider line */}
//         <div className="mt-4 h-[1px] lg:w-full bg-[#3E5973] mx-auto rounded-full" />

//         {/* ---------- Journal sheet ---------- */}
//         <main className="mt-6 ml-2 mr-2 space-y-6">
//           {/* Journal title */}
//           <input
//             type="text"
//             placeholder="Journal Title"
//             className="w-full text-2xl sm:text-3xl md:text-4xl font-semibold bg-transparent outline-none placeholder:text-2xl sm:placeholder:text-3xl"
//           />

//           {/* Meta row */}
//           <div className="flex flex-col gap-1 text-base sm:text-lg">
//             <p>
//               <span className="font-semibold">Date:</span> {today}
//             </p>

//             <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
//               <span>Your Mood:</span>
//               <MoodDropdown />
//             </div>
//           </div>

//           {/* Writing area */}
//           <TextareaAutosize
//             minRows={20}
//             placeholder="Start Writing..."
//             className="w-full text-lg sm:text-xl bg-transparent outline-none leading-relaxed scroll-none"
//           />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

// import React, { useEffect, useState } from "react";
// import MoodDropdown from "../components/Dashboard Components/MoodDropDown";
// import TextareaAutosize from "react-textarea-autosize";
// import LeftBar from "../components/Dashboard Components/LeftBar";
// import MobileLeftBar from "../components/Dashboard Components/MobileLeftBar";

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
//   const [sidebarOpen, setSidebarOpen] = useState(false); // ✅ default open on large screens
//   const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024); // lg = 1024px

//   const toggleSidebar = () => setSidebarOpen((prev) => !prev);

//   // ✅ Handle screen resize
//   useEffect(() => {
//     const handleResize = () => {
//       const isLg = window.innerWidth >= 1024;
//       setIsLargeScreen(isLg);
//       if (!isLg) setSidebarOpen(false); // auto close on small
//       else setSidebarOpen(false); // auto open on large
//     };

//     window.addEventListener("resize", handleResize);
//     handleResize(); // initial call

//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   useEffect(() => {
//     const stored = localStorage.getItem("user");
//     if (stored) setUser(JSON.parse(stored));

//     const index = getDayOfYear() % greetings.length;
//     setGreetingMessage(greetings[index]);
//   }, []);

//   return (
//     <div className="relative min-h-screen bg-[#DCEFFF] text-[#3E5973] font-Livvic ">
//       {/* Sidebar visible only on lg+ */}
//       <div className="animation ease-in-out duration-300">
//         {isLargeScreen && (
//           <LeftBar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
//         )}
//       </div>

//       {/* Wrapper that shifts right when sidebar is open */}
//       <div
//         className={`transition-all duration-300  sm:px-6 md:px-10 lg:px-16 py-4 ${
//           sidebarOpen ? "lg:ml-55" : "lg:ml-0"
//         }`}
//       >
//         {/* ---------- Top bar ---------- */}
//         <header className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#DCEFFF]/60 p-4 rounded-md">
//           <div className="flex items-center gap-4 text-center sm:text-left">
//             {user.avatarUrl && (
//               <img
//                 src={user.avatarUrl}
//                 alt="avatar"
//                 className="w-12 h-12 rounded-full object-cover ring-2 ring-[#3E5973]"
//               />
//             )}
//             <h1 className="text-2xl sm:text-3xl font-semibold">
//               Hello {user.name}, {greetingMessage}
//             </h1>
//           </div>
//         </header>

//         <div className="mt-4 h-[1px] lg:w-full bg-[#3E5973] mx-auto rounded-full" />

//         {/* ---------- Journal sheet ---------- */}
//         <main className="mt-6 ml-2 mr-2 space-y-6">
//           {/* Title */}
//           <input
//             type="text"
//             placeholder="Journal Title"
//             className="w-full text-2xl sm:text-3xl md:text-4xl font-semibold bg-transparent outline-none placeholder:text-2xl sm:placeholder:text-3xl"
//           />

//           {/* Meta row */}
//           <div className="flex flex-col gap-1 text-base sm:text-lg">
//             <p>
//               <span className="font-semibold">Date:</span> {today}
//             </p>

//             <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
//               <span>Your Mood:</span>
//               <MoodDropdown />
//             </div>
//           </div>

//           {/* Writing area */}
//           <TextareaAutosize
//             minRows={20}
//             placeholder="Start Writing..."
//             className="w-full text-lg sm:text-xl bg-transparent outline-none leading-relaxed scroll-none"
//           />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

// // // src/pages/Dashboard.jsx
// // import React, { useEffect, useState } from "react";
// // import MoodDropdown from "../components/Dashboard Components/MoodDropDown";
// // import TextareaAutosize from "react-textarea-autosize";
// // import LeftBar from "../components/Dashboard Components/LeftBar";

// // /* Format JS Date → 08/07/2025 */
// // const formatDate = (dateObj) =>
// //   dateObj.toLocaleDateString("en-GB", {
// //     day: "2-digit",
// //     month: "2-digit",
// //     year: "numeric",
// //   });

// // /* Get day of the year (0-365) */
// // const getDayOfYear = () => {
// //   const now = new Date();
// //   const start = new Date(now.getFullYear(), 0, 0);
// //   const diff = now - start;
// //   const oneDay = 1000 * 60 * 60 * 24;
// //   return Math.floor(diff / oneDay);
// // };

// // const greetings = [
// //   "How are you feeling today?",
// //   "How are you feeling today?",
// //   "what's your vibe?",
// //   "Mood check — where you at?",
// //   "Your thoughts matter. Share them.",
// //   "Pause. How’s your mind?",
// //   "What’s your heart saying?",
// //   "Let’s reflect.",
// //   "Any emotions visiting today?",
// //   "Ready to reflect today?",
// //   "Let’s see how today went.",
// //   "What’s on your mind today?",
// //   "Another day, another story.",
// //   "Time to write your heart out.",
// //   "Let the thoughts flow.",
// // ];

// // const Dashboard = () => {
// //   const [user, setUser] = useState({ name: "username", avatarUrl: "" });
// //   const [today, setToday] = useState(formatDate(new Date()));
// //   const [greetingMessage, setGreetingMessage] = useState("");
// //   const [sidebarOpen, setSidebarOpen] = useState(false);

// //   const toggleSidebar = () => setSidebarOpen((prev) => !prev);

// //   useEffect(() => {
// //     const stored = localStorage.getItem("user");
// //     if (stored) setUser(JSON.parse(stored));

// //     const index = getDayOfYear() % greetings.length;
// //     setGreetingMessage(greetings[index]);
// //   }, []);

// //   return (
// //     <div className="relative min-h-screen bg-[#DCEFFF] text-[#3E5973] font-Livvic px-4 sm:px-6 md:px-10 lg:px-16 py-4">
// //       {/* Sidebar Toggle */}
// //       <LeftBar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

// //       {/* ---------- Top bar ---------- */}
// //       <header className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#DCEFFF]/60 p-4 rounded-md">
// //         <div className="flex items-center gap-4 text-center sm:text-left">
// //           {user.avatarUrl && (
// //             <img
// //               src={user.avatarUrl}
// //               alt="avatar"
// //               className="w-12 h-12 rounded-full object-cover ring-2 ring-[#3E5973]"
// //             />
// //           )}
// //           <h1 className="text-2xl sm:text-3xl font-semibold">
// //             Hello {user.name}, {greetingMessage}
// //           </h1>
// //         </div>
// //       </header>

// //       <div className="mt-4 h-[1px] w-full bg-[#3E5973] mx-auto rounded-full" />

// //       {/* ---------- Journal sheet ---------- */}
// //       <main className="mt-6 space-y-6">
// //         {/* Title */}
// //         <input
// //           type="text"
// //           placeholder="Journal Title"
// //           className="w-full text-2xl sm:text-3xl md:text-4xl font-semibold bg-transparent outline-none placeholder:text-2xl sm:placeholder:text-3xl"
// //         />

// //         {/* Meta row */}
// //         <div className="flex flex-col gap-4 text-base sm:text-lg">
// //           <p>
// //             <span className="font-semibold">Date:</span> {today}
// //           </p>

// //           <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
// //             <span>Your Mood:</span>
// //             <MoodDropdown />
// //           </div>
// //         </div>

// //         {/* Writing area */}
// //         <TextareaAutosize
// //           minRows={20}
// //           placeholder="Start Writing..."
// //           className="w-full text-lg sm:text-xl bg-transparent outline-none leading-relaxed scroll-none"
// //         />
// //       </main>
// //     </div>
// //   );
// // };

// // export default Dashboard;

// return (
//     <div className="relative min-h-screen bg-[#DCEFFF] text-[#3E5973] font-Livvic">
//       {/* Sidebars */}
//       {isLargeScreen ? (
//         <LeftBar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
//       ) : (
//         <MobileLeftBar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
//       )}

//       {/* Main content wrapper */}
//       <div
//         className={`transition-all duration-300 px-4 sm:px-6 md:px-10 lg:px-16 py-4 ${
//           sidebarOpen && isLargeScreen ? "lg:ml-64" : "lg:ml-0"
//         }`}
//       >
//         {/* Top Bar */}
//         <header className="flex flex-col sm:flex-row items-center justify-between mt-5 gap-4 bg-[#DCEFFF]/60 p-4 rounded-md">
//           <div className="flex items-center gap-4 text-center sm:text-left">
//             {user.avatarUrl && (
//               <img
//                 src={user.avatarUrl}
//                 alt="avatar"
//                 className="w-12 h-12 rounded-full object-cover ring-2 ring-[#3E5973]"
//               />
//             )}
//             <h1 className="text-2xl sm:text-3xl font-semibold">
//               Hello {user.name}, {greetingMessage}
//             </h1>
//           </div>
//         </header>

//         {/* Divider */}
//         <div className="mt-4 h-[1px] w-full bg-[#3E5973] rounded-full" />

//         {/* Journal Area */}
//         <main className="mt-6 space-y-6">
//           {/* Title Input */}
//           <input
//             type="text"
//             placeholder="Journal Title"
//             className="w-full text-2xl sm:text-3xl md:text-4xl font-semibold bg-transparent outline-none placeholder:text-2xl sm:placeholder:text-3xl"
//           />

//           {/* Meta Info */}
//           <div className="flex flex-col gap-2 text-base sm:text-lg">
//             <p>
//               <span className="font-semibold">Date:</span> {today}
//             </p>

//             <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
//               <span>Your Mood:</span>
//               <MoodDropdown />
//             </div>
//           </div>

//           {/* Writing Box */}
//           <TextareaAutosize
//             minRows={20}
//             placeholder="Start Writing..."
//             className="w-full text-lg sm:text-xl bg-transparent outline-none leading-relaxed"
//           />
//         </main>
//       </div>
//     </div>
//   );
