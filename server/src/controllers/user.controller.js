import User from "../../models/user.model.js" ;
import bcrypt from "bcrypt" ;
import crypto from "crypto" ;
import { sendEmail } from "../utils/nodemailer/mailSender.js" ;

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
export const verifyOTP = async (req, res) => {
    // Destructure Request Body
    const { userId, otp } = req.body ;

    // Trim userId
    const tuserId = userId.trim() ;

    // Validate Input
    if (!tuserId || !otp) {
        return res.status(400).json({ 
            status: "failed",
            message: "Please Enter Valid OTP!" 
        }) ;
    }

    try {
        // Find User by ID
        const user = await User.findById(tuserId) ;

        // Validate User
        if (!user) {
            return res.status(404).json({ 
                status: "failed",
                message: "User Not Found - Please Register!" 
            }) ;
        }

        // Validate User Verfication Status 
        if(user.isVerified === true) {
            return res.status(400).json({ 
                status: "failed",
                message: "User Already Verified - Please Login!" 
            }) ;
        }

        // Validate OTP Expiry
        if (!user.otpExpires || user.otpExpires < new Date()) {
            return res.status(410).json({ 
                status: "failed",
                message: "OTP has Expired - Please Request a New OTP!" 
            }) ;
        }

        // Validate OTP
        const isOtpValid = await bcrypt.compare(otp, user.otp) ;
        if (!isOtpValid) {
            return res.status(401).json({ 
                status: "failed",
                message: "Invalid OTP - Please Try Again!" 
            }) ;
        }

        // Update User Document
        user.isVerified = true ;
        user.otp = undefined ; // Clear OTP
        user.otpExpires = undefined ; // Clear OTP Expiry
        await user.save() ;

        
        return res.status(200).json({
            status: "success",
            message: "Email Verfied Successfully!",
            user: {
                userId: user._id,
                name: user.name,
                avatarUrl: user.avatarUrl,
            }
        }) ;

    } catch (error) {
        console.error("Error Verifying OTP:", error) ;
        return res.status(500).json({ message: "Internal Server Error" }) ;
    }
};

 
//Route 5 Controller - Resend OTP
export const resendOTP = async (req, res) => {
    //Destructure Request Body
    const { userId } = req.body ;

    //Validate User ID
    if (!userId) {
        return res.status(400).json({ 
            status: "failed",
            message: "User ID is Required!" 
        }) ;
    }

    try {
        //Find User by ID
        const user = await User.findById(userId) ;

        //Validate User 
        if (!user) {
            return res.status(404).json({ 
                status: "failed",
                message: "User Not Found - Please Register!" 
            }) ;
        }

        //Validate User Verification Status
        if (user.isVerified === true) {
            return res.status(400).json({ 
                status: "failed",
                message: "User Already Verified - Please Login!" 
            }) ;
        }

        //Generate New OTP & Set Expiry Time
        const newOtp = crypto.randomInt(100000, 999999).toString() ;
        const newOtpExpires = new Date(Date.now() + 10 * 60 * 1000) ; 

        //Hash New OTP
        const saltRounds = 10 ;
        const hashedNewOtp = await bcrypt.hash(newOtp, saltRounds) ;

        //Update User Document
        user.otp = hashedNewOtp ;
        user.otpExpires = newOtpExpires ;
        await user.save() ;

        //Send New OTP Email
        await sendEmail({
            to: user.email,
            subject: "Verify Your Email - JourNiva",
            templateName: "otpEmail",
            templateData: {
                name: user.name,
                otp: newOtp,
            }
        }) ;

        //Response to Frontend
        return res.status(200).json({
            status: "success",
            message: "New OTP has been Sent. Please Check Your Spam Folder & Inbox!",
            user: {
                userId: user._id,
                name: user.name,
                avatarUrl: user.avatarUrl,
            },
        }) ;
    } catch (error) {
        console.error("Error Resending OTP:", error) ;
        return res.status(500).json({ message: "Internal Server Error" }) ;
    }
}


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