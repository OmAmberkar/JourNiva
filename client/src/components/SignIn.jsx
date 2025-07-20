import React, { useState } from "react";
import { FiEyeOff, FiEye } from "react-icons/fi";
import { useNavigate } from "react-router";
import { IoLockClosedOutline } from "react-icons/io5";
import { PiUserCircleFill } from "react-icons/pi";
import axios from "axios";

function SignIn({ email, avatarUrl, name }) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post("http://localhost:4000/api/user/login", {
        email,
        password
      });

      if (res.status === 200) {
        navigate("/dashboard");
        setLoading(false)
      } else {
        setError("Invalid Credentails.");
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setError("Login Failed. Please try again.");
      setLoading(false);
    }
  };
  return (
    <form className="w-full space-y-6">
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
          Welcome <br /> {name}{" !!"}
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
        className="w-full bg-[#3E5973] text-white py-3 rounded-[25px]"
        onClick={handleSubmit}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}

export default SignIn;
