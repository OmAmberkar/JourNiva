import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import ManWithPlant from "../assets/ManWithPlant.png"; // use your own logo image

const AboutUsComponent = () => {
  // AOS animation setup
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      mirror: true,
    });
  }, []);

  // Smooth scroll to section if URL has a hash (e.g., #howtoreflect)
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 400); // slight delay for AOS + layout
      }
    }
  }, []);

  return (
    <div className="bg-[#DCEFFF] text-[#3E5973] font-Livvic px-4 pt-10 pb-10 relative z-10">
      {/* Bordered box wrapper */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto -mb-28 md:-mb-48">
        <div className="border-2 border-[#3E5973] rounded-3xl p-6 sm:p-10 bg-[#DCEFFF]">
          {/* Introduction Section */}
          <section id="introduction" className="text-center mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl mb-4">
              Built with Heart, Designed for You.
            </h1>
            <p className="text-base sm:text-lg md:text-xl max-w-2xl pt-10 mx-auto text-[#4A607A]">
              We are passionate about mental clarity, reflection, and helping
              people discover their inner voice through journaling.
            </p>
            <div className="h-[2px] w-5/6 bg-[#3E5973] rounded-full mx-auto mt-15 mb-20" />
          </section>

          {/* Image + Mission Section */}
          <section className="flex flex-col md:flex-row items-center gap-12 mb-20">
            {/* Image */}
            <div className="w-full md:w-1/2">
              <img
                src={ManWithPlant}
                alt="Team Logo"
                className="w-full rounded-2xl"
              />
            </div>

            {/* Text Content */}
            <div className="w-full md:w-1/2 text-left space-y-6">
              {/* Static heading */}
              <h2 className="text-2xl sm:text-3xl font-semibold">
                Our Mission
              </h2>

              {/* Animated paragraphs */}
              <div
                data-aos="fade-left"
                data-aos-duration="700"
                data-aos-delay="100"
              >
                <p className="text-[#4A607A] text-base sm:text-lg mb-4">
                  JourNiva is more than just a journaling app. It’s a companion
                  for growth, healing, reflection, and mindful living. We built
                  this platform to help people like you track emotions, build
                  habits, and discover their personal narrative.
                </p>
                <p className="text-[#4A607A] text-base sm:text-lg">
                  With simplicity, science, and soul, our mission is to make
                  journaling feel intuitive, enjoyable, and deeply rewarding.
                </p>
              </div>
            </div>
          </section>

          {/* How to Reflect Section */}
          <section id="howtoreflect" className="text-center mb-20 pt-20">
            {/* ✅ Static heading */}
            <h2 className="text-2xl sm:text-3xl font-semibold mb-14">
              How to Use JourNiva
            </h2>

            {/* ✅ Animated steps */}
            <div className="relative max-w-3xl mx-auto before:absolute before:left-[21px] before:top-0 before:bottom-0 before:w-[2px] before:bg-[#3E5973]/30">
              {[
                {
                  title: "Create Your Account",
                  desc: "Sign up and set your personal preferences — it's quick and easy.",
                },
                {
                  title: "Start Journaling",
                  desc: "Use daily prompts or simply free-write your thoughts and experiences.",
                },
                {
                  title: "Track Emotions",
                  desc: "Log your moods and identify patterns over time.",
                },
                {
                  title: "Set Goals",
                  desc: "Create habits and goals aligned with your personal growth journey.",
                },
                {
                  title: "Reflect Anytime",
                  desc: "Go back and revisit your entries. Growth comes from reflection.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="relative pl-14 pb-10 group"
                  data-aos="fade-up"
                  data-aos-delay={index * 120}
                >
                  <div className="absolute left-0 top-1 w-10 h-10 rounded-full bg-[#3E5973] text-white font-bold flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-semibold text-[#3E5973] mb-1">
                    {item.title}
                  </h3>
                  <p className="text-[#4A607A] text-base sm:text-lg">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Values Section */}
          <section className="text-center mb-16 pt-20">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-6 pb-10">
              Our Values
            </h2>

            <div className="flex flex-wrap justify-center gap-10 text-left">
              <div
                className="max-w-xs bg-[#DCEFFF] backdrop-blur-md p-6 rounded-xl shadow-lg border border-[#3E5973]/30"
                data-aos="fade-in"
                data-aos-delay="0"
              >
                <h3 className="text-xl font-bold mb-2">Empathy</h3>
                <p className="text-[#4A607A] text-sm">
                  We understand every story is unique, and we build with
                  compassion.
                </p>
              </div>

              <div
                className="max-w-xs bg-[#DCEFFF] backdrop-blur-md p-6 rounded-xl shadow-lg border border-[#3E5973]/30"
                data-aos="fade-in"
                data-aos-delay="150"
              >
                <h3 className="text-xl font-bold mb-2">Privacy First</h3>
                <p className="text-[#4A607A] text-sm">
                  Your thoughts are yours. We ensure complete confidentiality.
                </p>
              </div>

              <div
                className="max-w-xs bg-[#DCEFFF] backdrop-blur-md p-6 rounded-xl shadow-lg border border-[#3E5973]/30"
                data-aos="fade-in"
                data-aos-delay="300"
              >
                <h3 className="text-xl font-bold mb-2">Growth</h3>
                <p className="text-[#4A607A] text-sm">
                  We believe reflection is the first step toward transformation.
                </p>
              </div>
            </div>
          </section>

          {/* Final Quote */}
          <section className="text-center pt-16">
            <h1 className="text-2xl sm:text-3xl md:text-4xl italic text-[#3E5973] mb-8 pt-20">
              “Your story matters — and we’re honored to help you write it.”
            </h1>
            <p className="text-[#4A607A] text-lg font-medium text-right pb-20">
              — The JourNiva Team
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutUsComponent;
