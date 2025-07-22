/* eslint-disable no-unused-vars */
import React from "react";
import Footer from "../Common Components/Footer";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";

const sections = [
  {
    title: "The Power of Habit Tracking",
    text: "If you want to stick with a habit for good, one simple and effective thing you can do is keep a habit tracker. Elite performers measure progress constantly. Habit tracking offers feedback and helps visualize progress, which is often delayed when building habits.",
    img: "https://images.unsplash.com/photo-1607082349566-187342175e2f?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "What Is a Habit Tracker?",
    text: "A habit tracker is a simple way to measure whether you did a habit. It’s a visual system—like crossing off a calendar—used to monitor consistency and momentum. This can provide immediate satisfaction and motivation.",
    img: "https://plus.unsplash.com/premium_photo-1723575679464-4d51b1b4ad23?q=80&w=1957&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    title: "3 Key Benefits",
    text:
      "1. A habit tracker reminds you to act.\n2. It motivates continued progress.\n3. It provides immediate satisfaction.",
    img: "https://images.unsplash.com/photo-1579047917338-a6a69144fe63?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    title: "Daily, Weekly & Monthly Habits",
    text:
      "Daily: journal, meditate, stretch, call mom.\nWeekly: blog post, laundry, tidy room.\nMonthly: pay bills, review finances, deep clean.",
    img: "https://images.unsplash.com/photo-1633526543814-9718c8922b7a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    title: "Build the Habit of Tracking",
    text:
      "Use habit stacking: “After [current habit], I will [track my habit].”\nExamples:\n• After meditating, mark your tracker.\n• After brushing teeth, check your habit box.",
    img: "https://images.unsplash.com/photo-1730382625230-3756013c515c?q=80&w=1141&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    title: "How Long Does It Take?",
    text: "There’s no universal number—habits are for life. Instead of asking how long it takes, ask how long you can maintain consistency. The goal is small, sustainable progress every day.",
    img: "https://images.unsplash.com/photo-1439754389055-9f0855aa82c2?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

function HabitTracker() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="bg-[#DCEFFF] text-[#3E5973] font-Livvic px-4 pt-10 pb-10 relative z-10">
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
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Return back to Home
        </motion.button>

        <div className="relative z-10 w-full max-w-[1200px] mx-auto -mb-48">
          <div className="border-2 border-[#3E5973] rounded-3xl p-6 sm:p-10 bg-[#DCEFFF]">
            {/* Header */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              variants={fadeUp}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                The Ultimate Habit Tracker Guide
              </h1>
              <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
                Why and How to Track Your Habits — Inspired by James Clear
              </p>
              <div className="h-[2px] w-5/6 bg-[#3E5973] rounded-full mx-auto mt-10"></div>
            </motion.section>

            {/* Content */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              variants={fadeUp}
              viewport={{ once: true }}
              className="space-y-12"
            >
              {sections.map((sec, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  className="flex flex-col md:flex-row items-center gap-6 bg-[#DCEFFF] p-4 rounded-xl"
                >
                  <img
                    src={sec.img}
                    alt={sec.title}
                    className="w-full md:w-1/3 h-50 object-cover rounded-xl"
                  />
                  <div className="md:w-2/3">
                    <h2 className="text-2xl font-semibold mb-2">{sec.title}</h2>
                    <p className="text-base sm:text-lg whitespace-pre-line">{sec.text}</p>
                  </div>
                </motion.div>
              ))}
            </motion.section>

            {/* Footer Quote */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              variants={fadeUp}
              viewport={{ once: true }}
              className="text-center pt-16"
            >
              <p className="text-2xl italic mb-4">
                “A habit is a lifestyle to be lived, not a finish line to be crossed.”
              </p>
              <p className="font-medium text-right">— James Clear</p>
            </motion.section>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default HabitTracker;
