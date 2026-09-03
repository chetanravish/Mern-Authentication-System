import nodemailer from "nodemailer";
import config from "../config/config.js";

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        type:'OAuth2',
        user: config.GOOGLE_USER,
        clientId:config.GOOGLE_CLIENT_ID,
        clientSecret:config.GOOGLE_CLIENT_SECRET,
        refreshToken:config.GOOGLE_REFRESH_TOKEN,
    }
})

transporter.verify((error,success)=>{
    if(error){
        console.log('Error connecting to email server',error)
    }   else{
        console.log('Email server is ready to send message')
    }
})

export const sendEmail = async(to,subject,text,html) =>{
    try{
        const info = await transporter.sendMail({
            from:`"Chetan Ravish" <${config.GOOGLE_USER}>`,
            to,
            subject,
            text,
            html
        });
        console.log(`Message sent: %s`,info.messageId)
        console.log(`preview url: %s`, nodemailer.getTestMessageUrl(info))
    }catch{
        console.error('Error sending email:',error)
    }
}