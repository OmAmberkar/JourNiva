import nodemailer from "nodemailer" ;
import dotenv from "dotenv" ;

dotenv.config() ;

// Create Transporter
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.JOURNIVA_GMAIL,
        pass: process.env.JOURNIVA_GPASS,
    }
}) ;


// Verify Transporter
transporter.verify((error, success) => {
    if (error) {
        console.error("Error in Nodemailer Transporter:", error);
    } else {
        console.log("Nodemailer Transporter is Ready to Send Email.");
    }
}) ;

export default transporter ;