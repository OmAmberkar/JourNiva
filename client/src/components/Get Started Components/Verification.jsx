import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import OTPInput from "react-otp-input";
import { toast } from "sonner";
import { handleResendApi, verifyOtpApi } from "../../services/userServices";

function Verification() {
  const [otp, setOtp] = useState("");
  const [resendTimer, setResendTimer] = useState(30);
  const [verifying, setVerifying] = useState(false);
  const [otpExpiryTimer, setOtpExpiryTimer] = useState(120); // 2 mins (in seconds)

  const navigate = useNavigate();
  const { state } = useLocation();
  const userId = state?.userId;
  const username = state?.name;
  const email = state?.email;

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
      const verifyingToastId = toast.loading("Verifying OTP...");

      try {
        const res = await verifyOtpApi(userId, otp);

        if (res.data.status === "success") {
          toast.success("OTP Verified Successfully!", { id: verifyingToastId });

          setTimeout(() => {
            navigate("/dashboard", { state: { user: res.data.user } });
          }, 1500);
        }
      } catch (err) {
        console.error("OTP verification failed:", err);
        toast.error("Invalid or expired OTP. Please try again.", {
          id: verifyingToastId,
        });
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
  setOtpExpiryTimer(120);
  toast.loading("Sending OTP...");

  try {
    await handleResendApi(userId);
    toast.dismiss();
    toast.success("OTP sent successfully to your email!");
  } catch (err) {
    toast.dismiss();
    console.error("Resend OTP failed:", err);
    toast.error("Failed to resend OTP.");
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
          Please enter the otp received on your valid <br />{email}
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

        <div className="mt-10">
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
