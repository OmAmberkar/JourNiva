/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import OTPInput from "react-otp-input";
import { motion } from "framer-motion";
import { ClockIcon } from "@heroicons/react/24/outline";

function Verification() {
  const [otp, setOtp] = useState("");
  const [resendTimer, setResendTimer] = useState(30);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState("");
  const [verified, setVerified] = useState(false);
  const [otpExpiryTimer, setOtpExpiryTimer] = useState(120); // 2 mins (in seconds)

  const navigate = useNavigate();
  const { state } = useLocation();
  const userId = state?.userId;
  const username = state?.name;

  // Redirect or block page if userId is missing
  useEffect(() => {
    if (!userId) {
      console.error("Missing userId — Redirecting...");
      navigate("/signup");
    }
  }, [userId, navigate]);

  // Countdown for resend button freeze effect
  useEffect(() => {
    if (resendTimer <= 0) return;
    const timer = setInterval(() => setResendTimer((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [resendTimer]);

  // OTP timer
  useEffect(() => {
    if (otpExpiryTimer <= 0) return;
    const otpTimer = setInterval(() => setOtpExpiryTimer((t) => t - 1), 1000);
    return () => clearInterval(otpTimer);
  }, [otpExpiryTimer]);

  // Auto-verifies OTP when 6 digits are entered
  useEffect(() => {
    if (otp.length === 6) {
      const verifyOtp = async () => {
        setVerifying(true);
        setError("");
        try {
          const res = await axios.post(
            "http://localhost:4000/api/user/verify-otp",
            {
              userId,
              otp,
            }
          );

          if (res.data.status === "success") {
            setVerified(true);
            setTimeout(() => {
              navigate("/dashboard", { state: { user: res.data.user } });
            }, 2000);
          }
        } catch (err) {
          console.error("OTP verification failed:", err);
          setError("Invalid or expired OTP. Please try again.");
          setOtp("");
        } finally {
          setVerifying(false);
        }
      };

      verifyOtp();
    }
  }, [otp, userId, navigate]);

  // Resend OTP API
  const handleResend = async () => {
    if (resendTimer > 0 || verifying) return;

    setResendTimer(30);
    setOtp("");
    setError("");
    setOtpExpiryTimer(120);

    try {
      await axios.post("http://localhost:4000/api/user/resend-otp", { userId });
    } catch (err) {
      console.error("Resend OTP failed:", err);
      setError("Failed to resend OTP. Try again later.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#c3d7e8] px-4">
      <div className="text-2xl font-semibold text-[#3E5973] mb-6 text-center">
        <span className="text-4xl !font-semibold ">Hey {username} ,</span>{" "}
        <br />
        Lets complete your verification in seconds ....
      </div>
      <div className="bg-[#c3d7e8] border-2 border-[#3E5973] shadow-lg rounded-xl p-8 max-w-xl h-100 w-full text-center  ">
        <div className="text-md font-semibold text-[#3E5973] mb-20">
          Please enter the otp received on your valid email
        </div>

        <OTPInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          disabled={otpExpiryTimer <= 0}
          renderSeparator={
            <span className="mx-1 w-20 text-[#3E5973] font-extrabold ">
              <div className="border-2 rounded-4xl w-5 border-[#3E5973] "></div>
            </span>
          }
          renderInput={(props) => (
            <input
              {...props}
              className="!w-15 h-20 border-2 border-[#3E5973] text-[#3E5973] rounded-lg text-center text-4xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          )}
          inputType="tel"
        />
        <div className="mt-4 text-lg text-[#3E5973] font-medium">
          Time remaining to verify:{" "}
          <span className="!font-bold">
            {Math.floor(otpExpiryTimer / 60)}:
            {String(otpExpiryTimer % 60).padStart(2, "0")}
          </span>
        </div>

        {verifying && (
          <div>
          <motion.div
            initial={{ scale: 1, rotate: 0 }}
            animate={{ scale: [1, 1.05, 1], rotate: [0, 360] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="mt-4 flex flex-col items-center text-blue-700"
          >
            <div className="text-3xl">
              <ClockIcon />
            </div>
          </motion.div>
          <p className="text-blue-500">Hold on we are verifying</p>
          </div>
        )}

        {verified && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.2, opacity: 1 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="mt-4 text-green-800 bg-green-500 rounded p-2 font-semibold"
          >
            ✅ Verified Successfully
          </motion.div> 
        )}

        {error && <p className="mt-3 text-red-600 text-sm">{error}</p>}

        <div className="mt-20">
          <button
            onClick={handleResend}
            disabled={resendTimer > 0 || verifying}
            className={`py-2 px-6 rounded-full font-medium text-2xl transition-all duration-300 ${
              resendTimer > 0
                ? "bg-[#c3d7e8] text-[#3E5973] cursor-not-allowed"
                : "bg-[#3E5973] text-[#c3d7e8] hover:bg-[#c3d7e8] hover:text-[#3E5973] border-[#3E5973] border-2 "
            }`}
          >
            {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend OTP"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Verification;
