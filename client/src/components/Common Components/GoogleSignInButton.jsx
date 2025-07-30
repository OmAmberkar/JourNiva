import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const GoogleSignInButton = () => {

    // Navigate Hook for Redirecting
    const navigate = useNavigate();

    // Function to handle Google Sign-In Success
    const handleSuccess = async (credentialResponse) => {
        // Extract the credential from the response
        const { credential } = credentialResponse;

        try {
            // Send the Credential to the server for verification
            const response = await axios.post("/api/user/google-login", { credential });

            // Store the Received Token in Local Storage
            localStorage.setItem("accessToken", response.data.accessToken);

            // Redirect the User to Dashboard
            navigate("/dashboard");

        } catch (error) {
            console.error("Google Sign-In Error:", error);
            alert("Failed to sign in with Google. Please try again.");            
        }
    };

    return (
        <div>
            <GoogleLogin
                onSuccess={handleSuccess}
                onError={() => {
                    console.error("Google Login Failed");
                    alert("Google Login failed. Please try again.");

                }}
                useOneTap
            />  
        </div>
    );
};

export default GoogleSignInButton;
