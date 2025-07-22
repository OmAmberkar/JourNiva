import transporter from "./mailConfig.js" ;
import ejs from "ejs" ;
import path from "path";    
import { fileURLToPath } from "url" ;

// Define __dirnamme
const __filename = fileURLToPath(import.meta.url) ;
const __dirname = path.dirname(__filename);

// Create Send Email Function
export const sendEmail = async (to, subject, templateName, tempplatData) => {
    try {
        // Define Template Path
        const templatePath = path.join(__dirname, emailTemplates, `${templateName}.ejs`) ;

        // Render Template with Data
        const htmlContent = await ejs.renderFile(templatePath, tempplatData) ;

        // Create Email Options
        const mailOptions = {
            from: `JourNiva <${process.env.JOURNIVA_GMAIL}>`,
            to,
            subject,
            html: htmlContent,
        } ;

        // Send Email
        const info = await transporter.sendMail(mailOptions) ;
        console.log("Email Sent Successfully!",info.messageId) ;
        return info ;
    } catch (error) {
        console.error("Error Sending Email:", error) ;
        throw error ;
    }

};