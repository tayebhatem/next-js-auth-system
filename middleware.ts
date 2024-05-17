import authConfig from "./auth.config"
import NextAuth from "next-auth"

import {
DEFAULT_LOGIN_REDIRECT,apiAuthPrefix,authRoutes, publicRoutes,
}from "@/routes"

export const { auth } = NextAuth(authConfig)


export default  auth((req)=>{

const {nextUrl,auth}=req;

const isApiAuthRoute=nextUrl.pathname.startsWith(apiAuthPrefix);
const isPublicRoute=publicRoutes.includes(nextUrl.pathname);
const isAuthRoute=authRoutes.includes(nextUrl.pathname);
const isDefualtLogin=DEFAULT_LOGIN_REDIRECT;
if(isApiAuthRoute){
    return 
}

if(isAuthRoute){

if(auth){
  
  return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT,nextUrl))
}
  return 

}




if(!auth && !isPublicRoute){
    return Response.redirect(new URL(`/auth/login`,nextUrl))
}

return ;

});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};