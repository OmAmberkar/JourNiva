import Users from "../../models/user.model.js";
import bcrypt from "bcrypt";

// Route 1 Controller - Check Email
 export const checkEmail = async (req, res) => {
    const { email } = req.body ;
    const temail = email.trim() ;

    if (!temail) {
        return res.status(400).json({ message: "Email is required!" }) ;
    }

    try {
        const existingUser = await Users.findOne({ email: temail }) ;
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

    // Validate Input Data
    if (!email || !password || !name || !avatarUrl) {
        return res.status(400).json({ message: "All Fields are Required!"}) ;
    }

    if (password.length < 6) {
        return res.status(400).json({ message: " Password must be at least 6 Characters Long!"}) ;
    }

    try {
        // Double Check for Existing User 
        const existingUser = await Users.findOne({ email }) ;
        if (existingUser) {
            return res.status(409).json({ message: "User Already Exists!"}) ;
        }

        // Password Hashing
        const saltRounds = 10 ;
        const hashedPassword = await bcrypt.hash(password, saltRounds) ;

        // Create & Save New User
        const newUser = new Users({
            name,
            email,
            password: hashedPassword,
            avatarUrl,
        }) ;
        await newUser.save() ;

        // Respose to Frontend
        return res.status(201).json({
            status: "success",
            message: "User Registered Successfully!",
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
        return res.status(400).json({ message: "Email and Password are Required!" }) ;
    }

  
    try {
        // Find User Document by Email
        const user = await Users.findOne({ email: temail }) ;
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