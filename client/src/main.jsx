import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/livvic"; // Defaults to weight 400
import "./App.css";
import App from "./App.jsx";
// import "bootstrap/dist/css/bootstrap.min.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    
      <App />
    
  </StrictMode>
);
