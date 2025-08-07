/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import MoodDropdown from "../components/Dashboard Components/MoodDropDown";
import LeftBar from "../components/Dashboard Components/LeftBar";
import MobileLeftBar from "../components/Dashboard Components/MobileLeftBar";
import RightBar from "../components/Dashboard Components/RightBar";
import { Link, useLocation } from "react-router-dom";
import { FiTrendingUp } from "react-icons/fi";
import { VisionBoardCanvas } from "../components/VisionBoard Components/VisionBoardCanvas";
import { useNavigate } from "react-router-dom";
import { createJournal } from "../services/journalServices";
import { toast } from "sonner";

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
  const loc = useLocation();
  const passedUser = loc.state?.user;

  const [user, setUser] = useState(() => {
    const fromState = loc.state?.user;
    if (fromState) return fromState;

    try {
      const stored = localStorage.getItem("user");
      if (stored) return JSON.parse(stored);
    } catch (err) {
      console.warn("Failed to parse user from localStorage");
    }

    return { name: "Master", avatarUrl: "" };
  });

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
    // try {
    //   const stored = localStorage.getItem("user");
    //   if (stored) {
    //     const parsed = JSON.parse(stored);
    //     if (parsed?.name) {
    //       setUser(parsed);
    //     } else {
    //       toast.warning("User data incomplete. Please re-login.");
    //       navigate("/getstarted");
    //     }
    //   } else {
    //     toast.warning("User not found. Redirecting to login.");
    //     navigate("/getstarted");
    //   }
    // } catch (error) {
    //   console.error("Error parsing user:", error);
    //   toast.error("Corrupted user data. Please re-login.");
    //   localStorage.removeItem("user");
    //   navigate("/getstarted");
    // }

    const index = getDayOfYear() % greetings.length;
    setGreetingMessage(greetings[index]);
  }, []);

  const navigate = useNavigate();
  // useEffect(() => {
  //   const token = localStorage.getItem("accessToken");
  //   if (!token) {
  //     navigate("/getstarted");
  //     return;
  //   } // or a protected route pattern
  // }, [navigate]);

  const handleMoodSelect = (mood) => {
    setMood(mood.value);
    const moodToThemeMap = {
      sad: "theme-blue",
      Angry: "theme-green",
      happy: "theme-peach",
      chill: "theme-purple",
      love: "theme-pink",
    };

    const themeClass = moodToThemeMap[mood.value];

    // Remove previous theme classes
    document.documentElement.classList.remove(
      "theme-blue",
      "theme-green",
      "theme-peach",
      "theme-purple",
      "theme-pink"
    );

    // Apply new one
    if (themeClass) {
      document.documentElement.classList.add(themeClass);
    }
  };

  //connecting the backend to the dashboard
  const [title, setTitle] = useState("");
  const [mood, setMood] = useState("");
  const [content, setContent] = useState("");
  const [iconUrl, setIconUrl] = useState("");
  const [location, setLocation] = useState("");
  const [profileUpdate, setProfileUpdate] = useState(false);

  const handleSave = async () => {
    if (!mood) {
      toast.error("Please select a mood before saving.");
      return;
    }

    const journalData = {
      title: title.trim(),
      date: today,
      mood: mood,
      content: content.trim(),
      iconUrl: iconUrl.trim(),
      location: location.trim(),
    };

    try {
      const res = await createJournal(journalData);
      // if(res.status===201)
      {
        toast.success(res.message || "Journal created successfully");
        console.log("Journal data saved:", res.data);
        setTitle("");
        setContent("");
        setLocation("");
        setIconUrl("");
        setMood("");
      }
      //   else {
      //   toast.error("Unexpected error. Try again.");
      // }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to create journal"
      );
    }
  };
  return (
    <div className="relative min-h-screen bg-[var(--color-background)] text-[var(--color-dark)] font-Livvic overflow-x-hidden">
      {isLargeScreen ? (
        <LeftBar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      ) : (
        <MobileLeftBar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      )}

      <div
        className={`
        flex flex-col lg:flex-row transition-all duration-300
        ${rightSidebarOpen ? "lg:mr-[30rem] xl:mr-[34rem]" : "lg:mr-[4rem]"}
      `}
      >
        <div
          className={`
          flex-1 transition-all duration-300 
          px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-4
          ${sidebarOpen && isLargeScreen ? "lg:ml-64" : "lg:ml-0"}
        `}
        >
          <header className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[var(--color-background)]/60 px-2 sm:px-4 py-2 rounded-md">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl mt-2 font-semibold text-center sm:text-left ">
              Hello {user.name}, {greetingMessage}
            </h1>

            {user.avatarUrl && (
              <img
                src={user.avatarUrl}
                alt="avatar"
                className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover ring-2 ring-[var(--color-dark)]"
              />
            )}
          </header>

          <div className="mt-4 h-[1px] w-full bg-[var(--color-dark)]/20 rounded-full" />

          <main className="mt-6 space-y-6">
            {/* Journal Title */}
            <input
              type="text"
              placeholder="Journal Title"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              className="w-full text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold bg-transparent outline-none placeholder:text-xl sm:placeholder:text-2xl py-1"
            />

            {/* Mood and Date Section */}
            <div className="flex flex-col gap-2 text-base sm:text-lg">
              <p>
                <span className="font-semibold">Date:</span> {today}
              </p>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                <span>Your Mood:</span>
                <MoodDropdown onMoodSelect={handleMoodSelect} />
              </div>
            </div>

            {/* Textarea for journal */}
            <textarea
              placeholder="Start Writing..."
              className="w-full h-[35vh] text-base sm:text-lg md:text-xl bg-transparent outline-none leading-relaxed resize-none"
              onChange={(e) => setContent(e.target.value)}
            />

            {/* Optional fields — location, icon, save */}
            {/* ... if you need them back, uncomment and apply responsive classes */}
          </main>

          {/* Clone of RightBar content for small screens */}
          {!isLargeScreen && rightSidebarOpen && (
            <div className="mt-10 px-2 sm:px-4 md:px-10 text-[var(--color-dark)]">
              <Link
                to="/visionboard"
                className="flex items-center gap-3 text-lg sm:text-xl font-semibold hover:text-[var(--color-dark)] transition mb-4"
              >
                <FiTrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />
                <span>Vision Board</span>
              </Link>

              <div className="relative overflow-hidden rounded-xl border border-[var(--color-dark)] bg-white w-full aspect-[16/10] mb-6">
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

              {/* Habits + Goals */}
              <div className="flex flex-col sm:flex-row gap-6 justify-between w-full">
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-2 text-center">
                    ➤ Habits
                  </h3>
                  <div className="min-h-[160px] border border-transparent hover:border-[var(--color-dark)] rounded-lg px-2 py-2">
                    <p className="text-center text-sm opacity-50">
                      No habits added
                    </p>
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-2 text-center">
                    ➤ Goals
                  </h3>
                  <div className="min-h-[160px] border border-transparent hover:border-[var(--color-dark)] rounded-lg px-2 py-2">
                    <p className="text-center text-sm opacity-50">
                      No goals added
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar for large screens */}
        {isLargeScreen && (
          <RightBar
            isOpen={rightSidebarOpen}
            toggle={() => setRightSidebarOpen((prev) => !prev)}
          />
        )}
      </div>
    </div>
  );

  // return (
  //   <div className="relative min-h-screen bg-[var(--color-background)] text-[var(--color-dark)] font-Livvic">
  //     {isLargeScreen ? (
  //       <LeftBar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
  //     ) : (
  //       <MobileLeftBar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
  //     )}

  //     <div
  //       className={`
  //         lg:flex transition-all duration-300
  //         ${rightSidebarOpen ? "lg:mr-[30rem] xl:mr-[34rem]" : "lg:mr-[4rem]"}
  //       `}
  //     >
  //       <div
  //         className={`
  //           flex-1 transition-all duration-300 px-4 sm:px-6 md:px-10 lg:px-16 py-2
  //           ${sidebarOpen && isLargeScreen ? "lg:ml-64" : "lg:ml-0"}
  //         `}
  //       >
  //         <header className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[var(--color-background)]/60 px-1 rounded-md">
  //           <h1 className="text-2xl sm:text-3xl mt-2 font-semibold">
  //             Hello {user.name}, {greetingMessage}
  //           </h1>

  //           {user.avatarUrl && (
  //             <img
  //               src={user.avatarUrl}
  //               alt="avatar"
  //               className="w-15 h-15 rounded-full object-cover ring-2 ring-[var(--color-dark)]"
  //             />
  //           )}
  //         </header>

  //         <div className="mt-4 h-[1px] w-full bg-[var(--color-background)] rounded-full" />

  //         <main className="mt-6 space-y-6">
  //           {/* the data receiving part is here */}
  //           <input
  //             type="text"
  //             placeholder="Journal Title"
  //             onChange={(e) => {
  //               setTitle(e.target.value);
  //             }}
  //             className="w-full text-2xl sm:text-3xl md:text-4xl font-semibold bg-transparent outline-none placeholder:text-2xl sm:placeholder:text-3xl leading-tight py-1"
  //           />

  //           <div className="flex flex-col gap-2 text-base sm:text-lg">
  //             <p>
  //               <span className="font-semibold">Date:</span> {today}
  //             </p>

  //             <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
  //               <span>Your Mood:</span>
  //               <MoodDropdown onMoodSelect={handleMoodSelect} />

  //               {/* <MoodDropdown /> */}
  //             </div>
  //           </div>

  //           <textarea
  //             placeholder="Start Writing..."
  //             className="w-full h-[35vh] text-lg sm:text-xl bg-transparent outline-none leading-relaxed resize-none"
  //             onChange={(e) => setContent(e.target.value)}
  //           />

  //           {/* <input
  //             type="text"
  //             placeholder="Tag a location (optional)"
  //             value={location}
  //             onChange={(e) => setLocation(e.target.value)}
  //             className="w-full bg-transparent border-b border-[var(--color-dark)] py-2"
  //           />

  //           <input
  //             type="text"
  //             placeholder="Add icon URL (optional)"
  //             value={iconUrl}
  //             onChange={(e) => setIconUrl(e.target.value)}
  //             className="w-full bg-transparent border-b border-[var(--color-dark)] py-2"
  //           />

  //           <button
  //             className="w-full p-2 text-xl !font-semibold rounded-2xl border-2 border-[var(--color-dark)] hover:bg-[var(--color-background)] hover:text-[var(--color-dark)] bg-[var(--color-dark)] text-[var(--color-background)]"
  //             onClick={handleSave}
  //           >
  //             Keep It in My Journal
  //           </button> */}

  //           {/* Clone of RightBar content for small screens */}
  //           {!isLargeScreen && rightSidebarOpen && (
  //             <div className="mt-10 px-2 sm:px-6 md:px-10 text-[var(--color-dark)]">
  //               <Link
  //                 to="/visionboard"
  //                 className="flex items-center gap-3 text-xl font-semibold hover:text-[var(--color-dark)] transition mb-4"
  //               >
  //                 <FiTrendingUp className="w-6 h-6" />
  //                 <span>Vision Board</span>
  //               </Link>

  //               <div className="relative overflow-hidden rounded-xl border border-[var(--color-dark)] bg-white w-full aspect-[16/10] mb-6">
  //                 <div
  //                   className="absolute top-0 left-0"
  //                   style={{
  //                     transform: "scale(0.321)",
  //                     transformOrigin: "top left",
  //                     width: "1440px",
  //                     height: "900px",
  //                     pointerEvents: "none",
  //                   }}
  //                 >
  //                   <VisionBoardCanvas
  //                     elements={[
  //                       { id: 1, type: "text", content: "Sample Text" },
  //                       {
  //                         id: 2,
  //                         type: "image",
  //                         url: "https://via.placeholder.com/220x160",
  //                       },
  //                     ]}
  //                     onRemove={() => {}}
  //                     previewMode
  //                   />
  //                 </div>
  //               </div>

  //               <div className="flex flex-col sm:flex-row gap-6 justify-between w-full">
  //                 <div className="flex-1">
  //                   <h3 className="font-bold text-lg mb-2 text-center">
  //                     ➤ Habits
  //                   </h3>
  //                   <div className="min-h-[160px] border border-transparent hover:border-[var(--color-dark)] rounded-lg px-2 py-2">
  //                     {/* Show habits here or placeholder */}
  //                     <p className="text-center text-sm opacity-50">
  //                       No habits added
  //                     </p>
  //                   </div>
  //                 </div>

  //                 <div className="flex-1">
  //                   <h3 className="font-bold text-lg mb-2 text-center">
  //                     ➤ Goals
  //                   </h3>
  //                   <div className="min-h-[160px] border border-transparent hover:border-[var(--color-dark)] rounded-lg px-2 py-2">
  //                     {/* Show goals here or placeholder */}
  //                     <p className="text-center text-sm opacity-50">
  //                       No goals added
  //                     </p>
  //                   </div>
  //                 </div>
  //               </div>
  //             </div>
  //           )}
  //         </main>
  //       </div>

  //       {isLargeScreen && (
  //         <RightBar
  //           isOpen={rightSidebarOpen}
  //           toggle={() => setRightSidebarOpen((prev) => !prev)}
  //         />
  //       )}
  //     </div>
  //   </div>
  // );
};

export default Dashboard;
