import { BrowserRouter as Router, Routes, Route } from "react-router";
import ScrollToTop from "./components/ScrollToTop";
import SignIn from "./components/SignIn";
import AboutUsPage from "./pages/AboutUsPage";
import LandingPage from "./pages/LandingPage";
import GetStarted from "./pages/GetStarted";
import Dashboard from "./pages/Dashboard";
import SignUp from "./components/SignUp";
import AllGoals from "./pages/AllGoals";
import AllHabits from "./pages/AllHabits";
import VisionBoard from "./pages/VisionBoard";
import AllJournals from "./pages/AllJournals";


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
          <Route path="/goals" element={<AllGoals/>} />
          <Route path="/habits" element={<AllHabits />} />
          <Route path="/visionboard" element={<VisionBoard />} />
          <Route path="/journals" element={<AllJournals />} />
       
          {/* <Route path="/" element={<SignIn />} />  */}
          {/* <Route path="/" element={<SignUp />} /> */}
        </Routes>
      </Router>
    </div>
  );
};

export default App;
