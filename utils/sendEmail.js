import nodemailer from 'nodemailer';
const sendEmail = async (email, sudject, text) => {
    try{
        const transpoter = nodemailer.createTransport({
            host: process.env.HOST,
            service: process.env.SERVICE,
            port: 587,
            secure: true,
            auth:{
                user: process.env.USER,
                pass: process.env.PASS,
            },
        })
        await transpoter.sendMail({
            from: process.env.USER,
            to: email,
            subject: subject,
            text: text,
        })
        console.log("Email sent successfully")
    }catch(err){
        console.log("email  not send, an error occured")
    }
}

export default sendEmail