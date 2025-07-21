import { BrowserRouter as Router, Routes, Route } from "react-router";
import ScrollToTop from "./components/Landing Page Components/ScrollToTop";
import AboutUsPage from "./pages/AboutUsPage";
import LandingPage from "./pages/LandingPage";
import GetStarted from "./pages/GetStarted";
import Dashboard from "./pages/Dashboard";
import AllGoals from "./pages/AllGoals";
import AllHabits from "./pages/AllHabits";
import AllJournals from "./pages/AllJournals";
import JournalFreely from "./components/Journiva info/JournalFreely";
import DailyReflection from "./components/Journiva info/DailyReflection";
import HabitTracker from "./components/Journiva info/HabitTracker";
import VisionBoardInfo from "./components/Journiva info/VisionBoardInfo";
import VisionBoard from "./pages/VisionBoard";

const App = () => {
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
        </Routes>
      </Router>
    </div>
  );
};

export default App;
