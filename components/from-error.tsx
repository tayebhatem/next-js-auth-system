import { AlertCircle,CheckCircle } from "lucide-react"


interface AlertProps{
    message:string;
    type:string;
}
export function Alert({message,type}:AlertProps) {
  return (
    <div className={
        type==='error'?"bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-destructive text-sm":
        "bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-emerald-500 text-sm"
    }>
    {
        type==='error'?<AlertCircle className="h-4 w-4"/>:<CheckCircle className="h-4 w-4"/>
    }
    <p>{message}</p>
    </div>
  )
}
