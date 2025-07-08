import React from "react";
import { Link,useNavigate } from "react-router"; // ✅ Import Link
import BackGround from "../assets/BackGround.png";



export default function Header() {
  const navigate = useNavigate()
  return (
    <div
      id="Home"
      className="bg-[#DCEFFF] font-Livvic mt-15 pb-20 sm:pb-24 md:pb-28 lg:pb-32"
    >
      <div className="flex justify-center items-center px-4">
        <div
          className="rounded-2xl overflow-hidden w-full max-w-[1140px] h-[60vh] sm:h-[500px] md:h-[600px] bg-cover bg-center flex items-center justify-center relative"
          style={{ backgroundImage: `url(${BackGround})` }}
        >
          <div className="relative z-10 text-center text-white px-4">
            <h1 className="text-4xl sm:text-6xl md:text-7xl mb-4">JourNiva</h1>
            <p className="text-2xl sm:text-3xl mb-12">
              Your personal growth starts here
            </p>

            <div className="flex justify-center gap-6 flex-wrap">
              <button className="w-[200px] bg-[#3E5973] hover:bg-[#324b60] text-white px-8 py-2 rounded-full border border-[#a8b4d0] shadow-md transition-all duration-200" onClick={() => {navigate('/getstarted')}}>
                Get Started
              </button>

              {/* ✅ "Learn More" navigates to About page's #howtoreflect section */}
              <Link to="/about#Home">
                <button className="w-[200px] bg-[#a8b4d0] hover:bg-[#9aa7c1] text-[#324b60] px-8 py-2 rounded-full border border-[#3E5973] shadow-md transition-all duration-200">
                  Learn More
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
