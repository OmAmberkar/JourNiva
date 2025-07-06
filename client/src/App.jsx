import { BrowserRouter as Router, Routes, Route } from "react-router";
import ScrollToTop from "./components/ScrollToTop"; 
import AboutUsPage from "./Pages/AboutUsPage";
import LandingPage from "./Pages/LandingPage";
import LoginPage from "./Pages/LoginPage"; 
import RegisterPage from "./Pages/RegisterPage";

const App = () => {
  return (
    <div className="bg-[#DCEFFF] min-h-screen">
      <Router>
        <ScrollToTop /> {/* ✅ ensures top on route change */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
