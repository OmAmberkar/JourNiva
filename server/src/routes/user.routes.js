import express from "express"

const router = express.Router();

//Route 1 - Check Email
router.post("/check-email" , (req, res) => {
    const { email } = req.body ;

    if (email) {
        res.status(200).json({ message : "Existing User"});
     } else {
        res.status(200).json({message : "New User"});
     }
});


//Route 2 - Register : Create New User & Store details
router.post("/register" , (req, res) => {
    const { email} = req.body.email ;
    const { password } = req.body.password ;
    const { name } = req.body.name ;
    const { avatarUrl } = req.body.avatarUrl ;

    res.status(201).json({message : "User Registered Successfully"});
});


//Route 3 - Login Existing User
router.post("/login" , (req, res) => {
    const { password } = req.body ;

    res.status(200).json({message : "User Logged in Successfully"}) ;
});


//Route 4 - Register : Email OTP Generation & Send
router.post("/send-otp" , (req, res) => {
    const { email } = req.body ;

    res.status(200).json(message = "OTP Sent Successfully to your Email!");
});


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