import { BrowserRouter as Router, Routes, Route } from "react-router";
import ScrollToTop from "./components/ScrollToTop";
import SignIn from "./components/SignIn";
import AboutUsPage from "./pages/AboutUsPage";
import LandingPage from "./pages/LandingPage";
import GetStarted from "./pages/GetStarted";
import SignUp from "./components/SignUp";
import DashBoard from "./pages/DashBoard";
``;
const App = () => {
  return (
    <div className="bg-[#DCEFFF] min-h-screen">
      <Router>
        <ScrollToTop /> {/* ✅ ensures top on route change */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/getstarted" element={<GetStarted />} />
          <Route path="/dashboard" element={<DashBoard />} />
          {/* <Route path="/" element={<SignIn />} />  */}
          {/* <Route path="/" element={<SignUp />} /> */}
        </Routes>
      </Router>
    </div>
  );
};

export default App;
