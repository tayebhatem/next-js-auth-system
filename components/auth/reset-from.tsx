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
import {  RestSchema } from "@/schemas"
import { Button } from "../ui/button"
import { Alert } from "../from-error"

import { useState, useTransition } from "react"

import { reset } from "@/actions/reset"


export default function ResetFrom() {
    const[isPending,startTransition]=useTransition();
    const[error,setError]=useState<string | undefined>("")
    const[sucess,setSucess]=useState<string | undefined>("")
     const form = useForm<z.infer<typeof RestSchema>>({
         resolver: zodResolver(RestSchema),
         defaultValues: {
           email: ""
         },
       });
      
     
       function onSubmit(values: z.infer<typeof RestSchema>) {
         setError("");
         setSucess("");
         startTransition(()=>{
             reset(values).then(
                 (data)=>{
                    setError(data?.error)
                    setSucess(data?.sucess)
 
                  
                 }
             )
         })
        
       }
  return (
    <CardWarappr
     headerLabel="Forget password"
     backButtonLabel="Back to login ?"
     backButtonHref="/auth/login"
     
     >
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        
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
         
         
     
        
       {
        error && <Alert message={error} type="error"/>
       
       }
      
       {
        sucess && <Alert message={sucess} type="sucess"/>
       }
        <Button type="submit" className="w-full" disabled={isPending} size={"lg"} >Send Reset email</Button>
      </form>
    </Form>
     </CardWarappr>
  )
}
