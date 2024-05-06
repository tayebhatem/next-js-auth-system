

import { Resend } from 'resend';

const resend = new Resend(process.env.AUTH_RESEND_KEY);


export const sendVerificationEmail=async(email:string,token:string)=>{
   
    const confirmEmail = `https://next-js-auth-system-ten.vercel.app/auth/new-verification?token=${token}`;
    await resend.emails.send({
        from:'onboarding@resend.dev',
        to: email,
        subject:"Cofirm email",
        html:`<p>Click <a href="${confirmEmail}">here</a> to confirm email</p>`
    })
}
export const sendPasswordReset=async(email:string,token:string)=>{
    const resetLink = `https://next-js-auth-system-ten.vercel.app/auth/new-password?token=${token}`;
    await resend.emails.send({
        from:'onboarding@resend.dev',
        to: email,
        subject:"Reset your password",
        html:`<p>Click <a href="${resetLink}">here</a> to reset your password</p>`
    })
}
export const sendTwoFactorEmail=async(email:string,token:string)=>{
    
    await resend.emails.send({
        from:'onboarding@resend.dev',
        to: email,
        subject:"Cofirm email",
        html:`<p>Your confirmation code is ${token} </p>`
    })
}