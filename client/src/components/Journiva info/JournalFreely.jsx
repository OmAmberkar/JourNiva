/* eslint-disable no-unused-vars */
import React from "react";
import Footer from "../Common Components/Footer";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";

function JournalingBenefits() {
  const navigate = useNavigate();

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  };

  const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  };

  return (
    <div>
      <div className="bg-gradient-to-b from-[#DCEFFF] text-[#3E5973] font-Livvic px-4 pt-10 pb-10 relative z-10">
        {/* Back Button */}
        <motion.button
          whileHover={{ scale: 1.05, backgroundColor: "#aad3f5" }}
          className="fixed top-6 left-6 z-50 p-3 text-sm sm:text-base border border-[#3E5973] rounded-full flex items-center gap-2 bg-[#dcefff]/80 backdrop-blur-md shadow-md transition-all"
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
            {/* Introduction */}
            <motion.section
              id="intro"
              className="text-center mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                Dive Into Journaling
              </h1>
              <p className="text-base sm:text-lg md:text-xl max-w-2xl pt-10 mx-auto text-[#3E5973]">
                Explore how journaling can improve stress management, mental
                clarity, academic performance, physical health, and more.
              </p>
              <div className="h-[2px] w-5/6 bg-[#3E5973] rounded-full mx-auto mt-10"></div>
            </motion.section>

            {/* Benefits */}
            <motion.section
              className="mb-20"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-6">
                3 Key Benefits of Journaling
              </h2>
              <div className="space-y-8 text-[#3E5973]">
                {[
                  {
                    title: "🧠 Mental Wellness",
                    items: [
                      "Reduces anxiety & depression symptoms through expressive writing",
                      "Helps alleviate stress and enhance self-awareness",
                      "Improves post-traumatic stress and builds emotional resilience",
                    ],
                    img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=799&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                  },
                  {
                    title: "🌿 Physical Health",
                    items: [
                      "Helps you sleep better by journaling before bedtime",
                      "Supports immune function and lowers inflammation",
                      "Linked to better overall physical wellness",
                    ],
                    img: "https://plus.unsplash.com/premium_photo-1731222300629-0701d3160e1d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                  },
                  {
                    title: "🎓 Academic & Cognitive",
                    items: [
                      "Boosts critical thinking, creativity, memory, and goal achievement",
                      "Enhances study habits, productivity, and academic performance",
                    ],
                    img: "https://images.unsplash.com/photo-1500989145603-8e7ef71d639e?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                  },
                ].map((benefit, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    className="flex flex-col sm:flex-row gap-5 items-center sm:items-start bg-[#DCEFFF] rounded-xl p-4  hover:shadow-lg transition-all"
                  >
                    <img
                      src={benefit.img}
                      alt={benefit.title}
                      className="rounded-xl w-40 h-28 object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-lg mb-2">
                        {benefit.title}
                      </h3>
                      <ul className="list-disc pl-6 space-y-1">
                        {benefit.items.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Journaling Styles */}
            <motion.section
              className="mb-20"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-6">
                Popular Journaling Styles
              </h2>
              <div className="grid gap-6 md:grid-cols-3 text-[#3E5973]">
                {[
                  {
                    title: "1. Expressive Writing",
                    desc: "Deep, emotional writing about troubling events—shown to reduce depressive symptoms significantly.",
                    img: "https://images.unsplash.com/photo-1710010966055-da0bcafdbd8c?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                  },
                  {
                    title: "2. Positive Affect Journaling",
                    desc: "Focuses on gratitude and positive experiences; reduces anxiety, boosts well-being and resilience.",
                    img: "https://images.unsplash.com/photo-1588211500239-39d78ed7b505?q=80&w=699&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                  },
                  {
                    title: "3. Three‑Minute Mental Makeover",
                    desc: 'Quick daily prompts like "three gratitudes" or "six‑word story" shown to reduce stress and maintain benefits for months.',
                    img: "https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                  },
                ].map((style, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    className="bg-[#DCEFFF] p-4 rounded-xl shadow-md hover:shadow-lg transition-all"
                  >
                    <img
                      src={style.img}
                      alt={style.title}
                      className="rounded-lg mb-3 object-cover w-full h-36"
                    />
                    <h3 className="font-semibold text-lg">{style.title}</h3>
                    <p className="text-sm mt-2">{style.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* How to Start */}
            <motion.section
              className="mb-20"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-6">
                How to Start & Stick With It
              </h2>
              <div className="space-y-4 text-[#3E5973] text-center">
                {[
                  "Choose a format that suits you—handwritten notes or a phone app.",
                  "Start with short sessions: try one minute of writing, then build up.",
                  "Habit stack: journal after brushing your teeth or before bed.",
                  "Free-write without editing—just let your thoughts flow.",
                ].map((tip, i) => (
                  <motion.p key={i} variants={fadeUp}>
                    {tip}
                  </motion.p>
                ))}
              </div>
            </motion.section>

            {/* Prompts */}
            <motion.section
              className="mb-20"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-6">
                Journaling Prompts to Get You Going
              </h2>
              <ul className="list-disc pl-6 text-[#3E5973] space-y-2 max-w-3xl mx-auto">
                {[
                  "What are three things you're grateful for and why?",
                  "What were the best and worst parts of your day?",
                  "Describe a moment of courage you've experienced.",
                  "Name three energy drains and three energy boosters for you.",
                  "Write three future goals, why they matter, and how you'll get there.",
                ].map((p, i) => (
                  <motion.li key={i} variants={fadeUp}>
                    {p}
                  </motion.li>
                ))}
              </ul>
            </motion.section>

            {/* Conclusion */}
            <motion.section
              className="text-center pt-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <h1 className="text-2xl sm:text-3xl md:text-4xl italic text-[#3E5973] mb-8 pt-20">
                “Your story matters — and journaling can help you uncover it.”
              </h1>
              <p className="text-[#3E5973] text-lg font-medium text-right pb-20">
                — The JourNiva Team
              </p>
            </motion.section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default JournalingBenefits;
