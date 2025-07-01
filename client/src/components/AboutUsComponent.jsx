
// import React, { useEffect } from "react";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import Logo from "../assets/Logo.png"; // use your own logo image

// const AboutUsComponent = () => {
//   useEffect(() => {
//     AOS.init({
//       duration: 800,
//       once: false,
//       mirror: true,
//     });
//   }, []);

//   return (
//     <div className="bg-[#DCEFFF] text-[#3E5973] font-Livvic px-4 pt-10 pb-10 relative z-10">
//       {/* Bordered box wrapper */}
//       <div className="relative z-10 w-full max-w-[1200px] mx-auto -mb-28 md:-mb-48">
//         <div className="border-2 border-[#3E5973] rounded-3xl p-6 sm:p-10 bg-[#DCEFFF]">

//           {/* Heading */}
//           <section id="introduction" className="text-center mb-16">
//             <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
//               Meet the heart behind JourNiva
//             </h1>
//             <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto text-[#4A607A]">
//               We are passionate about mental clarity, reflection, and helping people discover their inner voice through journaling.
//             </p>
//             <div className="h-[2px] w-3/4 bg-[#3E5973] rounded-full mx-auto mt-6" />
//           </section>

//           {/* Image + Mission Section */}
//           <section className="flex flex-col md:flex-row items-center gap-12 mb-20">
//             <div className="w-full md:w-1/2">
//               <img
//                 src={Logo}
//                 alt="Team Logo"
//                 className="w-full rounded-2xl shadow-lg"
//               />
//             </div>
//             <div className="w-full md:w-1/2 text-left space-y-6" data-aos="fade-left">
//               <h2 className="text-2xl sm:text-3xl font-semibold">
//                 Our Mission
//               </h2>
//               <p className="text-[#4A607A] text-base sm:text-lg">
//                 JourNiva is more than just a journaling app. It’s a companion for growth, healing, reflection, and mindful living. We built this platform to help people like you track emotions, build habits, and discover their personal narrative.
//               </p>
//               <p className="text-[#4A607A] text-base sm:text-lg">
//                 With simplicity, science, and soul, our mission is to make journaling feel intuitive, enjoyable, and deeply rewarding.
//               </p>
//             </div>
//           </section>

//           {/* How to Use Section */}
// <section id="howtoreflect" className="text-center mb-20" data-aos="fade-up">
//   <h2 className="text-2xl sm:text-3xl font-semibold mb-14">How to Use JourNiva</h2>

//   <div className="relative max-w-3xl mx-auto before:absolute before:left-[21px] before:top-0 before:bottom-0 before:w-[2px] before:bg-[#3E5973]/30">
//     {[
//       {
//         title: "Create Your Account",
//         desc: "Sign up and set your personal preferences — it's quick and easy.",
//       },
//       {
//         title: "Start Journaling",
//         desc: "Use daily prompts or simply free-write your thoughts and experiences.",
//       },
//       {
//         title: "Track Emotions",
//         desc: "Log your moods and identify patterns over time.",
//       },
//       {
//         title: "Set Goals",
//         desc: "Create habits and goals aligned with your personal growth journey.",
//       },
//       {
//         title: "Reflect Anytime",
//         desc: "Go back and revisit your entries. Growth comes from reflection.",
//       },
//     ].map((item, index) => (
//       <div
//         key={index}
//         className="relative pl-14 pb-10 group"
//         data-aos="fade-up"
//         data-aos-delay={index * 120}
//       >
//         <div className="absolute left-0 top-1 w-10 h-10 rounded-full bg-[#3E5973] text-white font-bold flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
//           {index + 1}
//         </div>
//         <h3 className="text-xl font-semibold text-[#3E5973] mb-1">
//           {item.title}
//         </h3>
//         <p className="text-[#4A607A] text-base sm:text-lg">{item.desc}</p>
//       </div>
//     ))}
//   </div>
// </section>




