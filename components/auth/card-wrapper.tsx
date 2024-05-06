'use client';

import {  Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle} from "../ui/card";
import { BackButton } from "./back-button";
import { Header } from "./header";
import { Social } from "./social";

interface CardWrapperProps{
    children:React.ReactNode;
    headerLabel:string;
    backButtonLabel:string;
    backButtonHref:string;
    showSocial?:boolean;
}

export const CardWarappr=({children,headerLabel,backButtonLabel,backButtonHref,showSocial}:CardWrapperProps)=>{
    return(
     <Card className="w-[400px]">
        <CardHeader>
            <Header label={headerLabel}/>
        </CardHeader>
        <CardContent>
        {children}
        </CardContent>
       {
        showSocial && (
            <CardFooter>
                <Social/>
            </CardFooter>
        )
       }
       <CardFooter>
        <BackButton href={backButtonHref} label={backButtonLabel}/>
       </CardFooter>
     </Card>
    )
}