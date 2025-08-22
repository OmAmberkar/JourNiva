import sanitizeHtml from "sanitize-html";
import User from "../../models/user.model.js"
import bcrypt from "bcrypt";
import validator from "validator";
import { sendEmail } from "../utils/nodemailer/mailSender.js";
import crypto from "crypto";

//Route 12 - Profile : Get User Details - name, email, avatarUrl & accountType
export const getUserProfile = async (req , res) => {
    // Taking userId from Middleware
    const userId = req.userId ;

    try {
        
        // Find user by userId
        const user = await User.findById(userId).select("name email accountType avatarUrl");

        //Validate User
        if(!user) {
            return res.status(404).json({ 
                status : "failed" ,
                message: "User Not Found!" 
            }) ;
        }

        //Return Response to Frontend
        return res.status(200).json({
            status : "success" ,
            message : "User Profile Found!" ,
            data : user
        }) ;

    } catch (error) {
        console.error("Error in Fetching User Profile : ", error) ;
        return res.status(500).json({
            status : "failed" ,
            message : "Internal Server Error!" ,
        })
        
    }
}


// Route 13 - Profile : Change Email Request & Send OTP
export const changeEmailRequest = async (req , res) => {
    // Taking userId from Middleware
    const userId = req.userId ;

    // Destructuring Request Body
    const { password , newEmail } = req.body ;

    // Sanitize Input Data
    const tnewEmail = sanitizeHtml(newEmail.trim().toLowerCase()) ;

    // Validate Email Format 
    if(!validator.isEmail(tnewEmail)) {
        return res.status(400).json({
            status : "failed" ,
            message : "Invalid Email Format!" 
        }) ;
    }

    try {
        // Find user by userId
        const user = await User.findById(userId).select(
            "email password pendingEmail accountType emailChangeOtpHash emailChangeOtpExpiry"
        ) ;

        // Validate user
        if(!user) {
            return res.status(404).json({
                status : "failed" ,
                message : "User Not Found!"
            }) ;
        }

        // Only JourNiva accounts can change Email
        if(user.accountType !== "journiva") {
            return res.status(400).json({
                status : "failed" ,
                message : "Email changes are not allowed for Google Accounts"
            })
        }

        // Verify Password
        const isPasswordValid = await bcrypt.compare(password , user.password) ;
        if(!isPasswordValid) {
            return res.status(401).json({
                status : "failed" ,
                message : "Invalid Password!"
            }) ; 
        }

        // Verify User has entered the New Email & not same email 
        if(user.email === tnewEmail) {
            return res.status(400).json({
                status : "failed" ,
                message : "New Email is same as Old Email!"
            }) ; 
        }
        
        // Verify that No Same Email exists in Database || Email not in Use
        const existingUser = await User.findOne({ email : tnewEmail }) ;
        if(existingUser) {
            return res.status(409).json({
                status : "failed" ,
                message : "Email Already Exists!"
            }) ; 
        }

        // Generate OTP
        const otp = crypto.randomInt(100000 , 999999).toString() ;
        const saltRounds = 10 ;
        const hashedOtp = await bcrypt.hash(otp, saltRounds) ;

        // Save details
        user.pendingEmail = tnewEmail ;
        user.emailChangeOtpHash = hashedOtp ;
        user.emailChangeOtpExpiry = new Date(Date.now() + 15 * 60 * 1000) ; // 15 minutes
        await user.save() ;

        // Send Change Email OTP Mail to New Email
        try {
            await sendEmail({
                to : tnewEmail ,
                subject : "Confirm Your New Email Address - JourNiva" ,
                templateName : "changeEmailOtp" ,
                templateData : {
                    name : user.name ,
                    otp : otp ,
                },
                successMessage : "OTP for Change Email Sent Successfully!",
            }) ;
        } catch (error) {
            // If sending mail fails, clean up pending fields
            user.pendingEmail = null ;
            user.emailChangeOtpHash = null ;
            user.emailChangeOtpExpiry = null ;
            await user.save() ;

            return res.status(500).json({
                status : "failed" ,
                message : "Could not send OTP for Change Email. Please try again later!"
            }) ;
        }

        // Send Response to Frontend 
        return res.status(200).json({
            status : "success" ,
            message : "OTP has been Sent to you New Email. Please Verify to Confirm the change." ,
            user : {
                pendingEmail : tnewEmail ,
            }
        }) ;

    } catch (error) {
        console.error("Error in Sending Change Email Request : " , error) ;
        return res.status(500).json({
            status : "failed" ,
            message : "Internal Server Error!"
        }) ;
    }
}


