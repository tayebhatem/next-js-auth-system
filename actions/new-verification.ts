'use server'

import { getUserByEmail } from "@/data/user"
import { getVerificationTokenByToken } from "@/data/verification-token"
import { db } from "@/lib/db"


export const newVerfication=async(token:string)=>{
const exisitingToken=await getVerificationTokenByToken(token)
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

await db.user.update({
    where:{id:exisitingUser.id},
    data:{
        emailVerified:new Date(),
        email:exisitingToken.email
    }
}
)

await db.verificationToken.delete({
    where:{id:exisitingToken.id}
})
return {sucess:"Email has been verified !"}
}

