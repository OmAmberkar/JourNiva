import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { IoLockClosedOutline, IoLockOpenOutline } from "react-icons/io5";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { PiUserCircleFill } from "react-icons/pi";

const avatars = [
  "https://imagizer.imageshack.com/img924/4476/roJLyv.png",
  "https://images.unsplash.com/photo-1579445710183-f9a816f5da05?q=80&w=729&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1563296704-6df0d360b9ab?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://imagizer.imageshack.com/img923/4397/W1kTjr.png",
];

function SignUp({ email }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    } else if (!avatarUrl) {
      setError("Please select an avatar.");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post("http://localhost:4000/api/user/register", {
        email: email.toLowerCase(),
        name: username,
        password,
        avatarUrl,
      });
      if (res.status === 201) {
        localStorage.setItem("accessToken",res.data.accessToken)
        navigate("/verify", {
          state: {
            userId: res.data.user.userId,
            name: res.data.user.name,
            email: res.data.user.email,
            avatarUrl: res.data.user.avatarUrl,
          },
        });
      } else {
        console.log("Check the entered filleds");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setError("Signup Failed. Please try again.");
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="w-full space-y-6">
      <div className="flex items-center">
        <img
          src={
            avatarUrl && avatarUrl.trim() !== ""
            ? avatarUrl
            : "https://imagizer.imageshack.com/img924/4476/roJLyv.png"
          }
          onClick={() => setIsModalOpen(true)}
          className="w-20 h-20 rounded-full border-2 border-[#3E5973] cursor-pointer"
          alt="avatar"
        />
      </div>

      {isModalOpen && (
        <div className="fixed left-10 inset-0 flex items-center bg-opacity-40 z-50">
          <div className="bg-black/70 rounded-lg p-4 max-w-sm w-full shadow-lg relative">
            <h2 className="text-center text-lg font-semibold mb-4">
              Choose an Avatar
            </h2>

            <div className="flex flex-wrap justify-center gap-3">
              {avatars.map((img) => (
                <img
                  key={img}
                  src={`${img}`}
                  alt="avatar"
                  onClick={() => {
                    setAvatarUrl(`${img}`);
                    setIsModalOpen(false);
                  }}
                  className={`w-16 h-16 rounded-full cursor-pointer border-2 transition-transform hover:scale-110 border-white ]${
                    avatarUrl === `${img}`
                      ? "border-[#3E5973]"
                      : "border-transparent"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 w-full bg-blue-600 cursor-pointer text-white py-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="flex items-center border-2 border-[#3E5973] bg-[#c3d7e8] rounded-[25px] px-4 h-[60px]">
        <PiUserCircleFill className="text-[#3E5973] mr-2 w-6 h-6" />
        <input
          type="text"
          placeholder="Username"
          className="w-full bg-transparent outline-none text-[#3E5973] text-lg"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>

      <div className="flex items-center border-2 h-[60px] border-[#3E5973] bg-[#c3d7e8] rounded-[25px] px-4 py-2">
        <PiUserCircleFill className="text-[#3E5973] mr-2 w-8 h-8" />
        <input
          type="email"
          placeholder="Enter your email"
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

      <div className="flex items-center border-2 border-[#3E5973] bg-[#c3d7e8] rounded-[25px] px-4 h-[60px]">
        <IoLockOpenOutline className="text-[#3E5973] mr-2 w-6 h-6" />
        <input
          type={showCPassword ? "text" : "password"}
          placeholder="Confirm password"
          className="w-full bg-transparent outline-none text-[#3E5973] text-lg"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {showCPassword ? (
          <FiEyeOff
            className="cursor-pointer w-6 h-6 text-[#3E5973]"
            onClick={() => setShowCPassword(false)}
          />
        ) : (
          <FiEye
            className="cursor-pointer w-6 h-6 text-[#3E5973]"
            onClick={() => setShowCPassword(true)}
          />
        )}
      </div>
      {error && <p className="text-red-600 text-center">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#3E5973] text-white py-3 rounded-[25px]"
      >
        {loading ? "Registering..." : "Register"}
      </button>
    </form>
  );
}

export default SignUp;
