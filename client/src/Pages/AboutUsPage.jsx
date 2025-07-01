import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AboutUsComponent from "../components/AboutUsComponent";

export default function AboutUsPage() {
  // ⬇️ Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <AboutUsComponent />
      <Footer />
    </>
  );
}
