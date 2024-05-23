
import nodemailer from "nodemailer"


const publicUrl=process.env.NEXT_PUBLIC_URL

const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
      user: "mailauthjs@gmail.com",
      pass: process.env.NEXT_STMP_PASSWORD,
    },
    secure:true
  });


export const sendVerificationEmail=async(email:string,token:string)=>{
   
    const confirmEmail = `${publicUrl}/auth/new-verification?token=${token}`;
      return await new Promise((resolve, reject) => {
        transporter.sendMail({
          to: email, // list of receivers
        subject: "Confirm email", // Subject line
        html: `<p>Click <a href="${confirmEmail}">here</a> to confirm email</p>`, // html body
        }, (err, info) => {
            if (err) {
                reject(err);
            } else {
                resolve(info);
            }
        });
    });
}

export const sendTwoFactorEmail=async(email:string,token:string)=>{
   
      return await new Promise((resolve, reject) => {
        transporter.sendMail({
          to: email, 
          subject: "Confirm email", 
          html:`<p>Your confirmation code is ${token} </p>`
        }, (err, info) => {
            if (err) {
                reject(err);
            } else {
                resolve(info);
            }
        });
    });
      
}

  export const sendPasswordReset=async(email:string,token:string)=> {
    const resetLink = `${publicUrl}/auth/new-password?token=${token}`;
    // send mail with defined transport object
   
    return await new Promise((resolve, reject) => {
      transporter.sendMail({
        to: email, // list of receivers
        subject: "Reset your password", // Subject line
        html: `<p>Click <a href="${resetLink}">here</a> to reset your password</p>`, // html body
      }, (err, info) => {
          if (err) {
              reject(err);
          } else {
              resolve(info);
          }
      });
  });
  }