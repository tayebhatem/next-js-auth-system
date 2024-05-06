'use client'

import { CardWarappr } from "./card-wrapper"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useSearchParams } from "next/navigation"
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
import { LoginSchema } from "@/schemas"
import { Button } from "../ui/button"
import { Alert } from "../from-error"
import { login } from "@/actions/login"
import { useState, useTransition } from "react"
import Link from "next/link"

import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp"

export  const LoginForm=()=>{
    const searchPrams=useSearchParams();
    const callBackUrl=searchPrams.get("callBackUrl")
    const urlErorr=searchPrams.get("error")==="OAuthAccountNotLinked" ? "Email already used!":""
   const[isPending,startTransition]=useTransition();
   const[error,setError]=useState<string | undefined>("")
   const[sucess,setSucess]=useState<string | undefined>("")
   const[twoFactor,setTwoFactor]=useState<boolean | undefined>()
   
  
  
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
          email: "",
          password:""
        },
      });
     
    
      function onSubmit(values: z.infer<typeof LoginSchema>) {
        setError("");
        setSucess("");
       
        startTransition(()=>{
            login(values,callBackUrl).then(
                (data)=>{
                  if(data?.error){
                    form.reset()
                    setError(data?.error)
                  }
                 if(data?.sucess){
                  form.reset()
                  setSucess(data?.sucess)
                 }
                 if(data?.twoFactor){
                  setTwoFactor(true)
                 
                 }
                }
            )
        })
       
      }
    
    return(
 
    
    <CardWarappr
    headerLabel="Welcome back"
    backButtonLabel="Don't have account ?"
    backButtonHref="/auth/register"
    showSocial={!twoFactor}
    >
    {
      twoFactor?
      <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full ">
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem className="w-full flex flex-col justify-center items-center">
              <FormLabel>Confirm code</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field} className="w-full">
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormDescription className="text-center">
                Please enter the one-time password sent to your email.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isPending}>Confirm</Button>
      </form>
      {
       error && <Alert message={error} type="error"/>
      
      }
    </Form>
      : <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-3">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="tayebhatem@gmail.com" {...field} disabled={isPending} />
              </FormControl>
             
              <FormMessage />
            </FormItem>
            
          )}
        />
         <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="*********" type="password" {...field} disabled={isPending} />
              </FormControl>
              <Button variant={"link"} className="px-0"><Link href={"/auth/reset"}>Forget password ?</Link></Button>
              <FormMessage />
            </FormItem>
            
          )}
        />
         
        </div>
        
       {
        error ? <Alert message={error} type="error"/>:
        urlErorr ? <Alert message={urlErorr} type="error"/>:null
       }
      
       {
        sucess && <Alert message={sucess} type="sucess"/>
       }
        <Button type="submit" className="w-full text-lg " disabled={isPending} size={"lg"} >{twoFactor?"Confirm":"Login"}</Button>
      </form>
    </Form>

    }
    </CardWarappr>
  
    )
}