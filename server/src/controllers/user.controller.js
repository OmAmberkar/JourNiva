// Route 1 Controller - Check Email
 export const checkEmail =(req, res) => {
    const { email } = req.body ;

    if (email) {
        res.status(200).json({ message : "Existing User"});
     } else {
        res.status(200).json({message : "New User"});
     }
};


//Route 2 Controller - Register : Create New User & Store details
export const registerUser = (req, res) => {
    const { email} = req.body.email ;
    const { password } = req.body.password ;
    const { name } = req.body.name ;
    const { avatarUrl } = req.body.avatarUrl ;

    res.status(201).json({message : "User Registered Successfully"});
};


//Route 3 Controller - Login Existing User
export const loginUser = (req, res) => {
    const { password } = req.body ;

    res.status(200).json({message : "User Logged in Successfully"}) ;
};


//Route 4 Controller - Register : Email OTP Generation & Send
export const sendOTP = (req, res) => {
    const { email } = req.body ;

    res.status(200).json(message = "OTP Sent Successfully to your Email!");
};


//Route 5 Controller - Register : Email OTP Verification
export const verifyOTP = (req, res) => {
    const { otp } = req.body;

    res.status(200).json({ message: "Email Verified Successfully!"});
};


//Route 6 Controller - Forget Password : Link Generation
export const forgetPasswordLink = (req, res) => {
    const { email } = req.body;
    
    res.status(200).json({ message: "Password Reset Link has been Sent to your Registered Email!"});
};


//Route 7 Controller - Forget Password : Validate Token
export const validateToken = (req, res) => {
    const { token } = req.params;

    res.status(200).json({ message: "Token is Valid!"});
};


//Route 8 Controller - Forget Password : Reset Password
export const resetPassword = (req, res) => {
    const { password } = req.body;

    res.status(200).json({ message: "Password has been Reset Successfully!"});
};