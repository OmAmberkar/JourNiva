// import React from "react";
// import BookReadingMan from "../assets/BookReadingMan.png";
// import BookReadingWoman from "../assets/BookReadingWoman.png";
// import Ring from "../assets/Ring.png"; // Add this background image
// import WhiteBooks from "../assets/WhiteBooks.png";
// import WhiteGraph from "../assets/WhiteGraph.png";
// import WhiteLight from "../assets/WhiteLight.png";
// import WhiteHabit from "../assets/WhiteHabit.png";
// import AOS from "aos";
// import "aos/dist/aos.css";

// const DescriptionBox = () => {
//   return (
//     <div className="bg-[#DCEFFF] text-[#3E5973] font-Livvic flex justify-center items-center px-4 py-10">
//       <div className="w-full max-w-[1200px] border-2 border-[#3E5973] rounded-3xl p-6 sm:p-10 bg-[#DCEFFF]">

//         {/* Section 1: Heading + Features */}
// <section className="flex flex-col justify-center items-center px-4 py-20">
//   <h1 className="text-3xl md:text-5xl font-bold text-center mb-5 pb-5">
//     What can you do with JourNiva?
//   </h1>
//   <div className="h-1 w-3/4 bg-[#3E5973] rounded-full mx-auto mb-12" />

//   <div className="flex flex-wrap justify-center gap-8 md:gap-12 max-w-5xl mx-auto">
//     {[
//       { img: WhiteBooks, label: "Journal Freely" },
//       { img: WhiteLight, label: "Daily Reflection" },
//       { img: WhiteGraph, label: "Vision Board" },
//       { img: WhiteHabit, label: "Habit Tracker" },
//     ].map((item, index) => {
//       const [word1, word2] = item.label.split(" ");
//       return (
//         <div
//   key={index}
//   className="flex flex-col items-center"
// >
//   <div className="w-48 h-60 md:w-52 md:h-64 bg-[#3E5973] text-white rounded-[4rem] flex flex-col items-center justify-center text-center px-6 py-8">
//     <img
//       src={item.img}
//       alt={item.label}
//       className="w-[100px] h-[100px] md:w-[110px] md:h-[110px] object-contain mb-4"
//     />
//     <p className="text-lg font-semibold leading-tight">
//       {word1}
//       <br />
//       {word2}
//     </p>
//   </div>
//   <span className="text-lg mt-2 text-[#3E5973] font-medium">
//     Research &gt;
//   </span>
// </div>
//       );
//     })}
//   </div>
// </section>

//         {/* Section 2: Narrative */}
//         <section className="text-center px-4 py-20">
//           <h1 className="text-2xl md:text-4xl font-semibold mb-6">
//             Unfold your own narrative
//           </h1>
//           <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto text-[#4A607A] leading-relaxed">
//             Explore and express your unique story — your thoughts, dreams,
//             struggles, and growth.
//           </p>
//         </section>

//         {/* Section 3: BookReadingMan + Experience */}
//         <section className="flex flex-col md:flex-row items-start justify-center gap-10 md:gap-20 px-4 py-20">
//           <div className="w-full md:w-1/2 flex justify-center">
//             <img
//               src={BookReadingMan}
//               alt="Book Reading Man"
//               className="w-[80%] sm:w-[90%] md:w-full h-auto object-contain"
//             />
//           </div>
//           <div className="w-full md:w-1/2 text-right">
//             <h1 className="text-2xl md:text-4xl font-semibold border-r-8 border-[#3E5973] pr-4 inline-block mb-4">
//               Personalized <br className="hidden sm:block" /> experience
//             </h1>
//             <p className="text-base sm:text-lg md:text-xl text-[#4A607A] leading-relaxed mt-4">
//               JourNiva adjusts to your mood, pace, and style — making journaling
//               feel truly yours.
//             </p>
//           </div>
//         </section>

