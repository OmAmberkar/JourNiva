import { BrowserRouter as Router, Routes, Route } from "react-router";
import LandingPage from "./Pages/LandingPage";

import ScrollToTop from "./components/ScrollToTop"; // ✅
import AboutUsPage from "./Pages/AboutUsPage";

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
