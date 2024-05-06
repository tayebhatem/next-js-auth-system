import { getVerificationTokenByEmail } from "@/data/verification-token";
import {v4 as uuidv4} from "uuid"
import crypto from "crypto"
import { db } from "./db";
import { getPasswordTokenByEmail } from "@/data/forget-password-token";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";


export const generateVerificationToken=async(email:string)=>{
   const token=uuidv4();
   const expires=new Date(new Date().getTime()+3600*1000)
   const exisitingToken=await getVerificationTokenByEmail(email);
if(exisitingToken){
    await db.verificationToken.delete({
        where: {
            id:exisitingToken.id
        }
    })
}

const verificationToken=await db.verificationToken.create({
    data:{
        email,token,expires
    }
});

return verificationToken

}


export const generateForgetPasswordToken=async(email:string)=>{
    const token=uuidv4();
    const expires=new Date(new Date().getTime()+3600*1000)
    const exisitingToken=await getPasswordTokenByEmail(email);
 if(exisitingToken){
     await db.forgetPaasswordToken.delete({
         where: {
             id:exisitingToken.id
         }
     })
 }
 
 const forgetPaasswordToken=await db.forgetPaasswordToken.create({
     data:{
         email,token,expires
     }
 });
 
 return forgetPaasswordToken
 
 }



 export const generateTwoFactorToken=async(email:string)=>{
    const token=crypto.randomInt(100_000, 1_000_000).toString();
    const expires=new Date(new Date().getTime()+5*60*1000)
    const exisitingToken=await getTwoFactorTokenByEmail(email);
 if(exisitingToken){
     await db.twoFactorToken.delete({
         where: {
             id:exisitingToken.id
         }
     })
 }
 
 const twoFactorToken=await db.twoFactorToken.create({
     data:{
         email,token,expires
     }
 });
 
 return twoFactorToken
 
 }