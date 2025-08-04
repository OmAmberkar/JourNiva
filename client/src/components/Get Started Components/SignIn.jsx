import React, { useState } from "react";
import { FiEyeOff, FiEye } from "react-icons/fi";
import { useNavigate } from "react-router";
import { IoLockClosedOutline } from "react-icons/io5";
import { PiUserCircleFill } from "react-icons/pi";
import { toast } from "sonner";
import { LhandleForgetPassword, LhandleSubmitApi } from "../../api/userApi";

function SignIn({ email, avatarUrl, name }) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error] = useState(null);
  const navigate = useNavigate();

  //Login/SignIn Route 1
  const handleSubmit = async (e) => {
  e.preventDefault();
  const res = await LhandleSubmitApi({
    email,
    password,
    setLoading,
  })
    if (res.status === 200) {
      localStorage.setItem("accessToken", res.data.accessToken);
      navigate("/dashboard");
    }
 
};


//Login/SignIn Route 2
  const handleForgotPassword = async(e) => {
    e.preventDefault();
    
    const res = await LhandleForgetPassword({
      email,
      setLoading,
    })
      if (res.status === 200) {
        navigate("/forgot-password-sent");
      } else {
        toast.error("Failed to send reset password link.");
      }
    
  };


  return (
    <form className="w-full space-y-6 text-center">
      {avatarUrl && (
        <div className="flex justify-center mb-4">
          <img
            src={avatarUrl}
            alt="User Avatar"
            className="w-50 h-50 rounded-full border-2 border-[#3E5973]"
          />
        </div>
      )}

      {name && (
        <h1 className="text-5xl font-semibold text-[#3E5973] mb-6 text-center">
          Welcome <br /> {name}
          {" !!"}
        </h1>
      )}

      <div className="flex items-center border-2 h-[60px] border-[#3E5973] text-[#3E5973] bg-[#c3d7e8] rounded-[25px] px-4 py-2">
        <PiUserCircleFill className="text-[#3E5973] mr-2 w-8 h-8" />
        <input
          type="email"
          readOnly
          className="bg-transparent w-full outline-none text-lg text-[#3E5973] placeholder-[#3E5973]"
          value={email}
        />
      </div>

      <div className="flex items-center border-2 border-[#3E5973] bg-[#c3d7e8] rounded-[25px] px-4 h-[60px]">
        <IoLockClosedOutline className="text-[#3E5973] mr-2 w-6 h-6" />
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Enter password"
          className="w-full bg-transparent outline-none text-[#3E5973] text-lg"
          value={password}
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {showPassword ? (
          <FiEyeOff
            className="cursor-pointer w-6 h-6 text-[#3E5973]"
            onClick={() => setShowPassword(false)}
          />
        ) : (
          <FiEye
            className="cursor-pointer w-6 h-6 text-[#3E5973]"
            onClick={() => setShowPassword(true)}
          />
        )}
      </div>
      {error && <p className="text-red-600 text-center">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full border-2 border-[#3E5973] bg-[#3E5973] text-[#c3d7e8] py-3 text-xl rounded-[25px] !font-semibold hover:bg-[#c3d7e8] hover:text-[#3E5973]"
        onClick={handleSubmit}
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      <a
        onClick={handleForgotPassword}
        className="text-sm text-blue-600 !font-semibold hover:underline hover:text-blue-800 transition duration-200 "
      >
        Forgot Password ??
      </a>
    </form>
  );
}

export default SignIn;
