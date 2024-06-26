'use client'

import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"
import { Button } from "../ui/button"
import { signIn } from "next-auth/react"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { useSearchParams } from "next/navigation"
export const Social=()=>{
  const searchPrams=useSearchParams();
  const callBackUrl=searchPrams.get("callBackUrl")
    const clickAuth=async(provider: "google" | "github")=>{
      await signIn(provider,{
        callbackUrl:callBackUrl || DEFAULT_LOGIN_REDIRECT
      })
    }
    return(
        <div className="flex items-center gap-x-2 w-full">
         <Button variant={"outline"} className="w-full" size={"lg"} onClick={()=>clickAuth("google")}>
            <FcGoogle className="h-5 w-5"/>
         </Button>
         <Button variant={"outline"} className="w-full" size={"lg"} onClick={()=>clickAuth("github")}>
            <FaGithub className="h-5 w-5"/>
         </Button>
        </div>
    )
}