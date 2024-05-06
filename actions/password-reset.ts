'use server';
import {PasswordSchema, RestSchema} from "@/schemas/index"
import * as z from "zod"
import { getUserByEmail } from "@/data/user"
import bcrypt from "bcryptjs" 
import { db } from "@/lib/db";
;
import { getPasswordTokenByToken } from "@/data/forget-password-token";
export const resetPassword=async(values:z.infer<typeof PasswordSchema>,token:string)=>{
    const validatedFields=PasswordSchema.safeParse(values);
    if(!validatedFields.success){
        return {error: "Invalid password !"}
      }
     
      const exisitingToken=await getPasswordTokenByToken(token)
      if(!exisitingToken){
      return {error:'Token does not exists!'}
      }
      const hasExpired=new Date(exisitingToken.expires) < new Date();
      if(hasExpired){
        return {error:"Token has expired!"}
      }
      
      const exisitingUser=await getUserByEmail(exisitingToken.email)
      if(!exisitingUser){
          return {error:"Email does not exists!"}
      }
      const {password}=validatedFields.data
      const hashedpassword=await bcrypt.hash(password,10);

      await db.user.update({
          where:{id:exisitingUser.id},
          data:{
             password:hashedpassword,
              email:exisitingToken.email
          }
      }
      )
      
     

   return {sucess:"password has been changed !"}
}