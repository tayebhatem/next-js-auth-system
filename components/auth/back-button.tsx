import Link from "next/link";
import { Button } from "../ui/button"
interface BackButtonprops{
    href:string;
    label:string
}
export const BackButton=({href,label}:BackButtonprops)=>{
    return(
        <Button variant={"link"} className="w-full" asChild>
        <Link href={href}>  
        {label}
        </Link>
        </Button>
    )
}