//         {/* Section 4: BookReadingWoman + Mood Matching */}
//         <section className="flex flex-col-reverse md:flex-row items-start justify-center gap-10 md:gap-20 px-4 py-20">
//           <div className="w-full md:w-1/2 text-left">
//             <h1 className="text-2xl md:text-4xl font-semibold border-l-8 border-[#3E5973] pl-4 inline-block mb-4">
//               Colors that match <br className="hidden sm:block" /> how you feel
//             </h1>
//             <p className="text-base sm:text-lg md:text-xl text-[#4A607A] leading-relaxed mt-4">
//               Choose your mood, and your journaling space adapts — calming tones
//               that reflect your emotions and set the right atmosphere for reflection.
//             </p>
//           </div>

//           {/* Woman image with background */}
//           {/* Woman image with background */}
// <div className="w-full md:w-1/2 flex justify-center relative mt-10">
//   {/* Background image */}
//   <img
//   src={Ring}
//   alt="Background Layer"
//   className="absolute -top-[15%] md:-top-[20%] w-[90%] md:w-[36rem] lg:w-[40rem] h-auto object-contain opacity-30 z-0 animate-[spin_20s_linear_infinite]"
// />

//   {/* Foreground image */}
//   <img
//     src={BookReadingWoman}
//     alt="Book Reading Woman"
//     className="relative mt-16 w-full md:w-[36rem] lg:w-[40rem] h-auto object-contain z-10"
//   />
// </div>

//         </section>

//         {/* Section 5: Quote */}
//         <section className="text-center px-4 py-20">
//           <h1 className="text-lg md:text-2xl italic text-[#3E5973] mb-4">
//             “Fill your paper with the breathings of your heart.”
//           </h1>
//           <div className="text-right">
//             <span className="text-base sm:text-lg not-italic font-medium">
//               — William Wordsworth
//             </span>
//           </div>
//         </section>

//       </div>
//     </div>
//   );
// };

// export default DescriptionBox;


import React, { useEffect } from "react";
import BookReadingMan from "../assets/BookReadingMan.png";
import BookReadingWoman from "../assets/BookReadingWoman.png";
import Ring from "../assets/Ring.png";
import WhiteBooks from "../assets/WhiteBooks.png";
import WhiteGraph from "../assets/WhiteGraph.png";
import WhiteLight from "../assets/WhiteLight.png";
import WhiteHabit from "../assets/WhiteHabit.png";
import AOS from "aos";
import "aos/dist/aos.css";

