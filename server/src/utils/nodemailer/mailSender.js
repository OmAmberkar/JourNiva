import transporter from "./mailConfig.js" ;
import ejs from "ejs" ;
import path from "path" ;
import { fileURLToPath } from "url" ;

// Define __dirname 
const __filename = fileURLToPath(import.meta.url) ;
const __dirname = path.dirname(__filename) ;

// Create sendEmail Function 
export const sendEmail = async ({ to, subject, templateName, templatedata }) => {
    try {
        // Define Template Path
        const templatePath = path.join(__dirname, `emailTemplates`, `${templateName}.ejs`) ;

        // Render Template with Data
        const htmlContent = await ejs.renderFile(templatePath, templatedata) ;

        // Define Mail Options
        const mailOptions = {
            from: `"JourNiva" <${process.env.JOURNIVA_GMAIL}>`,
            to,
            subject,
            html: htmlContent,
        } ;

        // Send Email
        const info = await transporter.sendMail(mailOptions) ;

        console.log("Email Sent Successfully To:", info.messageID) ;
        return info ;
    } catch (error) {
        console.error("Error Sending Email:", error) ;
        throw error ;
    }
};