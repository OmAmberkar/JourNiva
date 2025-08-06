import jwt from "jsonwebtoken" ; 

export const verifyAccessToken = (req, res, next) => {
    // Access Authorization Header 
    const authHeader = req.headers.authorization ;

    // Validate Authorization Header
    if (!authHeader?.startsWith("Bearer ")) {
        return res.status(403).json({
            status: "failed",
            message: "Unauthorized User - No Token!"
        }) ;
    }

    // Access Token from Authorization Header
    const token = authHeader.split(" ")[1] ;
    // Authorization: Bearer gddsbcjdbchdbhhdvhhfvhfb hbhf .vfvfvf.vfvfvvvfvf
    try {
        // Verify Token
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET) ;

        // Validate the Verification
        if (!decoded) {
            return res.status(403).json({
                status: "failed",
                message: "User Unauthorized - Invalid Token!"
            }) ;
        }

        // If Token Authenticated & Not Expired then will return the Payload (UserId)
        // This payload we will set to the req.userId so that it can be used by the next function
        req.userId = decoded.userId ;

        // Call the Next Function 
        next() ;

    } catch (error) {
        // Handle JWT Token Expiry Error
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                status: "failed",
                message: "User Unauthorised - Token Expired!"
            });
        }
        
        console.error("JWT Verification Error:", error);
        return res.status(403).json({
            status: "failed",
            message: "User Unauthorised - Invalid Token!"
        });
    }
} ;