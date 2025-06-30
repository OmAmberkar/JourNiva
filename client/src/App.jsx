import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import DescriptionBox from "./components/DescriptionBox";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="bg-[#DCEFFF] min-h-screen">
      <Navbar />
      <Header />
      <DescriptionBox />
      <Footer />
    </div>
  );
};

export default App;
