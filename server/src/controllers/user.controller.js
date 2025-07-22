import User from "../../models/user.model.js" ;
import bcrypt from "bcrypt" ;
import crypto from "crypto" ;

// Route 1 Controller - Check Email
 export const checkEmail = async (req, res) => {
    const { email } = req.body ;
    const temail = email.trim() ;

    if (!temail) {
        return res.status(400).json({ message: "Email is required!" }) ;
    }

    try {
        const existingUser = await User.findOne({ email: temail }) ;
        if (existingUser) {
            return res.status(200).json({ 
                status : 1,
                message : "Existing User",
                user : {
                    name : existingUser.name,
                    avatarUrl : existingUser.avatarUrl,
                },
            }) ;
        } else {
            return res.status(200).json({
                status : 0,
                message : "New User" 
            }) ;
        } ;
    } catch (error) {
        console.error("Error Checking Email :", error) ;
        res.status(500).json({message : "Internal Server Error"}) ;
    } ; 

} ;


//Route 2 Controller - Register : Create New User & Store details
export const registerUser = async (req, res) => {
    // Access Input Data from Request Body
    const { email, password, name, avatarUrl } = req.body ;
    const temail = email.trim() ;
    const tname = name.trim() ;
    const tavatarUrl = avatarUrl.trim() ;

    // Validate Input Data
    if (!temail || !password || !tname || !tavatarUrl) {
        return res.status(400).json({ 
            status : "failed",
            message: "All Fields are Required!"
        }) ;
    }

    if (password.length < 6) {
        return res.status(400).json({ 
            status : "failed",
            message: " Password must be at least 6 Characters Long!"}) ;
    }

    try {
        // Double Check for Existing User 
        const existingUser = await User.findOne({ email : temail }) ;
        if (existingUser) { 
            return res.status(409).json({ 
                status: "failed",
                message: "User Already Exists!"}) ;
        }

        // Password Hashing
        const saltRounds = 10 ;
        const hashedPassword = await bcrypt.hash(password, saltRounds) ;

        // Generate OTP & Set Expiry Time
        const otp = crypto.randomInt(100000, 999999).toString() ;
        const otpExpires = new Date(Date.now() + 10 * 60 * 1000) ; // 10 minutes from now

        // Hash OTP
        const hashedOtp = await bcrypt.hash(otp, saltRounds) ;

        // Create & Save New User
        const newUser = new User({
            name : tname,
            email : temail,
            password : hashedPassword,
            avatarUrl : tavatarUrl,
            isVerified : false,
            otp : hashedOtp,
            otpExpires : otpExpires,
        }) ;
        await newUser.save() ;

        // Send OTP Email
        await sendEmail({
            to : temail,
            subject : "Verify Your Email - JourNiva",
            templateName : "otpEmail",
            templateData : {
                name : tname,
                otp : otp,
            }
        }) ;

        // Respose to Frontend
        return res.status(201).json({
            status: "success",
            message: "OTP has been Sent. Please Check Your Spam Folder & Inbox!",
            user: {
                userId: newUser._id,
                name: newUser.name,
                avatarUrl: newUser.avatarUrl,
            },
        }) ;
        
    } catch (error) {
        console.error("Error Registering User:", error) ;
        return res.status(500).json({ message: "Internal Server Error" }) ;
    }
} ;
    

//Route 3 Controller - Login Existing User
export const loginUser = async (req, res) => {
    //Access Email & Password from Request Body
    const { email, password } = req.body ;
    const temail = email.trim() ;

    //Validate Email & Password
    if (!temail || !password) {
        return res.status(400).json({ 
            status : "failed",
            message: "Email and Password are Required!" 
        }) ;
    }
  
    try {
        // Find User Document by Email
        const user = await User.findOne({ email: temail }) ;
        // Validate Email
        if (!user) {
            return res.status(404).json({ 
                status: "failed",
                message: "Invalid Email or Password!" 
            }) ;
        }

        // Validate Password
        const isPasswordValid = await bcrypt.compare(password, user.password) ;
        if (!isPasswordValid) {
            return res.status(401).json({ 
                status: "failed",
                message: "Invalid Email or Password!" 
            }) ;
        } else {
            //Send Respone 
            return res.status(200).json({
                status: "success",
                message: "Login Successful!",
                user: {
                    userId: user._id,
                    name: user.name,
                    avatarUrl: user.avatarUrl,
                }
            }) ;
        }
    } catch (error) {
        console.error("Error Logging In User:", error) ;
        return res.status(500).json({ message: "Internal Server Error" }) ;        
    }
};



//Route 4 Controller - Register : Email OTP Verification
export const verifyOTP = (req, res) => {
    const { otp } = req.body;

    res.status(200).json({ message: "Email Verified Successfully!"});
};


//Route 5 Controller - Forgot Password : Link Generation
export const forgotPasswordLink = (req, res) => {
    const { email } = req.body;
    
    res.status(200).json({ message: "Password Reset Link has been Sent to your Registered Email!"});
};


//Route 6 Controller - Forgot Password : Validate Token
export const validateToken = (req, res) => {
    const { token } = req.params;

    res.status(200).json({ message: "Token is Valid!"});
};


//Route 7 Controller - Forgot Password : Reset Password
export const resetPassword = (req, res) => {
    const { password } = req.body;

    res.status(200).json({ message: "Password has been Reset Successfully!"});
};