'use client'
import { useSearchParams } from "next/navigation"
import { CardWarappr } from "./card-wrapper"
import {BeatLoader} from "react-spinners"
import { useCallback, useEffect, useState } from "react";
import { newVerfication } from "@/actions/new-verification";
import { Alert } from "../from-error";
export default function VerificationForm() {
 const [error,setError]=useState<string | undefined>();
 const [sucess,setSucess]=useState<string | undefined>();
  const searchParams=useSearchParams();
  const token=searchParams.get("token")
  const onSumbit=useCallback(()=>{

   

    if (!token) {
    setError("Missing token!")
    return
  }
    newVerfication(token).then(
      data=>{
        setSucess(data.sucess)
       !sucess && setError(data.error)
      }
    ).catch(
      ()=>{
        setError("Somthing went wrong")
      }
    )
  },[token,sucess])
  useEffect(()=>{
    onSumbit()
  },[onSumbit])
  return (
    <CardWarappr
    headerLabel="Confirming your verification "
    backButtonLabel="Back to login"
    backButtonHref="/auth/login"
    >
    <div className="flex justify-center items-centers">
    {!error && !sucess && <BeatLoader/>}
     {
      !sucess && error && <Alert type="error" message={error}/>
     }
     {
      sucess && <Alert type="success" message={sucess}/>
     }
    </div>
    </CardWarappr>
  )
}
