/* eslint-disable no-unused-vars */
import React,{useState} from 'react'
import { IoLockClosedOutline, IoLockOpenOutline } from "react-icons/io5";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate, useSearchParams } from "react-router";
import axios from "axios";

function ResetPassword() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showCPassword, setShowCPassword] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token  = searchParams.get("token");
    const userId = searchParams.get("id");

    if (!token || !userId) {
        return (
            error ? <p className="text-red-600 text-center">{error}</p> : <p className="text-red-600 text-center">Invalid or expired link.</p>
            
        )
    }
    console.log(token, userId);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);
        if(password !== confirmPassword) {
            setError("Passwords do not match.");
            setLoading(false);
            return;
        }
        try {
            const res = await axios.post("http://localhost:4000/api/user/reset-password", {
                token:token,
                newPassword:password,
                userId:userId,
            });
            if (res.status === 200) {
      setSuccess(true);
      navigate("/login"); 
    }
        } catch (error) {
            console.error(error);
            setError("Reset Password Failed. Please try again.");
            setLoading(false);
            return;
        }
    }
    
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
