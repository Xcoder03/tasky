import nodemailer from 'nodemailer';

const sendEmail = async (email, subject, html) => {
    const transporter = nodemailer.createTransport({
        host: process.env.HOST,
        service: 'gmail',
        port: 587,
        secure: true, 
        auth:{
             user:process.env.USER,
             pass: process.env.EMAIL_PASSWORD,
        }
    })


    const mailOptions = {
        from:  process.env.USER,
        to: email,
        subject: subject,
        html: html,

    }
    await transporter.sendMail(mailOptions)

}

export default sendEmail