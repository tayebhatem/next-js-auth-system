import Image from "next/image";
import { Button } from "@/components/ui/button"
import { LoginButton } from "@/components/auth/login-button";

export default function Home() {
  
  return (
   <main className="flex w-full h-screen  flex-col gap-2 justify-center items-center ">
    
   <h1 className="text-4xl capitalize font-bold">welcome to Next js Auth</h1>
   <p className="text-lg">This is an authentification page with next js auth</p>
   <LoginButton>
   <Button size={"lg"}>Sign in</Button>
   </LoginButton>
  
   </main>
  );
}
