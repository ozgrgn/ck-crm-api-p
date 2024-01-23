import nodemailer from "nodemailer"
import CONFIG from "../../config.js"

export const sendMail = async (to, subject, text, html, attachments) => {

    try {
        let transporter = nodemailer.createTransport({
            host: CONFIG.MAIL.host,
            port: CONFIG.MAIL.port,
            secure: true,
            tls: {
                rejectUnauthorized: false
            },
            auth: {
                user: CONFIG.MAIL.user,
                pass: CONFIG.MAIL.pass,
            },
        });

        let info = await transporter.sendMail({
            from: `"Ck Health Turkey" <${CONFIG.MAIL.from}>`,
            to,
            subject,
            text,
            html,
            attachments
        });

        console.log("mail sent successfully", info.messageId)
        return true

    } catch (error) {
        throw new Error(error.message)
    }
}

export default {
    sendMail
}