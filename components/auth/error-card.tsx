import { BackButton } from "./back-button"
import { Card,CardHeader,CardFooter,CardContent } from "../ui/card"
import { Header } from "./header"
import { AlertTriangle } from "lucide-react"
export default function ErrorCard() {
  return (
   <Card className="w-[400px] shadow-md" >
  <CardHeader>
    <Header label="Oops somthing went wrong !"></Header>
  </CardHeader>
  <CardContent className="w-full flex justify-center">
    <AlertTriangle className="w-10 h-10 text-muted-foreground "/>
  </CardContent>
  <CardFooter>

    <BackButton 
    href="/auth/login"
    label="Back to login"
    />
  </CardFooter>
   </Card>
  )
}