const DescriptionBox = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <div className="bg-[#DCEFFF] text-[#3E5973] font-Livvic flex justify-center items-center px-4 py-10">
      <div className="w-full max-w-[1200px] border-2 border-[#3E5973] rounded-3xl p-6 sm:p-10 bg-[#DCEFFF]">

        {/* Section 1: Heading + Features */}
        <section className="flex flex-col justify-center items-center px-4 py-20" data-aos="fade-up">
          <h1 className="text-3xl md:text-5xl font-bold text-center mb-5 pb-5">
            What can you do with JourNiva?
          </h1>
          <div className="h-[2px] w-3/4 bg-[#3E5973] rounded-full mx-auto mb-12" />

          <div className="flex flex-wrap justify-center gap-8 md:gap-12 max-w-5xl mx-auto">
            {[
              { img: WhiteBooks, label: "Journal Freely" },
              { img: WhiteLight, label: "Daily Reflection" },
              { img: WhiteGraph, label: "Vision Board" },
              { img: WhiteHabit, label: "Habit Tracker" },
            ].map((item, index) => {
              const [word1, word2] = item.label.split(" ");
              return (
                <div
                  key={index}
                  className="flex flex-col items-center"
                  data-aos="zoom-in"
                  data-aos-delay={index * 100}
                >
                  <div className="w-48 h-60 md:w-52 md:h-64 bg-[#3E5973] text-white rounded-[4rem] flex flex-col items-center justify-center text-center px-6 py-8">
                    <img
                      src={item.img}
                      alt={item.label}
                      className="w-[100px] h-[100px] md:w-[110px] md:h-[110px] object-contain mb-4"
                    />
                    <p className="text-lg font-semibold leading-tight">
                      {word1}
                      <br />
                      {word2}
                    </p>
                  </div>
                  <span className="text-lg mt-2 text-[#3E5973] font-medium">
                    Research &gt;
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 2: Narrative */}
        <section className="text-center px-4 py-20">
          <h1 className="text-2xl md:text-4xl font-semibold mb-6">
            Unfold your own narrative
          </h1>
          <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto text-[#4A607A] leading-relaxed">
            Explore and express your unique story — your thoughts, dreams,
            struggles, and growth.
          </p>
        </section>

        <section className="flex flex-col md:flex-row items-start justify-center gap-10 md:gap-20 px-4 py-20">
  {/* ❌ Removed data-aos from image */}
  <div className="w-full md:w-1/2 flex justify-center">
    <img
      src={BookReadingMan}
      alt="Book Reading Man"
      className="w-[80%] sm:w-[90%] md:w-full h-auto object-contain"
    />
  </div>

  {/* ✅ Animation kept on text */}
  <div className="w-full md:w-1/2 text-right" data-aos="fade-left">
    <h1 className="text-2xl md:text-4xl font-semibold border-r-8 border-[#3E5973] pr-4 inline-block mb-4">
      Personalized <br className="hidden sm:block" /> experience
    </h1>
    <p className="text-base sm:text-lg md:text-xl text-[#4A607A] leading-relaxed mt-4">
      JourNiva adjusts to your mood, pace, and style — making journaling
      feel truly yours.
    </p>
  </div>
</section>
<div className="h-[2px] w-3/4 bg-[#3E5973] rounded-full mx-auto mb-12" />

{/* Section: Divider Title with proper spacing */}
<section className="text-center px-4 pt-10 pb-20 md:pt-16 md:pb-24">
  <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#3E5973] leading-snug">
    All you need to discover the magic of journaling
  </h1>
</section>


        <section className="flex flex-col-reverse md:flex-row items-start justify-center gap-10 md:gap-20 px-4 py-20">
  {/* ✅ Animation kept on text */}
  <div className="w-full md:w-1/2 text-left" data-aos="fade-right">
    <h1 className="text-2xl md:text-4xl font-semibold border-l-8 border-[#3E5973] pl-4 inline-block mb-4">
      Colors that match <br className="hidden sm:block" /> how you feel
    </h1>
    <p className="text-base sm:text-lg md:text-xl text-[#4A607A] leading-relaxed mt-4">
      Choose your mood, and your journaling space adapts — calming tones
      that reflect your emotions and set the right atmosphere for reflection.
    </p>
  </div>

  {/* ❌ Removed data-aos from image wrapper */}
  <div className="w-full md:w-1/2 flex justify-center relative mt-10">
    <img
      src={Ring}
      alt="Background Layer"
      className="absolute -top-[15%] md:-top-[20%] w-[90%] md:w-[36rem] lg:w-[40rem] h-auto object-contain opacity-30 z-0 animate-[spin_20s_linear_infinite]"
    />
    <img
      src={BookReadingWoman}
      alt="Book Reading Woman"
      className="relative mt-16 w-full md:w-[36rem] lg:w-[40rem] h-auto object-contain z-10"
    />
  </div>
</section>


        {/* Section 5: Quote */}
        <section className="text-center px-4 py-20" >
          <h1 className="text-lg md:text-2xl italic text-[#3E5973] mb-4">
            “Fill your paper with the breathings of your heart.”
          </h1>
          <div className="text-right">
            <span className="text-base sm:text-lg not-italic font-medium">
              — William Wordsworth
            </span>
          </div>
        </section>

      </div>
    </div>
  );
};

export default DescriptionBox;
