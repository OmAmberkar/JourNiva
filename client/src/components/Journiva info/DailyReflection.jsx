/* eslint-disable no-unused-vars */
import React from "react";
import Footer from "../Common Components/Footer";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";

function DailyReflection() {
  const navigate = useNavigate();

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const positionPattern = [
    "left",
    "right",
    "right",
    "left",
    "left",
    "right",
    "left",
    "left",
    "right",
  ];
  const content = [
    {
      title: "Why Reflection Matters",
      text: "In our noisy and busy lives, daily reflection offers a chance to pause and reconnect. Especially for women juggling multiple roles, it helps us move from reacting to responding with clarity. Over time, I realized reflection brings peace, helps recognize thought patterns, and gives space to breathe.",
      img: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?q=80&w=800&auto=format&fit=crop",
    },
    {
      title: "What Is Daily Reflection?",
      text: "It’s more than a review of your day—it’s emotional and intentional awareness. Reflection helps you gently observe without judgment. It's about noticing your values, motivations, and feelings to align better with your true self.",
      img: "https://images.unsplash.com/photo-1656868545176-d553116797f0?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Benefits of Daily Reflection",
      text: "From self-awareness to emotional resilience, reflection uncovers insights hidden in our daily thoughts. It boosts compassion, helps us appreciate small joys, and reminds us of past triumphs—building inner wisdom we can rely on.",
      img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop",
    },
    {
      title: "How to Start Reflecting",
      text: "Start small—just five minutes before bed. Ask yourself simple questions like 'What went well today?' or 'What could I improve?' Use a reflection journal or voice notes. The goal is not perfection, but gentle curiosity about your thoughts and behaviors.",
      img: "https://images.unsplash.com/photo-1676335834780-b087d202e18a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Breaking Unhealthy Patterns",
      text: "Reflection shines a light on repetitive habits and mental loops. Becoming aware of triggers—like overthinking people’s opinions—helps us respond consciously rather than react unconsciously.",
      img: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=800&auto=format&fit=crop",
    },
    {
      title: "Compassion in Daily Reflection",
      text: "Self-compassion was one of reflection’s greatest gifts. Rather than judging myself, I learned to celebrate small wins and forgive my flaws. It turned reflection into an act of emotional self-care.",
      img: "https://images.unsplash.com/photo-1704913168043-5420e6523a81?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Setting Intentions",
      text: "Reflection also helps plan tomorrow with purpose. Rather than a to-do list, I focus on how I want to feel and show up. This gives my day direction based on values, not just tasks.",
      img: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=800&auto=format&fit=crop",
    },
    {
      title: "Evening Reflection for Peace",
      text: "Evenings are a beautiful time to reflect and release the day. It clears lingering stress and prepares you for restful sleep. It’s how I now close each day—calm, centered, and grateful.",
      img: "https://images.unsplash.com/photo-1742410938378-eebf3d069702?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Conclusion",
      text: "Daily reflection isn’t about performance—it’s about presence. It helps us live deliberately, know ourselves deeply, and move through life with more gratitude and clarity. It’s how I became more connected, resilient, and true to myself.",
      img: "https://images.unsplash.com/photo-1484417894907-623942c8ee29?q=80&w=800&auto=format&fit=crop",
    },
  ];

  return (
    <div>
      <div className="bg-gradient-to-b from-[#DCEFFF] text-[#3E5973] font-Livvic px-4 pt-10 pb-10 relative z-10">
        {/* Back Button */}
        <motion.button
          whileHover={{ scale: 1.05, backgroundColor: "#aad3f5" }}
          className="p-3 text-xl border border-[#3E5973] rounded-full mb-2 flex items-center gap-2 transition-all"
          onClick={() => navigate("/")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Return back to Home
        </motion.button>

        {/* Main Content */}
        <div className="relative z-10 w-full max-w-[1200px] mx-auto -mb-28 md:-mb-48">
          <div className="border-2 border-[#3E5973] rounded-3xl p-6 sm:p-10 bg-[#DCEFFF] shadow-xl">
            {/* Heading */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="text-center mb-12"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                The Power of Daily Reflection
              </h1>
              <p className="text-base sm:text-lg md:text-xl max-w-2xl pt-6 mx-auto">
                How a Few Minutes Can Transform Your Day
              </p>
              <div className="h-[2px] w-5/6 bg-[#3E5973] rounded-full mx-auto mt-10"></div>
            </motion.section>

            {/* Content Sections with Images */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="space-y-12"
            >
              {content.map((section, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className={`flex flex-col sm:flex-row border ${
                    positionPattern[i] === "right" ? "sm:flex-row-reverse" : ""
                  } gap-6 items-center sm:items-start bg-[#DCEFFF] rounded-xl p-4 hover:shadow-lg transition-all`}
                >
                  <img
                    src={section.img}
                    alt={section.title}
                    className="rounded-xl w-40 h-28 object-cover"
                  />
                  <div>
                    <h2 className="text-xl sm:text-2xl font-semibold mb-2">
                      {section.title}
                    </h2>
                    <p className="text-base sm:text-lg text-[#3E5973]">
                      {section.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.section>

            {/* Closing Quote */}
            <motion.section
              className="text-center pt-16 "
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <h1 className="text-2xl sm:text-3xl md:text-4xl italic text-[#3E5973] mb-8 pt-20">
                “Be still with yourself until the object of your attention
                affirms your presence.”
              </h1>
              <p className="text-[#3E5973] text-lg font-medium text-right pb-20">
                — Sharmeen Tariq
              </p>
            </motion.section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default DailyReflection;
