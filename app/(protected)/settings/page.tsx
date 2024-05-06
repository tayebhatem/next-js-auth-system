'use client'
import Link from "next/link"

import { Switch } from "@/components/ui/switch"

import {
  Card,
  CardContent,

  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Label } from "@radix-ui/react-label"
import { useCurrentUser } from "@/hooks/useCuurentUser"
import { useEffect, useState } from "react"
import { updateTwoFactor } from "@/actions/two-factor-toggle"


export default function Settings() {
  const [factor,setFactor]=useState<boolean | undefined>();
   const user=useCurrentUser()
   const toggleTwoFactor=()=>{
     if (user?.id){
      setFactor(!factor)
      updateTwoFactor(!factor,user.id)
     }
      
     
     
    
    
    
     
   }
   useEffect(()=>{
     setFactor(user?.isTwoFactorEnabled)
     
   },[user])
  return (
    
   
      
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">Settings</h1>
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <nav
            className="grid gap-4 text-sm text-muted-foreground" x-chunk="dashboard-04-chunk-0"
          >
            <Link href="#" className="font-semibold text-primary">
              General
            </Link>
            <Link href="#">Security</Link>
            <Link href="#">Integrations</Link>
            <Link href="#">Support</Link>
            <Link href="#">Organizations</Link>
            <Link href="#">Advanced</Link>
          </nav>
          <div className="grid gap-6">
            <Card x-chunk="dashboard-04-chunk-1">
              <CardHeader>
                <CardTitle>Account</CardTitle>
               
              </CardHeader>
              <CardContent>
               <div className="flex flex-col gap-y-4 ">
               <div >
               <Label>ID</Label>
               <div className="p-2 border-2  text-muted-foreground rounded-md">
               {user?.id}
               </div>
               </div>

               <div >
               <Label>Name</Label>
               <div className="p-2 border-2  text-muted-foreground  rounded-md">
               {user?.name}
               </div>
               </div>

               <div >
               <Label>Email</Label>
               <div className="p-2 border-2  text-muted-foreground rounded-md">
               {user?.email}
               </div>
               </div>

              

               

               <div className="flex items-center space-x-2">
               <Label htmlFor="airplane-mode">Two Factor Authentification</Label>
      <Switch id="airplane-mode" checked={factor}  onCheckedChange={toggleTwoFactor} />
     
    </div>
               </div>
              </CardContent>
             
            </Card>
           
          </div>
        </div>
      </main>
      
   
  )
}
