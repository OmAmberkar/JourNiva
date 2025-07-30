import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/livvic"; // Defaults to weight 400
import "./App.css";
import App from "./App.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
// import "bootstrap/dist/css/bootstrap.min.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_JOURNIVA_GOOGLE_CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>  
  </StrictMode>
);
