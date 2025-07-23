import React, { useEffect, useState } from "react";
import MoodDropdown from "../components/Dashboard Components/MoodDropDown";
import LeftBar from "../components/Dashboard Components/LeftBar";
import MobileLeftBar from "../components/Dashboard Components/MobileLeftBar";
import RightBar from "../components/Dashboard Components/RightBar";

// Helper to format date
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

// Random greeting list
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
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true); // default: open

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
      {/* Left Sidebar */}
      {isLargeScreen ? (
        <LeftBar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      ) : (
        <MobileLeftBar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      )}

      {/* Dashboard Content & RightBar */}
      <div
  className={`
    lg:flex transition-all duration-300
    ${rightSidebarOpen ? "lg:mr-[30rem] xl:mr-[34rem]" : "lg:mr-[4rem]"}
  `}
>

        {/* Main Content */}
        <div
          className={`
            flex-1 transition-all duration-300 px-4 sm:px-6 md:px-10 lg:px-16 py-4
            ${sidebarOpen && isLargeScreen ? "lg:ml-64" : "lg:ml-0"}
          `}
        >
          {/* Header */}
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

          {/* Journal Content */}
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

          </main>
        </div>

        {/* Right Sidebar */}
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
