/* eslint-disable no-unused-vars */
import React from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import Footer from "../Common Components/Footer";

function VisionBoardInfo() {
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

  const content = [
    {
      title: "What Is a Vision Board?",
      text: "A vision board is a visual tool that helps clarify your goals by displaying images, affirmations, and words representing what you want to achieve in life. It serves as a daily reminder of your dreams and helps keep them front and center in your mind.",
      img: "https://plus.unsplash.com/premium_photo-1661515893894-7b48e6e9db85?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Vision Boards and Entrepreneurial Success",
      text: "According to a TD Bank survey, one in five successful entrepreneurs use vision boards. About 76% said their progress aligned with their boards, and 82% achieved more than half of their goals since starting. These boards help anchor focus and determination.",
      img: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=800&auto=format&fit=crop",
    },
    {
      title: "Building Confidence Through Visualization",
      text: "A 2019 study revealed that vision boards enhance confidence by encouraging self-expression and goal discovery. Users become more aware of their strengths and values, helping them believe in their ability to achieve success.",
      img: "https://images.unsplash.com/photo-1573497491208-6b1acb260507?q=80&w=800&auto=format&fit=crop",
    },
    {
      title: "Improving Goal Setting",
      text: "Vision boards help articulate goals visually, making them concrete and specific. Clear goals increase effort and persistence. When you see your dreams clearly, you're more likely to work steadily toward them.",
      img: "https://images.unsplash.com/photo-1628440501245-393606514a9e?q=80&w=1631&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Boosting Self-Concordance",
      text: "Self-concordance refers to goals that align with your internal values and motivations. Vision boards and visual simulations help make your goals feel personally meaningful, resulting in more motivation and emotional satisfaction.",
      img: "https://plus.unsplash.com/premium_photo-1677014616445-b1eb5426081e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Rewiring the Brain for Success",
      text: "Visual stimuli from vision boards can trigger the brain’s priming effect. Regularly seeing goal-related images helps activate goal-relevant thoughts and behaviors, increasing awareness of opportunities and boosting action.",
      img: "https://images.unsplash.com/photo-1732704573802-8ec393009148?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dp",
    },
  ];

  return (
    <div>
      <div className="bg-gradient-to-b from-[#dcefff] text-[#3E5973] font-Livvic px-4 pt-10 pb-10 relative z-10">
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

        {/* Heading */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center mb-12"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            The Power of Vision Boarding
          </h1>
          <p className="text-base sm:text-lg md:text-xl max-w-2xl pt-6 mx-auto">
            How Visualization Drives Success & Goal Achievement
          </p>
          <div className="h-[2px] w-5/6 bg-[#3E5973] rounded-full mx-auto mt-10"></div>
        </motion.section>

        {/* Content Sections */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="space-y-12 max-w-[1200px] mx-auto"
        >
          {content.map(({ title, text, img }, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="flex flex-col sm:flex-row gap-6 items-center bg-[#DCEFFF] rounded-xl p-4 hover:shadow-lg transition-all"
            >
              <img
                src={img}
                alt={title}
                className="rounded-xl w-40 h-28 object-cover flex-shrink-0"
              />
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold mb-2">
                  {title}
                </h2>
                <p className="text-base sm:text-lg text-[#3E5973]">{text}</p>
              </div>
            </motion.div>
          ))}
        </motion.section>
      </div>

      <Footer />
    </div>
  );
}

export default VisionBoardInfo;
