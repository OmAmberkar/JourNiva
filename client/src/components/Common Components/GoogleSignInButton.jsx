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
        console.log("Google Sign-In Successful:", credentialResponse);
        const { credential } = credentialResponse;

        try {
            // Send the Credential to the server for verification
            const response = await axios.post("http://localhost:4000/api/user/google-login", { credential });

            // Store the Received Token in Local Storage
            localStorage.setItem("accessToken", response.data.accessToken);

            // Redirect the User to Dashboard
            navigate("/dashboard");

        } catch (error) {
            console.log("Google Sign-In Error:", error);
            alert("Failed to Sign in with Google. Please try again!");            
        }
    };

    return (
        <div>
            <GoogleLogin
                onSuccess={handleSuccess}
                onError={() => {
                    console.log("Google Login Failed");
                    alert("Google Login failed. Please try again.");

                }}
                useOneTap
            />  
        </div>
    );
};

export default GoogleSignInButton;
