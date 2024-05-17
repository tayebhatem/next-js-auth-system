
import nodemailer from "nodemailer"


const publicUrl=process.env.NEXT_PUBLIC_URL

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
   
   
    auth: {
      user: "mailauthjs@gmail.com",
      pass: process.env.NEXT_STMP_PASSWORD,
    },
  });


export const sendVerificationEmail=async(email:string,token:string)=>{
   
    const confirmEmail = `${publicUrl}/auth/new-verification?token=${token}`;
 
    await transporter.sendMail({
        to: email, // list of receivers
        subject: "Confirm email", // Subject line
        html: `<p>Click <a href="${confirmEmail}">here</a> to confirm email</p>`, // html body
      });
}

export const sendTwoFactorEmail=async(email:string,token:string)=>{
    await transporter.sendMail({
        to: email, 
        subject: "Confirm email", 
        html:`<p>Your confirmation code is ${token} </p>`
      });
}

  export const sendPasswordReset=async(email:string,token:string)=> {
    const resetLink = `${publicUrl}/auth/new-password?token=${token}`;
    // send mail with defined transport object
    await transporter.sendMail({
      to: email, // list of receivers
      subject: "Reset your password", // Subject line
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password</p>`, // html body
    });
  }