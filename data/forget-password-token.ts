import { db } from "@/lib/db";
export const getPasswordTokenByEmail=async(email:string)=>{
  try {
     const passwordToken=await db.forgetPaasswordToken.findFirst({
        where:{email}
    });
    return passwordToken;
  } catch (error) {
    return null
  }
}
export const getPasswordTokenByToken=async(token:string)=>{
    try {
       const passwordToken=await db.forgetPaasswordToken.findUnique({
          where:{token}
      });
      return passwordToken;
    } catch (error) {
      return null
    }
  }