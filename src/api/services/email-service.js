import nodemailer from 'nodemailer';
import env from './../config/env.js';


export const sendEmail = async (receiverEmails) => {

    const transporter = nodemailer.createTransport({
        host: env.EMAIL_HOST,
        port: env.EMAIL_PORT,
        secure: env.EMAIL_SECURE,
        auth: {
            user: env.EMAIL_USER,
            pass: env.EMAIL_PASS
        }
    });

    let info = await transporter.sendMail({
        from: '"'+ env.APP_NAME +'" <'+ env.FROM_EMAIL +'>',
        to: receiverEmails, // list of receivers
        subject: "Test Mail From Node APP",
        text: "This is the plain text body.", // plain text body
        html: "<b>This is the test email content for the node app</b>", // html body
    });

    return info.messageId ?? null;
};