'use server';
import * as z from "zod"
import { LoginSchema } from "@/schemas"
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { getUserByEmail } from "@/data/user";
import { generateTwoFactorToken, generateVerificationToken } from "@/lib/tokens";
import { sendTwoFactorEmail, sendVerificationEmail } from "@/lib/mail";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { db } from "@/lib/db";
import {  getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";
export const login= async(values:z.infer<typeof LoginSchema>,callBackUrl?:string | null)=>{

  const validatedFields=LoginSchema.safeParse(values);
 
  if(!validatedFields.success){
    return {error: "Invalid fields !"}
  }else{

    const {email,password,code}=validatedFields.data;
   const existingUser=await getUserByEmail(email);
   
   if(!existingUser || !existingUser.email || !existingUser.password){
    return {error:"User does not exists!"}
   }

   if(!existingUser.emailVerified){
    const verificationToken=await generateVerificationToken(email);
   
    sendVerificationEmail(verificationToken.email,verificationToken.token)
    return {sucess: "Confirmation email sent !"}
   }

   if(existingUser.isTwoFactorEnabled && existingUser.email){

    if(code){
      const twoFactorToken=await getTwoFactorTokenByEmail(existingUser.email)
      if(!twoFactorToken){
        return {error:"Invalid code!"}
      }
      if(twoFactorToken.token!==code){
        return {error:"Invalid code!"}
      }
      const hasExpired=new Date(twoFactorToken.expires) < new Date();
if(hasExpired){
  return {error:"code has expired!"}
}
await db.twoFactorToken.delete({
  where:{id:twoFactorToken.id}
})
const exisitingConfirmation=await getTwoFactorConfirmationByUserId(existingUser.id)
if(exisitingConfirmation){
  await db.twoFactorConfirmation.delete({
    where:{id:exisitingConfirmation.id}
  })
  
}
await db.twoFactorConfirmation.create({
  data:{userId:existingUser.id}
})
    }else{
      const twoFactorToken=await generateTwoFactorToken(existingUser.email);
      await sendTwoFactorEmail(twoFactorToken.email,twoFactorToken.token)
  
      return {twoFactor:true}
    }

  
   }

  try {
    await signIn("credentials",{email,password,redirectTo:callBackUrl || DEFAULT_LOGIN_REDIRECT})
  } catch (error) {
    if(error instanceof AuthError){
        switch(error.type){
            case "CredentialsSignin":
                return{
                    error:'Wrong email or password!'
                }
            default:
                return{
                    error:'Somthing went wrong!'
                }
        }
       
    }
    
    throw error;
  }
 
  };
  
 
}