import jwt from "jsonwebtoken" ;

//Function to Generate Access Token (Short Lived)
export const generateAccessToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_ACCESS_TOKEN_SECRET, { 
        expiresIn: '15m' 
    });
};

//Function to Generate Refresh Token (Long Lived)
export const generateRefreshToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_REFRESH_TOKEN_SECRET, { 
        expiresIn: '7d' 
    });
};

//Function to Call Generate Tokens & Send Cookie
export const sendTokenResponse = (res, userId) => {
    const accessToken = generateAccessToken(userId);
    const refreshToken = generateRefreshToken(userId);

    // Set the refresh token in an HTTP-only cookie
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production only
        sameSite: 'Strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    //Return the Access Token for Passing to Frontend
    return accessToken ;
};
