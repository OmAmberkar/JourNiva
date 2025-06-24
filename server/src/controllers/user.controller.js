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
