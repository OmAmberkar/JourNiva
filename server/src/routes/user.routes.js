import express from "express"
import { checkEmail, googleLogin, registerUser, loginUser, verifyOTP, resendOTP, forgotPasswordLink, resetPassword, refreshAccessToken, checkAuth, logout } from "../controllers/user.controller.js" 
import { getUserProfile, changeEmailRequest, verifyChangeEmailOtp, changePassword, updateUserProfile  } from "../controllers/userProfile.controller.js";
import { verifyAccessToken } from "../middleware/userAuthMiddleware.js";

const router = express.Router();

//Route 1 - Check Email
router.post("/check-email" , checkEmail) ;

//Route 2 - Google Login
router.post("/google-login" , googleLogin) ;

//Route 3 - Register : Create New User & Store details
router.post("/register" , registerUser);

//Route 4 - Login Existing User
router.post("/login" , loginUser) ;

//Route 5 - Register : Email OTP Verification
router.post("/verify-otp" , verifyOTP) ;

//Route 6 - Resend OTP
router.post("/resend-otp" , resendOTP) ;

//Route 7 - Forgot Password : Link Generation
router.post("/forgot-password-link" , forgotPasswordLink) 

//Route 8 - Forgot Password : Reset Password
router.post("/reset-password" , resetPassword) ;

//Route 9 - Generate New Access Token using Refresh Token : Refresh Access Token
router.get("/refresh-access-token" , refreshAccessToken) ;

//Route 10 - Check User Authentication 
router.get("/check-auth" ,  verifyAccessToken, checkAuth) ;

//Route 11 - Logout
router.post("/logout" , logout) ;

//Route 12 - Profile : Get User Details
router.get("/profile" , verifyAccessToken, getUserProfile) ;

//Route 13 - Profile : Change Email Request
router.post("/change-email-request" , verifyAccessToken, changeEmailRequest) ;

//Route 14 - Profile : Verify Change Email OTP
router.post("/change-email-verify" , verifyAccessToken, verifyChangeEmailOtp) ;

//Route 15 - Profile : Change Password
router.post("/change-password" , verifyAccessToken, changePassword) ; 

//Route 16 - Profile : Update User Details
router.patch("/profile" , verifyAccessToken, updateUserProfile) ;

export default router ;