'use server';
import * as z from "zod"
import bcrypt from "bcryptjs" 
import { RegisterSchema } from "@/schemas"
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";
export const register= async(values:z.infer<typeof RegisterSchema>)=>{

  const validatedFields=RegisterSchema.safeParse(values);
  if(!validatedFields.success){
    return {error: "Invalid fields !"}
  }else{
    const {email,password,name}=validatedFields.data;

    const hashedpassword=await bcrypt.hash(password,10);
    const userExists=await getUserByEmail(email)
    if(userExists){
      return {error:"User already exists"}
    }
    await db.user.create({
      data:{
        name,email,password:hashedpassword
      }
    });
    //TODO: send verification token
    const verificationToken=await generateVerificationToken(email)
    sendVerificationEmail(verificationToken.email,verificationToken.token)
    return {sucess: "Confirmation email sent !"}
  }
 
}