
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import authConfig from "./auth.config"
import { getUserById } from "./data/user"
import NextAuth, { type DefaultSession } from "next-auth"
import { db } from "./lib/db"

import {  getTwoFactorConfirmationByUserId } from "./data/two-factor-confirmation"

const prisma = new PrismaClient()
declare module "next-auth" {
   
    interface Session {
      user: {

      role: "ADMIN" | "USER";
      isTwoFactorEnabled: boolean;
      provider:string
      
      } & DefaultSession["user"]
    }
  }
export const { handlers, auth,signIn,signOut } = NextAuth({
    pages:{
      signIn:"/auth/login",
      error:"/auth/error",
      
    },
    events:{
        linkAccount:async({user})=>{
   await db.user.update({
    where:{id:user.id},
    data:{emailVerified:new Date()}
})
        }
    },
callbacks:{
  async signIn({user,account}){
    if(account?.provider!=="credentials") return true
    
    const exisitingUser=await getUserById(user.id);


    if(!exisitingUser?.emailVerified) return false;

    if(exisitingUser.isTwoFactorEnabled) {
     
     const factorConfirmation=await getTwoFactorConfirmationByUserId(exisitingUser.id)
     
     if(!factorConfirmation) return false
     
     await db.twoFactorConfirmation.delete({
      where:{id:factorConfirmation.id}
     })
     
    }
    
   return true
  },
session({token,session}){
    
    if(token.sub && session.user){
       session.user.id=token.sub 
    }
   
    
    if(token.role && session.user){
      
        session.user.role=token.role as "ADMIN" | "USER"
     }
     if(session.user){
      session.user.isTwoFactorEnabled=token.isTwoFactorEnabled as boolean
     }
    
return session
},
async jwt({token}){
    if(!token.sub){
        return token
    }
    const userExists=await getUserById(token.sub)

    if (!userExists )return token
    token.role=userExists.role
    token.isTwoFactorEnabled=userExists.isTwoFactorEnabled
    
    return token
}
},
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
})