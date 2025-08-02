import React, { useState } from "react";
import axios from "axios";
import { PiUserCircleFill } from "react-icons/pi";
import SignIn from "../components/Get Started Components/SignIn";
import SignUp from "../components/Get Started Components/SignUp";
import GoogleSignInButton from "../components/Common Components/GoogleSignInButton";
import { toast } from "sonner";


function GetStarted() {
  const [step, setStep] = useState("start");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [avatarUrl ,setAvatarUrl] = useState("")
  const [username, setUsername] = useState("")

  const checkEmailExists = async (email) => {
    try {
      const res = await axios.post("http://localhost:4000/api/user/check-email", {
        email: email.toLowerCase(),
      });
      return res.data; // 0 = new user, 1 = existing user, avatrUrl too 
    } catch (err) {
      const message = err?.response?.data?.message || "Unknown error";
      if(message.includes("Google Account Detected - Please Sign In with Google!")){
        toast.error("Google account found. Please use 'Sign in with Google'");
      }
      else if (message.includes("Invalid Email Format!")){
        toast.error("Invalid Email Format!");
      }
      else if (message.includes("Email is required!")){
        toast.error("Email is required!");
      }
      else {
        toast.error("Server error.Please try again.")
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInitialSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await checkEmailExists(email);
    const username = res?.user?.name;
    if (res?.status === 0) {
      toast("Looks like you're new! Lets begin with Sign Up");
      setStep("signup");
    } else if (res?.status === 1) {
      toast.success(`Welcome back ${username} !`)
      setStep("login");
      setAvatarUrl(res.user?.avatarUrl || "")
      setUsername(res.user?.name)
    }
  };

  return (
    <div className="w-full max-w-md mx-auto min-h-screen flex flex-col justify-center items-center bg-[#DCEFFF] p-4">

      {step === "start" && (
        <><h1 className="text-4xl font-semibold text-[#3E5973] mb-6 text-center">Welcome, User</h1>
        <form onSubmit={handleInitialSubmit} className="w-full space-y-6">
          <div className="flex items-center border-2 border-[#3E5973] bg-[#c3d7e8] rounded-[25px] px-4 h-[60px]">
            <PiUserCircleFill className="text-[#3E5973] mr-2 w-8 h-8" />
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full bg-transparent outline-none text-[#3E5973] placeholder-[#3E5973] text-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required />
          </div>
          {error && <p className="text-red-600 text-center">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#3E5973] text-white py-3 rounded-[25px]"
          >
            {loading ? "Loading..." : "Get Started"}
          </button>
          <div className="mb-4 w-full">
            <GoogleSignInButton />
          </div>
        </form></>
      )}

      {step === "login" && <SignIn email={email} avatarUrl={avatarUrl} name={username} />}
      {step === "signup" && <SignUp email={email}  />}
    </div>
  );
}

export default GetStarted;
