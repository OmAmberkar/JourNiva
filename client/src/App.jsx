import { BrowserRouter as Router, Routes, Route } from "react-router";
import ScrollToTop from "./components/ScrollToTop"; // ✅
import AboutUsPage from "./Pages/AboutUsPage";
import LandingPage from "./pages/LandingPage";

const App = () => {
  return (
    <div className="bg-[#DCEFFF] min-h-screen">
      <Router>
        <ScrollToTop /> {/* ✅ ensures top on route change */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutUsPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
