import User from "../../models/user.model.js"


//Route 12 - Profile : Get User Details
export const getUserProfile = async (req , res) => {
    // Taking userId from Middleware
    const userId = req.userId ;

    try {
        
        // Find user by userId
        const user = await User.findById(userId);

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
        return res.status(500).json({
            status : "failed" ,
            message : "Internal Server Error!" ,
        })
        
    }
}


//Route 13 - Profile : Update User Details
export const updateUserProfile = async (req , res) => {
    // Taking userId from Middleware
    const userId = req.userId ;

    // Taking user data from Request Body
    const { name , email , password , avatarUrl } = req.body ;

    // Validate User
    if(!user) {
        return res.status(404).json({
            status : "failed" ,
            message : "User Not Found!"
        }) ; 
    }
    
    try {
        // Find User and Update
        const user = await User.findByIdAndUpdate(userId , 
            {
                name ,
                email ,
                password ,
                avatarUrl
                } , {
                    new : true
                    }
        )

    } catch (error) {
        return res.status(500).json({
            status : "failed" ,
            message : "Internal Server Error!" 
        })

    }
}