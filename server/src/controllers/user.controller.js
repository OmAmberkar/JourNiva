import User from "../../models/user.model.js" ;
import bcrypt from "bcrypt" ;
import crypto from "crypto" ;
import { sendEmail } from "../utils/nodemailer/mailSender.js" ;
import { sendTokenResponse, generateAccessToken } from "../utils/jwtUtils.js";
import jwt from "jsonwebtoken" ;
import dotenv from "dotenv" ;
import validator from "validator" ;
import sanitizeHtml from "sanitize-html" ;
import { OAuth2Client } from "google-auth-library" ;

dotenv.config() ;

// Creating Google OAuth2 Client for Route  - Google Login
const googleClient = new OAuth2Client(process.env.JOURNIVA_GOOGLE_CLIENT_ID) ;


// Route 1 Controller - Check Email
 export const checkEmail = async (req, res) => {
    const { email } = req.body ;
    const temail = sanitizeHtml(email.trim().toLowerCase()) ;

    if (!temail) {
        return res.status(400).json({ message: "Email is required!" }) ;
    }

    // Validate Email Format
    if (!validator.isEmail(temail)) {
        return res.status(400).json({
            status : "failed",
            message: "Invalid Email Format!"
        }) ;
    }

    try {
        const existingUser = await User.findOne({ email: temail }) ;

        // Check Account Type of Existing User
        if (existingUser) {
            if (existingUser.accountType === "google") {
                return res.status(400).json({
                    status : "failed",
                    message: "Google Account Detected - Please Sign In with Google!"
                }) ;
            }

            // If Existing User JourNiva Account Type - Response to Frontend
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
        return res.status(500).json({message : "Internal Server Error"}) ;
    } ; 

} ;


//Route 2 Controller - Google Login
export const googleLogin = async (req, res) => {
    // Destructure req.body to get ID Token Code Credential
    console.log("Google Login Request Received") ;
    const { credential, rememberMe = false } = req.body ;

    // Validate Credential
    if(!credential) {
        return res.status(400).json({
            status: "failed",
            message: "Login Failed - Google Credential is Required!"
        })
    }

    try {
        // Verify ID Token
        const ticket = await googleClient.verifyIdToken({
            idToken: credential,
            audience: process.env.JOURNIVA_GOOGLE_CLIENT_ID,
        });

        // Get User Information
        const userInfo = ticket.getPayload();

        // Destructure User Info
        const { email, name, picture, sub } = userInfo ;

        // Check if Existing User
        let user = await User.findOne({ email }) ;

        // If Not Existing User - Register(Create) New User
        if (!user) {
            user = new User({
                name,
                email,
                avatarUrl: picture || process.env.DEFAULT_AVATAR_URL,
                isVerified: true,
                accountType: "google",
                googleId: sub,
            })

            await user.save() ;
        }

        if (user.isVerified === false) {
            return res.status(401).json({
                status: "failed",
                message: "Google Login Failed - User Unauthorized!"
            }) ;
        }

        // Generate JWT Access Token & Refresh Token
        const accessToken = sendTokenResponse(res, user._id, rememberMe) ;

        // Send Response to Frontend
        return res.status(200).json({
            status: "success",
            message: "Google Login Successful!",
            accessToken,
            user: {
                name: user.name,
                avatarUrl: user.avatarUrl
            }
        }) ;

    } catch (error) {
        console.error("Google login error:", error.message);
        res.status(500).json({ 
            status: "failed",
            message: "Internal Server Error", error: error.message 
        });
    }
} ;


//Route 3 Controller - Register : Create New User & Store details
export const registerUser = async (req, res) => {
    // Access Input Data from Request Body
    const { email, password, name, avatarUrl } = req.body ;
    const temail = sanitizeHtml(email.trim().toLowerCase()) ; 
    const tname = sanitizeHtml(name.trim()) ;
    const tavatarUrl = validator.isURL(avatarUrl?.trim()) ? avatarUrl.trim() : process.env.DEFAULT_AVATAR_URL;


    // Validate Input Data
    if (!temail || !password || !tname || !tavatarUrl) {
        return res.status(400).json({ 
            status : "failed",
            message: "All Fields are Required!"
        }) ;
    }

    // Validate Email Format
    if (!validator.isEmail(temail)) {
        return res.status(400).json({
            status : "failed",
            message: "Invalid Email Format!"
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
        try {
            await sendEmail({
                to : temail,
                subject : "Verify Your Email - JourNiva",
                templateName : "otpEmail",
                templateData : {
                    name : tname,
                    otp : otp,
                },
                successMessage: "Verify Email OTP Sent Successfully!"
            }) ;    
        } catch (error) {
            console.error("Error sending welcome email:", error.message) ;
        }
        

        // Respose to Frontend
        return res.status(201).json({
            status: "success",
            message: "OTP has been Sent. Please Check Your Spam Folder & Inbox!",
            user: {
                userId: newUser._id,
                name: newUser.name,
                avatarUrl: newUser.avatarUrl,
                email: newUser.email,
            },
        }) ;

    } catch (error) {
        console.error("Error Registering User:", error) ;
        return res.status(500).json({ message: "Internal Server Error" }) ;
    }
} ;
    

//Route 4 Controller - Login Existing User
export const loginUser = async (req, res) => {
    //Access Email & Password from Request Body
    const { email, password, rememberMe = false } = req.body ;
    const temail = sanitizeHtml(email.trim().toLowerCase()) ;

    //Validate Email & Password
    if (!temail || !password) {
        return res.status(400).json({ 
            status : "failed",
            message: "Email and Password are Required!" 
        }) ;
    }

     // Validate Email Format
    if (!validator.isEmail(temail)) {
        return res.status(400).json({
            status : "failed",
            message: "Invalid Email Format!"
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

        // Check Account Type of Existing User
        if (user.accountType === "google") {
            return res.status(400).json({
                status : "failed",
                message: "Google Account Detected - Please Sign In with Google!"
            }) ;
        }

        // Validate User Verification Status
        if (user.isVerified === false) {
            return res.status(401).json({
                status: "failed",
                // message: "Email Not Verified! - Please Verify Email" 
                message:"Invalid Email or Password!"
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
            // Generate JWT Access Token & Refresh Token
            const accessToken = sendTokenResponse(res, user._id, rememberMe) ;

            //Send Respone 
            return res.status(200).json({
                status: "success",
                message: "Login Successful!",
                accessToken,
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


//Route 5 Controller - Register : Email OTP Verification
export const verifyOTP = async (req, res) => {
    // Destructure Request Body
    const { userId, otp, rememberMe = false } = req.body ;

    // Trim userId
    const tuserId = sanitizeHtml(userId.trim()) ;
    const totp = sanitizeHtml(otp.trim());

    // Validate Input Data
    if (!tuserId || !totp) {
        return res.status(400).json({ 
            status: "failed",
            message: "Please Enter Valid OTP!" 
        }) ;
    }

    // Validate User ID Format
    if (!validator.isMongoId(tuserId)) {
        return res.status(400).json({
            status: "failed",
            message: "Invalid User ID format!"
        });
    }

    try {
        // Find User by ID
        const user = await User.findById(tuserId) ;
        
        // Validate User
        if (!user) {
            return res.status(404).json({ 
                status: "failed",
                message: "User Not Found! - Please Register!" 
            }) ;
        }

        // Validate User Verification Status
        if (user.isVerified === true) {
            return res.status(400).json({
                status: "failed",
                message: "User Already Verified! - Please Login!" 
            }) ;
        }

        // Validate OTP Expiry
        if (!user.otpExpires || user.otpExpires < new Date()) {
            return res.status(410).json({ 
                status: "failed",
                message: "OTP has Expired! Please Request a New OTP" 
            }) ;
        }

        // Validate OTP
        const isOtpValid = await bcrypt.compare(totp, user.otp) ;
        if (!isOtpValid) {
            return res.status(401).json({ 
                status: "failed",
                message: "Invalid OTP! Please Try Again" 
            }) ;
        }

        // Update User Document
        user.isVerified = true ;
        user.otp = undefined ; // Clear OTP
        user.otpExpires = undefined ; // Clear OTP Expiry
        await user.save() ;

        // Generate JWT Access Token & Refresh Token
        const accessToken = sendTokenResponse(res, user._id, rememberMe) ;

        // Send Welcome Email
        try {
            await sendEmail({
                to: user.email,
                subject: "Welcome to JourNiva!",
                templateName: "welcomeEmail",
                templateData: {
                    name: user.name,
                },
                successMessage: "Welcome Email Sent Successfully!"
            }) ;    
        } catch (error) {
            console.error("Error sending welcome email:", e.message) ;
        }

        // Response to Frontend
        return res.status(200).json({
            status: "success",
            message: "Email Verified Successfully - Registeration Completed!",
            accessToken,
            user: {
                userId: user._id,
                name: user.name,
                avatarUrl: user.avatarUrl,
            },
        }) ;
        
    } catch (error) {
        console.error("Error Verifying OTP:", error) ;
        return res.status(500).json({ message: "Internal Server Error" }) ;
    }
};


// Route 6 Controller - Resend OTP
export const resendOTP = async (req, res) => {
    // Destructure Request Body
    const { userId } = req.body ;

    // Trim userId
    const tuserId = sanitizeHtml(userId.trim());

    // Validate userId
    if (!tuserId) {
        return res.status(400).json({ 
            status: "failed",
            message: "User ID is Required!" 
        }) ;
    }

    // Validate User ID Format
    if (!validator.isMongoId(tuserId)) {
        return res.status(400).json({
            status: "failed",
            message: "Invalid User ID format"
        });
    }
        
    try {
        // Find User by ID
        const user = await User.findById(tuserId) ;

        // Validate User
        if (!user) {
            return res.status(404).json({ 
                status: "failed",
                message: "User Not Found! - Please Register!" 
            }) ;
        }

        // Validate User Verification Status
        if (user.isVerified === true) {
            return res.status(400).json({
                status: "failed",
                message: "User Already Verified! - Please Login!" 
            }) ;
        }

        // Generate New OTP & Set Expiry Time
        const newOtp = crypto.randomInt(100000, 999999).toString() ;
        const newOtpExpires = new Date(Date.now() + 10 * 60 * 1000) ; // 10 minutes from now

        // Hash New OTP
        const saltRounds = 10 ;
        const hashedNewOtp = await bcrypt.hash(newOtp, saltRounds) ;

        // Update User Document
        user.otp = hashedNewOtp ;
        user.otpExpires = newOtpExpires ;
        await user.save() ;

        // Send New OTP Email
        await sendEmail({
            to: user.email,
            subject : "Verify Your Email - JourNiva",
            templateName: "otpEmail",
            templateData: {
                name: user.name,
                otp: newOtp,
            },
            successMessage: "Verify Email OTP Resent Successfully!"
        }) ;

        // Response to Frontend
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


//Route 7 Controller - Forgot Password : Link Generation
export const forgotPasswordLink = async (req, res) => {
    // Destructure Request Body
    const { email } = req.body ;

    // Trim & Sanitize Email
    const temail = sanitizeHtml(email.trim().toLowerCase());

    // Validate Email
    if (!temail) {
        return res.status(400).json({ 
            status: "failed",
            message: "Email is Required!" 
        }) ;
    }

    try {
        // Find User by Email
        const user = await User.findOne({ email: temail }) ;

        // Validate User
        if (!user) {
            return res.status(404).json({ 
                status: "failed",
                message: "User Not Found! - Please Register" 
            }) ;
        }

        // Generate Reset Password Token & Set Expiry Time
        const resetPasswordToken = crypto.randomBytes(32).toString("hex") ;
        const resetPasswordExpires = new Date(Date.now() + 15 * 60 * 1000) ; // 15 minutes from now

        // Hash Reset Password Token
        const hashedResetPasswordToken = crypto.createHash("sha256").update(resetPasswordToken).digest("hex") ;

        // Update User Document
        user.resetPasswordToken = hashedResetPasswordToken ;
        user.resetPasswordExpires = resetPasswordExpires ;
        await user.save() ;

        // Generate Frontend Reset Password Link
        const resetPasswordLink = `${process.env.FRONTEND_URL}reset-password/${resetPasswordToken}?id=${user._id}` ;

        // Send Reset Password Email
        await sendEmail({
            to: user.email,
            subject: "Reset Your Password - JourNiva",
            templateName: "forgotPasswordEmail",
            templateData: {
                name: user.name,
                resetPasswordLink: resetPasswordLink,
                resetPasswordExpires: resetPasswordExpires.toLocaleString(), // Format as needed
            },
            successMessage: "Reset Password Link Email Sent Successfully!"
        }) ;    

        // Response to Frontend
        return res.status(200).json({
            status: "success",
            message: "Reset Password Link has been Sent. Please Check Your Spam Folder & Inbox!",
            user: {
                userId: user._id,
                name: user.name,
                avatarUrl: user.avatarUrl,
            },
        }) ;
        
    } catch (error) {
        console.error("Error Generating Forgot Password Link:", error) ;
        return res.status(500).json({ message: "Internal Server Error" }) ;
    }
};


//Route 8 Controller - Forgot Password : Reset Password
export const resetPassword = async (req, res) => {
    // Destructure Request Body
    const { token, newPassword, userId } = req.body ;

    // Trim & Sanitize Input Data
    const ttoken = sanitizeHtml(token.trim());
    const tuserId = sanitizeHtml(userId.trim());

    // Validate Input Data
    if (!ttoken || !newPassword || !tuserId) {
        return res.status(400).json({
            status: "failed",
            message: "Token and New Password are Required!"
        }) ;
    }

    // Validate Password Length
    if (newPassword.length < 6) {
        return res.status(400).json({
            status: "failed",
            message: "Password must be at least 6 Characters Long!"
        }) ;
    }

    try {
        const user = await User.findById(tuserId) ;

        // Validate User
        if (!user) {
            return res.status(404).json({
                status: "failed",
                message: "User Not Found! - Please Register"
            }) ;
        }

        // Validate Reset Password Tokens
        if (!user.resetPasswordToken || !user.resetPasswordExpires) {
            return res.status(400).json({
                status: "failed",
                message: "Reset Password Token is Invalid or Expired! Please Request a New Link"
            }) ;
        }

        // Validate Reset Password Token Expiry
        if (user.resetPasswordExpires < new Date()) {
            return res.status(410).json({
                status: "failed",
                message: "Reset Password Token has Expired! Please Request a New Link"
            }) ;
        }

        // Check if Reset Password Token Matches
        const hashedToken = crypto.createHash("sha256").update(ttoken).digest("hex") ;
        if (hashedToken !== user.resetPasswordToken) {
            return res.status(401).json({
                status: "failed",
                message: "Invalid Reset Password Token! Please Request a New Link"
            }) ;
        }

        // Hash New Password
        const saltRounds = 10 ;
        const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds) ;

        // Update User Document
        user.password = hashedNewPassword ;
        user.resetPasswordToken = undefined ; // Clear Reset Password Token
        user.resetPasswordExpires = undefined ; // Clear Reset Password Expiry
        await user.save() ;

        // Send Confirmation Email
        await sendEmail({
            to: user.email,
            subject: "Your Password has been Reset - JourNiva",
            templateName: "passwordResetSuccessEmail",
            templateData: {
                name: user.name,
            },
            successMessage: "Reset Password Successful Email Sent Successfully!"
        }) ;

        // Response to Frontend
        return res.status(200).json({
            status: "success",
            message: "Password has been Reset Successfully!",
            user: {
                userId: user._id,
                name: user.name,
                avatarUrl: user.avatarUrl,

            },
        }) ;
            
    } catch (error) {
        console.error("Error Resetting Password:", error) ;
        return res.status(500).json({ message: "Internal Server Error" }) ;
    }
} ;


//Route 9 Controller - Generate New Access Token using Refresh Token : Refresh Access Token
export const refreshAccessToken = (req, res) => {
    try {
        // Access Refresh Token from Cookie
        const refreshToken = req.cookies.refreshToken ;

        // Validate Refresh Token
        if (!refreshToken) {
            return res.status(401).json({
                status: "failed",
                message: "User Unauthorized - Refresh Token Missing!"
            }) ;
        }

        // Verify Refresh Token & Use Callback Function 
        jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_TOKEN_SECRET,
            (err, decoded) => {
                // Validate Verification
                if (err) {
                    return res.status(403).json({
                        status: "failed",
                        message: "User Unauthorized - Invalid or Expired Token!"
                    }) ;
                }

                // Generate New Access Token
                const newAccessToken = generateAccessToken(decoded.userId) ;

                // Send New Access Token 
                return res.status(200).json({
                    status: "success",
                    accessToken: newAccessToken
                }) ;
            }) ;

    } catch (error) {
        console.error("Error Refreshing Access Token: ", error) ;
        res.status(500).json({ message: "Internal Server Error"}) ;
    }
} ;


//Route 10 Controller - Check User Authentication 
export const checkAuth = async (req, res) => {
    // Middleware will Verify the Access Token
    // If Verified , this controller will Run
    try {
        // Return the userId & Status to Frontend
        return res.status(200).json({
            status: "success",
            userId: req.userId,
            message: "User is Authenticated!"
        }) ;
            
    } catch (error) {
        console.error("Check Auth Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


//Route 11 Controller - Logout 
export const logout = async (req, res) => {
    try {
        // Clear the Tokens & Cookies
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV == "production",
            sameSite: "Strict",
            path: "/" // Ensures cookie is cleared properly from all routes
        });

        //Response to Frontend
        res.status(200).json({
            message: "Logged Out Successfully - Come Back Soon!"
        }) ;    
    } catch (error) {
        console.error("Logout Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
} ;