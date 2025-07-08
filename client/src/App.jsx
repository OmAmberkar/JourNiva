import { BrowserRouter as Router, Routes, Route } from "react-router";
import ScrollToTop from "./components/ScrollToTop"; 
import AboutUsPage from "./Pages/AboutUsPage";
import LandingPage from "./Pages/LandingPage";
import GetStarted from "./Pages/GetStarted";

const App = () => {
  return (
    <div className="bg-[#DCEFFF] min-h-screen">
      <Router>
        <ScrollToTop /> {/* ✅ ensures top on route change */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/getstarted" element={<GetStarted />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
