import express from "express"
import { checkEmail, registerUser, loginUser, sendOTP, verifyOTP, forgotPasswordLink, validateToken, resetPassword } from "../controllers/user.controller.js" 
const router = express.Router();

//Route 1 - Check Email
router.post("/check-email" , checkEmail);

//Route 2 - Register : Create New User & Store details
router.post("/register" , registerUser);

//Route 3 - Login Existing User
router.post("/login" , loginUser);

//Route 4 - Register : Email OTP Generation & Send
router.post("/send-otp" , sendOTP);

//Route 5 - Register : Email OTP Verification
router.post("/verify-otp" , verifyOTP);

//Route 6 - Forgot Password : Link Generation
router.post("/forgot-password-link" , forgotPasswordLink);

//Route 7 - Forgot Password : Validate Token
router.get("/validate-token/:token" , validateToken);

//Route 8 - Forgot Password : Reset Password
router.post("/reset-password" , resetPassword);

export default router ;