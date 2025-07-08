import React, { useState } from "react";
import { PiUserCircleFill } from "react-icons/pi";
import { IoLockClosedOutline, IoLockOpenOutline } from "react-icons/io5";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { MdOutlineMailOutline } from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router";

function GetStarted() {
  const [step, setStep] = useState("start"); // start, login, signup
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState("");
  const navigate = useNavigate();

  //   checks if the email exists in the database
  const checkEmailExists = async (email) => {
    try {
      const res = await axios.post(
        "http://localhost:4000/api/user/check-email",
        {
          email: email.toLowerCase(),
        }
      );
      return res.data.status; // 0 for new, 1 for existing
    } catch (error) {
      console.error("Error checking email:", error);
      setError("Server error. Try again.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  //   Handles the initial form submission to check if the email exists
  const handleInitialSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const status = await checkEmailExists(email);

    if (status === 0) {
      setStep("signup");
    } else if (status === 1) {
      setStep("login");
    } else {
      setError("Unexpected server response.");
    }
  };

  //   Handles the login process
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        "http://localhost:4000/api/user/login",
        {
          email,
          password,
        }
      );
      if (response.status === 200) {
        console.log("Login successful", response.data);
        setLoading(false);
        navigate("/");
      } else {
        console.log("Login failed", response.data.message);
        setError("Login failed. Try again.");
      }
    } catch (error) {
      console.error(
        "Error during login:",
        error.response?.data?.message || error.message
      );
      setError("Login failed. Try again.");
    }
  };

  //   Handles the registration process
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    

    try {

        console.log("Registering:", { name, email, password, avatarUrl });
      const response = await axios.post(

        "http://localhost:4000/api/user/register",
        {
          name,
          email,
          password,
          avatarUrl,
        }
      );
      if (response.status === 201) {
        console.log("Registration successful", response.data);
        setLoading(false);
        navigate("/");
      } else {
        console.log("Registration failed", response.data.message);
        setLoading(false);
      }
    } catch (error) {
      console.error(
        "Error during registration:",
        error.response?.data?.message || error.message
      );
      setError("Registration failed. Try again.");
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center bg-[#DCEFFF] min-h-screen py-10 px-4 justify-center">
      <h1 className="text-4xl md:text-5xl font-semibold text-[#3E5973] text-center mb-10">
        Welcome, User
      </h1>

      <form
        className="space-y-6 w-full"
        onSubmit={
          step === "start"
            ? handleInitialSubmit
            : step === "login"
            ? handleLogin
            : handleRegister
        }
      >
        {/* Email Input (always shown) */}
        <div className="flex items-center border-2 h-[60px] border-[#3E5973] bg-[#c3d7e8] rounded-[25px] px-4 py-2">
          <PiUserCircleFill className="text-[#3E5973] mr-2 w-8 h-8" />
          <input
            type="email"
            placeholder="Enter your email"
            required
            disabled={step !== "start"}
            className="bg-transparent w-full outline-none text-lg text-[#3E5973] placeholder-[#3E5973]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Registration: Username */}
        {step === "signup" && (
          <div className="flex items-center border-2 h-[60px] border-[#3E5973] bg-[#C7D7EC] rounded-[25px] px-4 py-2">
            <PiUserCircleFill className="text-[#3E5973] mr-2 w-8 h-8" />
            <input
              type="text"
              placeholder="Enter Username"
              required
              className="bg-transparent w-full outline-none text-lg text-[#3E5973]"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}

        {/* Password Field */}
        {(step === "login" || step === "signup") && (
          <div className="flex items-center border-2 h-[60px] border-[#3E5973] bg-[#c3d7e8] rounded-[25px] px-4 py-2">
            <IoLockClosedOutline className="text-[#3E5973] mr-2 w-8 h-8" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              required
              className="bg-transparent w-full outline-none text-lg text-[#3E5973]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {showPassword ? (
              <FiEyeOff
                onClick={() => setShowPassword(false)}
                className="cursor-pointer w-6 h-6 text-[#3E5973]"
              />
            ) : (
              <FiEye
                onClick={() => setShowPassword(true)}
                className="cursor-pointer w-6 h-6 text-[#3E5973]"
              />
            )}
          </div>
        )}

        {/* Confirm Password */}
        {step === "signup" && (
          <div className="flex items-center border-2 h-[60px] border-[#3E5973] bg-[#c3d7e8] rounded-[25px] px-4 py-2">
            <IoLockOpenOutline className="text-[#3E5973] mr-2 w-8 h-8" />
            <input
              type={showCPassword ? "text" : "password"}
              placeholder="Confirm Password"
              required
              className="bg-transparent w-full outline-none text-lg text-[#3E5973]"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {showCPassword ? (
              <FiEyeOff
                onClick={() => setShowCPassword(false)}
                className="cursor-pointer w-6 h-6 text-[#3E5973]"
              />
            ) : (
              <FiEye
                onClick={() => setShowCPassword(true)}
                className="cursor-pointer w-6 h-6 text-[#3E5973]"
              />
            )}
          </div>
        )}

        {/* avatar url */}
        {step === "signup" && (
          <div className="flex flex-wrap justify-center gap-4">
            {["WhiteBooks.png", "Logo.png", "Ring.png", "ManWithPlant.png"].map(
              (img) => (
                <img
                  key={img}
                  src={`/${img}`}
                  alt="avatar"
                  className={`w-16 h-16 rounded-full cursor-pointer border-2 bg-red-400 ${
                    avatarUrl === `/avatars/${img}`
                      ? "border-[#3E5973]"
                      : "border-transparent"
                  }`}
                  onClick={() => setAvatarUrl(`/avatars/${img}`)}
                />
              )
            )}
          </div>
        )}

        {/* Error Message */}
        {error && <p className="text-red-600 text-center">{error}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#3E5973] text-white text-lg py-3 rounded-[25px] hover:bg-[#2d445a] transition"
          disabled={loading}
        >
          {loading
            ? "Loading..."
            : step === "start"
            ? "Get Started"
            : step === "login"
            ? "Login"
            : "Register"}
        </button>
      </form>
    </div>
  );
}

export default GetStarted;
