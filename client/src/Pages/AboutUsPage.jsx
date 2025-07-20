import React, { useEffect } from "react";
import Navbar from "../components/Common Components/Navbar";


import Footer from "../components/Common Components/Footer";
import AboutUsComponent from "../components/About Us Component/AboutUsComponent";

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
