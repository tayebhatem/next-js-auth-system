'use client'

import { CardWarappr } from "./card-wrapper"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import * as z from "zod"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
  import { Input } from "@/components/ui/input"
import {  PasswordSchema, RestSchema } from "@/schemas"
import { Button } from "../ui/button"
import { Alert } from "../from-error"

import { useState, useTransition } from "react"

import { reset } from "@/actions/reset"
import { resetPassword } from "@/actions/password-reset"
import { useSearchParams } from "next/navigation"


export default function NewPasswordForm() {
    const searchParams=useSearchParams();
    const token=searchParams.get("token")
    const[isPending,startTransition]=useTransition();
    const[error,setError]=useState<string | undefined>("")
    const[sucess,setSucess]=useState<string | undefined>("")
     const form = useForm<z.infer<typeof PasswordSchema>>({
         resolver: zodResolver(PasswordSchema),
         defaultValues: {
           password: "",
           passwordConfirm:""
         },
       });
      
     
       function onSubmit(values: z.infer<typeof PasswordSchema>) {
         setError("");
         setSucess("");
         if(values.password!=values.passwordConfirm) {
            setError("Passwords does not match!")
            return
        }
         startTransition(()=>{
           if(!token) return 
            resetPassword(values,token).then(
                 (data)=>{
                    setError(data?.error)
                    setSucess(data?.sucess)
 
                  
                 }
             )
         })
        
       }
  return (
    <CardWarappr
     headerLabel="Reset password"
     backButtonLabel="Back to login ?"
     backButtonHref="/auth/login"
     
     >
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        
      <div className="space-y-3">
      <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New password</FormLabel>
              <FormControl>
                <Input placeholder="*********" type="password" {...field} disabled={isPending} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
            
          )}
        />
         <FormField
          control={form.control}
          name="passwordConfirm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input placeholder="*********" type="password" {...field} disabled={isPending} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
            
          )}
        />
         
        </div>
         
         
     
        
       {
        error && <Alert message={error} type="error"/>
       
       }
      
       {
        sucess && <Alert message={sucess} type="sucess"/>
       }
        <Button type="submit" className="w-full" disabled={isPending} size={"lg"} >Save</Button>
      </form>
    </Form>
     </CardWarappr>
  )
}
