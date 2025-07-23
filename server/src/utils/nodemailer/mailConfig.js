import nodemailer from "nodemailer" ;
import dotenv from "dotenv" ;
import { google } from "googleapis" ;

dotenv.config() ;

// OAuth2 Configuration - Create OAuth2 Client
const oAuth2Client = new google.auth.OAuth2(
    process.env.JOURNIVA_CLIENT_ID,
    process.env.JOURNIVA_CLIENT_SECRET,
    process.env.REDIRECT_URI
) ;

// Set Refresh Token
oAuth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN,
}) ;

// Create Transporter with OAuth2
const createTransporter = async () => {
    try {
        // Get New Access Token using Refresh Token
        const accessToken = await oAuth2Client.getAccessToken() ;

        // Create Transporter
        const transporter = nodemailer.createTransport({
            host : "smtp.gmail.com",
            port : 465,
            secure : true,
            auth : {
                type : "OAuth2",
                user : process.env.JOURNIVA_GMAIL,
                clientId : process.env.JOURNIVA_CLIENT_ID,
                clientSecret : process.env.JOURNIVA_CLIENT_SECRET,
                refreshToken : process.env.REFRESH_TOKEN,
                accessToken : accessToken?.token,
            }
        }) ;

        // Verify Transporter
        transporter.verify((error, success) => {
            if (error) {
                console.error("Error in Nodemailer Transporter:", error) ;
            } else {
                console.log("Nodemailer Transporter is Ready to Send Emails!") ;
            }
        }) ;

        return transporter ;

    } catch (error) {
        console.error("Error Creating Nodemailer Transporter:", error) ;
        throw error ;
    }
} ;

export default createTransporter ;