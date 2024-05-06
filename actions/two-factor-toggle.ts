'use server'

import { db } from "@/lib/db"


export const   updateTwoFactor=async(twoFactor:boolean,id:string )=>{
 
 
  if(id){
    await db.user.update({
        where:{id},
        data:{isTwoFactorEnabled:twoFactor}
       })
   
  }
 
    
  
}