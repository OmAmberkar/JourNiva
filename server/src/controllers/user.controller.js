// Route 1 Controller - Check Email
 export const checkEmail = async (req, res) => {
    const { email } = req.body ;
    
    try{
        const existingUser = await Users.findOne({ email }) ;
        if (existingUser) {
            res.status(200).json({
                status : 1,
                message : "Existing User",
                user : {
                    id : existingUser._id,
                    name : existingUser.name,
                    avatarUrl : existingUser.avatarUrl
                }
            });
        } else {
            res.status(200).json({
                status : 0,
                message : "New User" 
            });
        };
    } catch (error) {
        console.error("Error Checking Email :", error);
        res.status(500).json({message : "Internal Server Error"});
    }; 

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


//Route 6 Controller - Forgot Password : Link Generation
export const forgotPasswordLink = (req, res) => {
    const { email } = req.body;
    
    res.status(200).json({ message: "Password Reset Link has been Sent to your Registered Email!"});
};


//Route 7 Controller - Forgot Password : Validate Token
export const validateToken = (req, res) => {
    const { token } = req.params;

    res.status(200).json({ message: "Token is Valid!"});
};


//Route 8 Controller - Forgot Password : Reset Password
export const resetPassword = (req, res) => {
    const { password } = req.body;

    res.status(200).json({ message: "Password has been Reset Successfully!"});
};