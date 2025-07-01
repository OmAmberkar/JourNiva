// DescriptionBox.jsx
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
    AOS.init({
      duration: 800,
      once: false, // ⬅️ allows animation on scroll up
      mirror: true, // ⬅️ makes elements animate out when scrolling up
    });
  }, []);

  return (
    <div className="bg-[#DCEFFF] text-[#3E5973] font-Livvic flex justify-center items-center px-4 pt-10 pb-10 relative z-10">
     
      <div className="relative z-10 w-full max-w-[1200px] mx-auto -mb-28 md:-mb-50">

        <div className="border-2 border-[#3E5973] rounded-3xl p-6 sm:p-10 bg-[#DCEFFF] ">
          {/* Section 1 */}
          <section
            className="flex flex-col justify-center items-center px-4 py-20"
            data-aos="fade-up"
          >
            {/* Heading  */}
            <h1 className="text-3xl md:text-5xl text-center mb-5 pb-5">
              What can you do with JourNiva?
            </h1>
            <div className="h-[2px] w-3/4 bg-[#3E5973] rounded-full mx-auto mb-12" />

            <div className="flex flex-wrap justify-center gap-8 md:gap-12 max-w-5xl mx-auto">
              {/* Image Array defined for multiple images */}
              {[
                { img: WhiteBooks, label: "Journal Freely", link: "https://www.verywellhealth.com/journaling-7498123", },
                { img: WhiteLight, label: "Daily Reflection", link: "https://medium.com/the-storm-of-words-un-said/the-power-of-daily-reflection-how-a-few-minutes-can-transform-your-day-b6312c0ec18e", },
                { img: WhiteGraph, label: "Vision Board", link: "https://www.forbes.com/sites/traversmark/2024/03/29/a-psychologist-explains-the-power-of-vision-boarding-for-success/", },
                { img: WhiteHabit, label: "Habit Tracker",  link: "https://jamesclear.com/habit-tracker", },
              ].map((item, index) => {
                const [word1, word2] = item.label.split(" ");
                return (
                  <div
                    key={index}
                    className="flex flex-col items-center"
                    data-aos="fade-up-top"
                    data-aos-delay={index * 100}
                  >
                    <div className="w-48 h-60 md:w-52 md:h-64 bg-[#3E5973] text-white rounded-[5rem] flex flex-col items-center justify-center text-center px-4 py-6 transition-transform shadow-md">
                      <img
                        src={item.img}
                        alt={item.label}
                        className="w-20 h-20 md:w-[110px] md:h-[110px] object-contain mb-4"
                      />
                      <p className="text-3xl  leading-tight">
                        {word1}
                        <br />
                        {word2}
                      </p>
                    </div>
                    <a
                      href={item.link}
                      className="text-lg mt-2 text-[#3E5973] font-medium hover:scale-105"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Research &gt;
                    </a>
                  </div>
                );
              })}
            </div>
          </section>
{/* Section 2 */}
          <section className="text-center px-4 py-24">
            <h1 className="text-3xl sm:text-4xl md:text-5xl  mb-10 text-[#3E5973]">
              Unfold your own narrative
            </h1>
            <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto text-[#4A607A] leading-relaxed">
              Explore and express your unique story — your thoughts, dreams,
              struggles, and growth.
            </p>
          </section>
{/* Section 3 Left side*/}
          <section className="flex flex-col md:flex-row items-start justify-center gap-10 md:gap-20 px-4 py-20">
            <div className="w-full md:w-1/2 flex justify-center">
              <img
                src={BookReadingMan}
                alt="Book Reading Man"
                className="w-[80%] sm:w-[90%] md:w-full h-auto object-contain"
              />
            </div>
 
           <div className="w-full md:w-1/2 text-right">
  {/* Section 3 Right side*/}
  <div className="relative overflow-hidden inline-block border-r-8 border-[#3E5973] pr-4 mb-4">
    <h1
      className="text-2xl md:text-4xl font-semibold whitespace-nowrap"
      data-aos="slide-left"
      data-aos-duration="700"
     
    >
      Personalized <br className=" sm:block" /> experience
    </h1>
  </div>

{/* Content  */}
  <p className="text-base sm:text-lg md:text-2xl text-[#4A607A] leading-relaxed mt-4 pt-20">
    JourNiva adjusts to your mood, pace, and style — making
    journaling feel truly yours.
  </p>
</div>
          </section>
{/* Section 4 */}
          <div className="h-[2px] w-5/6 bg-[#3E5973] rounded-full mx-auto mb-12" />

          <section className="text-center px-4 pt-10 pb-20 md:pt-16 md:pb-24">
            <h1 className="text-2xl sm:text-3xl md:text-4xl  text-[#3E5973] leading-snug">
              All you need to discover the magic of journaling
            </h1>
          </section>
{/* Section 5 Left Side */}
          <section className="flex flex-col-reverse md:flex-row items-start justify-center gap-10 md:gap-20 px-4 py-20">
           
            <div className="w-full md:w-1/2 text-left">

{/* Title */}

  <div className="relative overflow-hidden inline-block border-l-8 border-[#3E5973] pl-4 mb-20">
    <h1
      data-aos="slide-right"
      data-aos-duration="800"
      
      className="text-2xl md:text-4xl font-semibold whitespace-nowrap"
    >
      Colors that match <br className="sm:block" /> how you feel
    </h1> 
  </div> 

{/* Content */}

  <p className="text-base sm:text-lg md:text-xl text-[#4A607A] leading-relaxed mt-4">
    Choose your mood, and your journaling space adapts — calming tones
    that reflect your emotions and set the right atmosphere for reflection.
  </p>
</div>

{/* Section 5 Right Side  */}

            <div className="w-full md:w-1/2 flex justify-center relative mt-10">
{/* Ring image */}
              <img
                src={Ring}
                alt="Background Layer"
                className="absolute -top-[2%] md:-top-[10%] w-[90%] md:w-[36rem] lg:w-[40rem] h-auto object-contain opacity-80 z-0 animate-[spin_50s_linear_infinite]"
              />
{/* Woman image */}
              <img
                src={BookReadingWoman}
                alt="Book Reading Woman"
                className="relative mt-16 pb-5 w-full md:w-[36rem] lg:w-[40rem] h-auto object-contain z-10"
              />
            </div>
          </section>
{/* Section 6 Quote */}
          <section className="text-center px-4 py-20">
            <h1 className="text-3xl md:text-4xl italic text-[#3E5973] mb-8">
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
    </div>
  );
};

export default DescriptionBox;











