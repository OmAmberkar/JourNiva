import React, { useState } from "react";
import { PiUserCircleFill } from "react-icons/pi";
import { IoLockClosedOutline, IoLockOpenOutline } from "react-icons/io5";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { MdOutlineMailOutline } from "react-icons/md";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#DCEFFF]">
      {/* Left Side */}
      <div className="hidden md:flex flex-col justify-center items-center md:w-1/2 lg:w-2/5 bg-[#3E5973] text-white px-8 text-center">
        <img src="/Logo.png" alt="Icon" className="w-32 h-32 mb-6" />
        <p className="text-3xl font-medium">
          Your thoughts matter |<br />Your growth deserves space.
        </p>
      </div>

      {/* Right Side */}
      <div className="w-full md:w-1/2 lg:w-3/5 flex flex-col justify-center items-center px-6 py-12 sm:px-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl text-[#3E5973] mb-10 text-center">
          Start Writing Now...
        </h1>

        <form className="w-full max-w-md space-y-8">
          {/* Username */}
          <div className="flex items-center border-2 border-[#3E5973] bg-[#C7D7EC] rounded-[25px] px-4 py-2 h-15">
            <PiUserCircleFill className="text-[#3E5973] w-8 h-8 sm:w-10 sm:h-10 mr-3" />
            <input
              type="text"
              placeholder="UserName"
              className="bg-transparent w-full text-[#3E5973] placeholder-[#3E5973] outline-none text-lg sm:text-xl"
            />
          </div>

          {/* Email */}
          <div className="flex items-center border-2 border-[#3E5973] bg-[#C7D7EC] rounded-[25px] px-4 py-2 h-15">
            <MdOutlineMailOutline className="text-[#3E5973] w-8 h-8 sm:w-10 sm:h-10 mr-3" />
            <input
              type="email"
              placeholder="abc@gmail.com"
              className="bg-transparent w-full text-[#3E5973] placeholder-[#3E5973] outline-none text-lg sm:text-xl"
            />
          </div>

          {/* Password */}
          <div className="flex items-center border-2 border-[#3E5973] bg-[#C7D7EC] rounded-[25px] px-4 py-2 h-15">
            <IoLockClosedOutline className="text-[#3E5973] w-8 h-8 sm:w-10 sm:h-10 mr-3" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Choose Password"
              className="bg-transparent w-full text-[#3E5973] placeholder-[#3E5973] outline-none text-lg sm:text-xl"
            />
            {showPassword ? (
              <FiEye
                className="text-[#3E5973] w-6 h-6 sm:w-8 sm:h-8 cursor-pointer"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <FiEyeOff
                className="text-[#3E5973] w-6 h-6 sm:w-8 sm:h-8 cursor-pointer"
                onClick={() => setShowPassword(true)}
              />
            )}
          </div>

          {/* Confirm Password */}
          <div className="flex items-center border-2 border-[#3E5973] bg-[#C7D7EC] rounded-[25px] px-4 py-2 h-15">
            <IoLockOpenOutline className="text-[#3E5973] w-8 h-8 sm:w-10 sm:h-10 mr-3" />
            <input
              type="password"
              placeholder="Confirm Password"
              className="bg-transparent w-full text-[#3E5973] placeholder-[#3E5973] outline-none text-lg sm:text-xl"
            />
            {showPassword ? (
              <FiEye
                className="text-[#3E5973] w-6 h-6 sm:w-8 sm:h-8 cursor-pointer"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <FiEyeOff
                className="text-[#3E5973] w-6 h-6 sm:w-8 sm:h-8 cursor-pointer"
                onClick={() => setShowPassword(true)}
              />
            )}
          </div>

          {/* Additional Field (optional) */}
          <div className="flex items-center border-2 h-15 mb-15 border-[#3E5973] bg-[#C7D7EC] rounded-[25px] px-4 py-2">
            <input
              type="text"
              placeholder=""
              className="bg-transparent w-full text-[#3E5973] placeholder-[#3E5973] outline-none text-lg sm:text-xl"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-[#3E5973] text-white w-1/3 mx-auto block h-15  text-3xl rounded-[25px] hover:bg-[#2e4a63] transition"
          >
            Create
          </button>

          {/* Login Redirect */}
          <div className="text-center text-[#3E5973] text-md sm:text-lg">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-[#3f76a9] underline hover:text-[#2c608c]"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
