'use server';
import {RestSchema} from "@/schemas/index"
import * as z from "zod"
import { getUserByEmail } from "@/data/user"
import { generateForgetPasswordToken } from "@/lib/tokens";
import { sendPasswordReset } from "@/lib/mail";
export const reset=async(values:z.infer<typeof RestSchema>)=>{
    const validatedFields=RestSchema.safeParse(values);
    if(!validatedFields.success){
        return {error: "Invalid email !"}
      }
      const {email}=validatedFields.data
    const exisitingUser=await getUserByEmail(email);
    if(!exisitingUser) {
        return {error:"Email not found!"}
    }

    const passwordToken=await generateForgetPasswordToken(email);
  
   await sendPasswordReset(passwordToken.email,passwordToken.token)
   return {sucess:"Email sent !"}
}