// Route 14 - Profile : Verify Change Email Request OTP
export const verifyChangeEmailOtp = async (req, res) => {
    // Taking userId from Middleware
    const userId = req.userId ;

    // Destructuring Request Body
    const { otp } = req.body ;

    // Sanitize OTP
    const totp = sanitizeHtml(otp.trim()) ;

    // Validate OTP
    if(!totp) {
        return res.status(400).json({
            status : "failed" ,
            message : "Please Enter Valid OTP!"
        }) ;
    }

    try {
        // Find User by userId
        const user = await User.findById(userId).select(
            "email name pendingEmail emailChangeOtpHash emailChangeOtpExpiry avatarUrl accountType"
        ) ;

        // Validate user
        if(!user) {
            return res.status(404).json({
                status : "failed" ,
                message : "User Not Found!"
            }) ;
        }

        // Validate OTP Expiry 
        if(user.emailChangeOtpExpiry < new Date()) {
            user.emailChangeOtpHash = null ;
            user.emailChangeOtpExpiry = null ;
            await user.save() ;

            return res.status(410).json({
                status : "failed" ,
                message : "OTP has Expired! Please Request a New OTP"
            }) ; 
        }

        // Validate OTP
        const isOtpValid = await bcrypt.compare(totp , user.emailChangeOtpHash) ;
        if(!isOtpValid) {
            return res.status(401).json({
                status : "failed" ,
                message : "Invalid OTP!"
            }) ;
        }

        // Update User Email
        const oldEmail = user.email ;
        user.email = user.pendingEmail ;
        user.pendingEmail = null ;
        user.emailChangeOtpHash = null ;
        user.emailChangeOtpExpiry = null ;
        await user.save() ;

        // Send Mail - Email Change Successful
        try {
            await sendEmail({
                to : user.email ,
                subject : "Your JourNiva Email Has Been Changed Successfully!" ,
                templateName : "changeEmailSuccess",
                templateData : {
                    name : user.name ,
                    oldEmail : oldEmail ,
                    newEmail : user.email , 
                }
            }) ;
        } catch (error) {
            console.warn("Failed to Send Email Change Successful Mail!", error) ;
        }

        // Send Respose to Frontend
        return res.status(200).json({
            status : "success" ,
            message : "Email Changed Successfully!" ,
            user : {
                email : user.email ,
                name : user.name ,
                avatarUrl : user.avatarUrl,
                accountType : user.accountType
            }
        }) ; 
    } catch (error) {
        console.error("Error in Verifying Email : " , error) ;
        return res.status(500).json({
            status : "failed" ,
            message : "Internal Server Error!"
        }) ;
    }
}


// Route 15 - Profile : Change Password 
export const changePassword = async (req , res) => {
    // Taking userId from Middleware
    const userId = req.userId ;

    // Destructuring Request Body
    const { oldPassword , newPassword } = req.body ;

    // Validate fields
    if(!oldPassword || !newPassword) {
        return res.status(400).json({
            status : "failed" ,
            message : "All Fields are Required!"
        }) ;
    }

    // Validate Password Length
    if(newPassword.length < 6) {
        return res.status(400).json({
            status : "failed" ,
            message : "Invalid Password Length!"
        }) ;
    }

    try {
        // Find the User by userId
        const user = await User.findById(userId).select(
            "email name password avatarUrl accountType"
        ) ;

        // Only JourNiva Accounts can Change Password
        if(user.accountType === "google") {
            return res.status(400).json({
                status : "failed" ,
                message : "Only JourNiva Accounts can Change Password!"
            }) ;
        }

        // Verify Current Password
        const isPasswordValid = await bcrypt.compare(oldPassword , user.password) ;
        if(!isPasswordValid) {
            return res.status(400).json({
                status : "failed" ,
                message : "Incorrect Current Password!"
            });
        }

        // Prevent Same Password Reuse
        const isSamePassword = await bcrypt.compare(newPassword , user.password) ;
        if(isSamePassword) {
            return res.status(400).json({
                status : "failed" ,
                message : "New Password cannot be same as Old Password!"
            }) ;
        }

        // Hash New Password
        const hashedPassword = await bcrypt.hash(newPassword , 10) ;

        // Save to DB
        user.password = hashedPassword ;
        await user.save() ;

        try {
            await sendEmail({
                to : user.email ,
                subject : "Password Changed Successfully - JourNiva",
                templateName : "passwordChanged",
                templateData : {
                    name : user.name,
                }
            }) ;
        } catch (error) {
            console.warn("Failed to send Mail for Password Changed Success") ;
        }

        // Send Response to Frontend
        return res.status(200).json({
            status : "success" ,
            message : "Password Changed Successfully!",
            user : {
                name : user.name,
                email : user.email,
                avatarUrl : user.avatarUrl,
                accountType : user.accountType,
            }
        }) ;
    } catch (error) {
        console.error("Error in Changing Password : ", error) ;
        return res.status(500).json({
            status : "failed" ,
            message : "Internal Server Error!"
        }) ;
    }
}


//Route 16 - Profile : Update User Details
export const updateUserProfile = async (req , res) => {
    // Taking userId from Middleware
    const userId = req.userId ;

    // Destructuring Request Body
    const { name , avatarUrl } = req.body ;

    // Sanitize user data
    const tname = name ? sanitizeHtml(name.trim()) : undefined ;
    const tavatarUrl = avatarUrl ? sanitizeHtml(avatarUrl.trim()) : undefined ;

    // Validate Input Data
    if(!tname && !tavatarUrl) {
        return res.status(400).json({
            status : "failed" ,
            message : "Atleast One Field is Required!" ,
        }) ; 
    }

    try {
        // Update User Details
        const updateData = {} ;
        if(tname) updateData.name = tname ;
        if(tavatarUrl) updateData.avatarUrl = tavatarUrl ;
        // Find User and Update
        const user = await User.findByIdAndUpdate(userId , updateData , { new : true })
        .select("name email avatarUrl accountType isProfileComplete") ; 

        // Validate User
        if(!user) {
            return res.status(404).json({
                status : "failed" ,
                message : "User Not Found!"
            }) ; 
        }

        // Send Response to Frontend
        return res.status(200).json({
            status : "success" ,
            message : "User Profile Updated Successfully!" ,
            data : user
        }) ; 

    } catch (error) {
        console.error("Error Updating User Profile : ", error) ;
        return res.status(500).json({
            status : "failed" ,
            message : "Internal Server Error!" 
        }) ; 
    }
}


