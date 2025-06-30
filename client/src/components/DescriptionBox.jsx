
import React from "react";
import { FaBook, FaLightbulb, FaChartBar, FaHeartbeat } from "react-icons/fa";
import BookReadingMan from "../assets/BookReadingMan.png";
import BookReadingWoman from "../assets/BookReadingWoman.png";

const DescriptionBox = () => {
  return (
    <div className="bg-[#DCEFFF] text-[#3E5973] font-sans flex justify-center items-center px-4 py-10">
    <div className="w-full max-w-[1200px] border-2 border-[#3E5973] rounded-3xl p-10  bg-[#DCEFFF]">

      {/* Section 1: Heading + Features */}
      <div className="min-h-screen flex flex-col justify-center items-center px-6 py-20">
        <div className="text-center mb-20">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            What can you do with JourNiva?
          </h1>
          <div className="h-0.5 w-full bg-[#3E5973] rounded-full mx-auto mt-10 "></div>

        </div>

        <div className="flex flex-wrap justify-center gap-10 mb-12">
  {[
    { icon: <FaBook size={50} />, label: "Journal Freely" },
    { icon: <FaLightbulb size={50} />, label: "Daily Reflection" },
    { icon: <FaChartBar size={50} />, label: "Vision Board" },
    { icon: <FaHeartbeat size={50} />, label: "Habit Tracker" },
  ].map((item, index) => (
    <div
      key={index}
      className="w-52 h-52 bg-[#3E5973] text-white rounded-3xl flex flex-col items-center justify-center shadow-xl"
    >
      {item.icon}
      <p className="mt-4 text-center text-xl font-semibold">{item.label}</p>
      <span className="text-base mt-2 underline">Research &gt;</span>
    </div>
  ))}
</div>

      </div>

      {/* Section 2: Narrative */}
      <div className="min-h-screen flex flex-col justify-center items-center px-6 py-20 text-center">
        <h1 className="text-2xl md:text-4xl font-semibold mb-6">
          Unfold your own narrative
        </h1>
        <p className="text-lg md:text-xl max-w-xl mx-auto text-[#4A607A] leading-relaxed">
          Explore and express your unique story — your thoughts, dreams,
          struggles, and growth.
        </p>
      </div>

      {/* Section 3: BookReadingMan + Experience */}
      <div className="min-h-screen flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 px-6 py-20">
        <div className="w-[16rem] sm:w-[20rem] md:w-[25rem] lg:w-[30rem] h-auto">
          <div
            style={{
              width: "100%",
              paddingTop: "100%",
              backgroundImage: `url(${BookReadingMan})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          />
        </div>
         <div className="text-right max-w-xl w-full">
    <h1 className="text-2xl font-semibold mb-4 border-r-4 border-[#3E5973] pr-4 inline-block">
      Personalized <br /> experience
    </h1>
    <p className="text-lg md:text-xl text-[#4A607A] leading-relaxed mt-4">
      JourNiva adjusts to your mood, pace, and style — making journaling
      feel truly yours.
    </p>
  </div>
      </div>

      {/* Section 4: BookReadingWoman + Mood Matching */}
      <div className="min-h-screen flex flex-col-reverse md:flex-row items-center justify-center gap-12 md:gap-24 px-6 py-20">
        {/* Left side - text aligned left with left border on heading */}
  <div className="text-left max-w-xl w-full">
    <h1 className="text-2xl font-semibold mb-4 border-l-4 border-[#3E5973] pl-4 inline-block">
      Colors that match <br /> how you feel
    </h1>
    <p className="text-lg md:text-xl text-[#4A607A] leading-relaxed mt-4">
      Choose your mood, and your journaling space adapts — calming tones
      that reflect your emotions and set the right atmosphere for reflection.
    </p>
  </div>
        <div className="w-[16rem] sm:w-[20rem] md:w-[25rem] lg:w-[30rem] h-auto">
          <div
            style={{
              width: "100%",
              paddingTop: "100%",
              backgroundImage: `url(${BookReadingWoman})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          />
        </div>
      </div>

      {/* Section 5: Quote */}
      <div className="min-h-screen flex flex-col justify-center items-center px-6 py-20 text-center">
        <p className="text-xl md:text-2xl italic text-[#3E5973] mb-4">
          “Fill your paper with the breathings of your heart.”
        </p>
        <span className="not-italic font-medium text-lg">— William Wordsworth</span>
      </div>
    </div>
    </div>

  );
};

export default DescriptionBox;
