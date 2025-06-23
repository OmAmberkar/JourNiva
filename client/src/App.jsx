import { Routes } from "react-router";
import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";

import "./App.css"; // Assuming you have a global CSS file
const App = () => {
  return (
    <div>
      {/* <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes> */}
      <RegisterPage />
    </div>
  );
};

export default App;
