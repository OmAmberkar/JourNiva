import createTransporter from "./mailConfig.js" ;
import ejs from "ejs" ;
import path from "path" ;
import { fileURLToPath } from "url" ;
import { dirname } from "path" ;

// Define __dirname 
const __filename = fileURLToPath(import.meta.url) ;
const __dirname = path.dirname(__filename) ;

// Create sendEmail Function 
export const sendEmail = async ({ to, subject, templateName, templateData }) => {
    try {
        // Get Transporter
        const transporter = await createTransporter() ;

        // Define Template Path
        const templatePath = path.join(__dirname, 'emailTemplates', `${templateName}.ejs`) ;

        // Render Template with Data
        const htmlContent = await ejs.renderFile(templatePath, templateData) ;

        // Define Mail Options
        const mailOptions = {
            from: `"JourNiva" <${process.env.JOURNIVA_GMAIL}>`,
            to,
            subject,
            html: htmlContent,
            replyTo: false,
        } ;

        // Send Email
        const result = await transporter.sendMail(mailOptions) ;

        console.log("Email Sent Successfully!",result.messageId) ;
        return result ;

    } catch (error) {
        console.error("Error Sending Email:", error) ;
        throw error ;
    }
};