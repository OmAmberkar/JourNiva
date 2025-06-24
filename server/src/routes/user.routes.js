import express from "express"
import { checkEmail, registerUser, loginUser, sendOTP } from "../controllers/user.controller.js" 
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
router.post("verify-otp" , (req, res) => {
    const { otp } = req.body;

    res.status(200).json({ message: "Email Verified Successfully!"});
});


//Route 6 - Forget Password : Link Generation
router.post("/forget-password-link" , (req, res) => {
    const { email } = req.body;
    
    res.status(200).json({ message: "Password Reset Link has been Sent to your Registered Email!"});
});


//Route 7 - Forget Password : Validate Token
router.get("validate-token/:token" , (req, res) => {
    const { token } = req.params;

    res.status(200).json({ message: "Token is Valid!"});
});


//Route 8 - Forget Password : Reset Password
router.post("/reset-password" , (req, res) => {
    const { password } = req.body;

    res.status(200).json({ message: "Password has been Reset Successfully!"});
});

export default router