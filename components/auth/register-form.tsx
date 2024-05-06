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
import { RegisterSchema } from "@/schemas"
import { Button } from "../ui/button"
import { Alert } from "../from-error"

import { useState, useTransition } from "react"
import { register } from "@/actions/register"

export  const RegisterForm=()=>{
   const[isPending,startTransition]=useTransition();
   const[error,setError]=useState<string | undefined>("")
   const[sucess,setSucess]=useState<string | undefined>("")
    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
          email: "",
          password:""
        },
      });
     
    
      function onSubmit(values: z.infer<typeof RegisterSchema>) {
        setError("");
        setSucess("");
        startTransition(()=>{
            register(values).then(
                (data)=>{
                    setError(data?.error)
                    setSucess(data?.sucess)
                }
            )
        })
       
      }
    
    return(
     <CardWarappr
     headerLabel="Create an account"
     backButtonLabel="Already have account ?"
     backButtonHref="/auth/login"
     showSocial
     >
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-3">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Tayeb Hatem" {...field} disabled={isPending} />
              </FormControl>
             
              <FormMessage />
            </FormItem>
            
          )}
        />
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
        <Button type="submit" className="w-full" disabled={isPending}>Register</Button>
      </form>
    </Form>
     </CardWarappr>
    )
}