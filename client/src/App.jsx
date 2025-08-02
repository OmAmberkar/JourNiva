import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import { Toaster } from "sonner";
import ScrollToTop from "./components/Landing Page Components/ScrollToTop";
import AboutUsPage from "./Pages/AboutUsPage";
import LandingPage from "./Pages/LandingPage";
import GetStarted from "./Pages/GetStarted";
import Dashboard from "./Pages/Dashboard";
import AllGoals from "./Pages/AllGoals";
import AllHabits from "./Pages/AllHabits";
import AllJournals from "./Pages/AllJournals";
import JournalFreely from "./components/Journiva info/JournalFreely";
import DailyReflection from "./components/Journiva info/DailyReflection";
import HabitTracker from "./components/Journiva info/HabitTracker";
import VisionBoardInfo from "./components/Journiva info/VisionBoardInfo";
import VisionBoard from "./Pages/VisionBoard";
import Verification from "./components/Get Started Components/Verification";
import ResetPassword from "./components/Get Started Components/ResetPassword";

const App = () => {
  useEffect(() => {
    const hasTheme = [...document.body.classList].some((cls) =>
      cls.startsWith("theme-")
    );
    if (!hasTheme) {
      document.body.classList.add("theme-blue"); // Default theme
    }
  }, []);
  return (
    <div className="bg-[#DCEFFF] min-h-screen">
      <Router>
        <ScrollToTop /> {/* ✅ ensures top on route change */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/getstarted" element={<GetStarted />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/goals" element={<AllGoals />} />
          <Route path="/habits" element={<AllHabits />} />
          <Route path="/visionboard" element={<VisionBoard />} />
          <Route path="/journals" element={<AllJournals />} />
          <Route path="/JournalFreely" element={<JournalFreely />} />
          <Route path="/DailyReflection" element={<DailyReflection />} />
          <Route path="/HabitTracker" element={<HabitTracker />} />
          <Route path="/visionboardinfo" element={<VisionBoardInfo />} />
          <Route path="/verify" element={<Verification />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          {/* Add more routes as needed */}
        </Routes>
      </Router>
      <Toaster
        position="top-center"
        richColors
        gap={5}
        duration={5000}
        theme="system"
        expand
        visibleToasts={3}
      />
    </div>
  );
};

export default App;
