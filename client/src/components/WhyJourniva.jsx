
import React from 'react';
import BgGreenGradient from '../assets/BgGreenGradient.jpeg';
import GreenJournal from '../assets/GreenJournal.jpg';

const WhyJourniva = () => {
  return (
    <section
      className="relative min-h-screen w-full bg-cover bg-center text-white overflow-hidden flex items-center justify-center py-16 px-4 sm:px-6 md:px-10"
      style={{
        backgroundImage: `url(${BgGreenGradient})`,
        fontFamily: 'Judson, serif',
      }}
    >
      {/* ✅ Corner Cross Lines */}
      {/* Top Left */}
      <div className="absolute top-4 left-4 z-40">
        <div className="w-[100px] h-[2px] bg-white relative z-20"></div>
        <div className="h-[100px] w-[2px] bg-white absolute top-0 left-0 z-30"></div>
      </div>

      {/* Bottom Right */}
      <div className="absolute bottom-4 right-4 z-40">
        <div className="w-[100px] h-[2px] bg-white absolute bottom-0 right-0 z-20"></div>
        <div className="h-[100px] w-[2px] bg-white absolute bottom-0 right-0 z-30"></div>
      </div>

      {/* Safe Content Container */}
      <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-between gap-10 z-10 px-2 sm:px-4">
        {/* 📝 Text */}
        <div className="md:w-1/2 w-full text-left drop-shadow-md max-w-full">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg">
            Why <br className="hidden sm:block" /> JourNiva?
          </h2>

          <p className="text-base sm:text-lg md:text-xl font-light leading-relaxed drop-shadow-md">
            <span className="block mb-2">In a world that rushes, we forget to pause.</span>
            <span className="block mb-2">
              JourNiva gives you a quiet space to breathe, reflect, and reconnect with yourself.
            </span>
            <span className="block mb-2">
              It’s not just journaling — it’s emotional clarity in a chaotic world.
            </span>
            <span className="block">
              Because your mind deserves stillness, and your thoughts deserve to be heard.
            </span>
          </p>
        </div>

        {/* 🖼️ Image + Boxes */}
        <div className="relative md:w-1/2 w-full flex justify-center items-center">
          {/* Translucent Cross Boxes */}
          <div className="absolute w-[92%] max-w-[300px] h-[105%] opacity-15 bg-white rotate-6 rounded-xl shadow-md z-0"></div>
          <div className="absolute w-[92%] max-w-[300px] h-[105%] opacity-15 bg-white -rotate-6 rounded-xl shadow-md z-0"></div>

          {/* Journal Image */}
          <img
            src={GreenJournal}
            alt="Journaling"
            className="w-[85vw] sm:w-72 md:w-80 lg:w-96 max-w-[300px] rounded shadow-lg z-10 transition-all duration-300"
          />
        </div>
      </div>
    </section>
  );
};

export default WhyJourniva;