//           {/* Values Section */}
//           <section className="text-center mb-16" data-aos="zoom-in-up">
//             <h2 className="text-2xl sm:text-3xl font-semibold mb-6">Our Values</h2>
//             <div className="flex flex-wrap justify-center gap-10 text-left">
//               {[
//                 {
//                   title: "Empathy",
//                   desc: "We understand every story is unique, and we build with compassion.",
//                 },
//                 {
//                   title: "Privacy First",
//                   desc: "Your thoughts are yours. We ensure complete confidentiality.",
//                 },
//                 {
//                   title: "Growth",
//                   desc: "We believe reflection is the first step toward transformation.",
//                 },
//               ].map((value, index) => (
//                 <div
//                   key={index}
//                   className="max-w-xs bg-white/70 backdrop-blur-md p-6 rounded-xl shadow-lg border border-[#3E5973]/30"
//                   data-aos="fade-up"
//                   data-aos-delay={index * 150}
//                 >
//                   <h3 className="text-xl font-bold mb-2">{value.title}</h3>
//                   <p className="text-[#4A607A] text-sm">{value.desc}</p>
//                 </div>
//               ))}
//             </div>
//           </section>

//           {/* Final Quote */}
//           <section className="text-center pt-16">
//             <h1 className="text-2xl sm:text-3xl md:text-4xl italic text-[#3E5973] mb-8">
//               “Your story matters — and we’re honored to help you write it.”
//             </h1>
//             <p className="text-[#4A607A] text-lg font-medium">— The JourNiva Team</p>
//           </section>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default AboutUsComponent;





import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Logo from "../assets/Logo.png"; // use your own logo image

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
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Meet the heart behind JourNiva
            </h1>
            <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto text-[#4A607A]">
              We are passionate about mental clarity, reflection, and helping people discover their inner voice through journaling.
            </p>
            <div className="h-[2px] w-3/4 bg-[#3E5973] rounded-full mx-auto mt-6" />
          </section>

          {/* Image + Mission Section */}
          <section className="flex flex-col md:flex-row items-center gap-12 mb-20">
            <div className="w-full md:w-1/2">
              <img
                src={Logo}
                alt="Team Logo"
                className="w-full rounded-2xl shadow-lg"
              />
            </div>
            <div className="w-full md:w-1/2 text-left space-y-6" data-aos="fade-left">
              <h2 className="text-2xl sm:text-3xl font-semibold">
                Our Mission
              </h2>
              <p className="text-[#4A607A] text-base sm:text-lg">
                JourNiva is more than just a journaling app. It’s a companion for growth, healing, reflection, and mindful living. We built this platform to help people like you track emotions, build habits, and discover their personal narrative.
              </p>
              <p className="text-[#4A607A] text-base sm:text-lg">
                With simplicity, science, and soul, our mission is to make journaling feel intuitive, enjoyable, and deeply rewarding.
              </p>
            </div>
          </section>

          {/* How to Reflect Section */}
          <section id="howtoreflect" className="text-center mb-20" data-aos="fade-up">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-14">How to Use JourNiva</h2>

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
                  <p className="text-[#4A607A] text-base sm:text-lg">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Values Section */}
          <section className="text-center mb-16" data-aos="zoom-in-up">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-6">Our Values</h2>
            <div className="flex flex-wrap justify-center gap-10 text-left">
              {[
                {
                  title: "Empathy",
                  desc: "We understand every story is unique, and we build with compassion.",
                },
                {
                  title: "Privacy First",
                  desc: "Your thoughts are yours. We ensure complete confidentiality.",
                },
                {
                  title: "Growth",
                  desc: "We believe reflection is the first step toward transformation.",
                },
              ].map((value, index) => (
                <div
                  key={index}
                  className="max-w-xs bg-white/70 backdrop-blur-md p-6 rounded-xl shadow-lg border border-[#3E5973]/30"
                  data-aos="fade-up"
                  data-aos-delay={index * 150}
                >
                  <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                  <p className="text-[#4A607A] text-sm">{value.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Final Quote */}
          <section className="text-center pt-16">
            <h1 className="text-2xl sm:text-3xl md:text-4xl italic text-[#3E5973] mb-8">
              “Your story matters — and we’re honored to help you write it.”
            </h1>
            <p className="text-[#4A607A] text-lg font-medium">— The JourNiva Team</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutUsComponent;
