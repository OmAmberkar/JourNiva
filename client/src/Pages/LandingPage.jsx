import React, { useEffect } from "react";
import { useLocation } from "react-router";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import DescriptionBox from "../components/DescriptionBox";
import Footer from "../components/Footer";

export default function LandingPage() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const elementId = location.hash.replace("#", "");
      const element = document.getElementById(elementId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100); // slight delay to ensure DOM is fully rendered
      }
    } else {
      // If there's no hash, scroll to the top (Home)
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location]);

  return (
    <>
      <Navbar />
      <Header />
      <DescriptionBox />
      <Footer />
    </>
  );
}
