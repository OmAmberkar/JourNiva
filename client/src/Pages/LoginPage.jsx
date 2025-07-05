import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PiUserCircleFill } from "react-icons/pi";
import { IoLockClosedOutline } from "react-icons/io5";
import { FiEyeOff, FiEye } from "react-icons/fi";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
    navigate("/"); 
  };

  return (
    <div className="flex flex-col min-h-screen items-center bg-[#DCEFFF] relative px-4 py-10">
      {/* Avatar */}
      <img
        src="/Logo.png"
        alt="User Avatar"
        className="w-36 h-36 rounded-full bg-[#3E5973] absolute top-6 left-1/2 transform -translate-x-1/2 md:static md:translate-x-0 lg:-translate-x-130 lg:translate-y-30  md:mb-6"
      />

      {/* Form Container */}
      <div className="w-full max-w-md mt-44 md:mt-4">
        <h1 className="text-4xl md:text-5xl font-semibold text-[#3E5973] text-center mb-16">
          Welcome, User
        </h1>

        <form className="space-y-8" onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="flex items-center border-2 h-[60px] border-[#3E5973] bg-[#c3d7e8] rounded-[25px] px-4 py-2">
            <PiUserCircleFill className="text-[#3E5973] mr-2 w-10 h-10" />
            <input
              type="email"
              placeholder="Enter your email"
              required
              className="bg-transparent w-full outline-none text-xl text-[#3E5973] placeholder-[#3E5973]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password Field */}
          <div className="flex items-center border-2 h-[60px] border-[#3E5973] bg-[#c3d7e8] rounded-[25px] px-4 py-2">
            <IoLockClosedOutline className="text-[#3E5973] mr-2 w-10 h-10" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              required
              className="bg-transparent w-full outline-none text-xl text-[#3E5973] placeholder-[#3E5973]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {showPassword ? (
              <FiEye
                onClick={() => setShowPassword(false)}
                className="text-[#3E5973] cursor-pointer w-8 h-8"
              />
            ) : (
              <FiEyeOff
                onClick={() => setShowPassword(true)}
                className="text-[#3E5973] cursor-pointer w-8 h-8"
              />
            )}
          </div>

          {/* Checkbox & Forgot Password */}
          <div className="flex flex-col sm:flex-row items-center justify-between text-[#3E5973] text-base gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <div className="relative w-5 h-5">
                <input
                  type="checkbox"
                  className="peer absolute w-5 h-5 appearance-none bg-[#DCEFFF] border-2 border-[#3E5973] rounded focus:ring-2 checked:bg-[#3E5973]"
                />
                <svg
                  className="absolute w-5 h-5 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-lg">Remember me</span>
            </label>

            <a
              href="#"
              className="hover:underline hover:text-[#1e3c57] transition text-lg"
            >
              Forgot Password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-[#3E5973] text-white w-full h-12 text-xl py-2 rounded-[25px] hover:bg-[#2e4a63] transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
