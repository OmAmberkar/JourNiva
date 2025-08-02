/* eslint-disable no-unused-vars */
import React,{useState} from 'react'
import { IoLockClosedOutline, IoLockOpenOutline } from "react-icons/io5";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate, useSearchParams } from "react-router";
import axios from "axios";
import { toast } from 'sonner';

function ResetPassword() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showCPassword, setShowCPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token  = searchParams.get("token");
    const userId = searchParams.get("id");

    if (!token || !userId) {
      toast.error("Invalid or expired link.")
    }
    console.log(token, userId);

    const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
 

  if (password !== confirmPassword) {
    toast.error("Passwords do not match!");
    setLoading(false);
    return;
  }

  if (password.length < 6) {
    toast.warning("Password must be at least 6 characters.");
    setLoading(false);
    return;
  }

  try {
    const res = await axios.post("http://localhost:4000/api/user/reset-password", {
      token,
      newPassword: password,
      userId,
    });

    if (res.status === 200) {
      toast.success("Password reset successfully. Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    }
  } catch (error) {
    toast.error("Reset failed. Please try again.");
  } finally {
    setLoading(false);
  }
};

    
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#c3d7e8] text-[#3E5973]">
      
        <form className="w-full max-w-lg space-y-8 p-6 rounded-lg text-center bg-[#c3d7e8] shadow-[0_0_50px_#3b74aa]">
            <h1 className='font-bold! text-3xl'>Reset Password</h1>
      <p>Please enter your new password below.</p>
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

                  <button
        type="submit"
        disabled={loading}
        className="w-full text-xl !font-semibold bg-[#3E5973] text-white py-3 rounded-[25px]"
        onClick={handleSubmit}
      >
        {loading ? "Change is in process..." : "Reset"}
      </button>
        </form>
    </div>
  )
}

export default ResetPassword
