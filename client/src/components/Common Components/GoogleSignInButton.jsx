/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const GoogleSignInButton = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSuccess = async (credentialResponse) => {
    const { credential } = credentialResponse;

    if (!credential) {
      toast.error("Login failed. No Google credential received.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:4000/api/user/google-login", {
        credential,
      });

      const { accessToken, user, message } = res.data;

      // Store accessToken in localStorage
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("user",JSON.stringify(user))

      // Show toast message
      toast.success(message || "Google Login Successful!");

      // Navigate to dashboard with user data
      navigate("/dashboard", { state: { user } });
    } catch (error) {
      console.error("Google login error:", error.response?.data || error.message);

      const errorMsg =
        error.response?.data?.message ||
        "Something went wrong with Google Login.";

      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => {
          toast.error("Google login was cancelled or failed.");
        }}
        useOneTap
        shape="pill"
        theme="outline"
        width="280"
        size="large"
        logo_alignment="center"
      />
    </div>
  );
};

export default GoogleSignInButton;
