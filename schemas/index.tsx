import * as z from "zod"

export const LoginSchema=z.object(
    {
        email:z.string().email(
            {
                
            }
        ),
        password:z.string().min(1,
           {
            message:"Password is required "
           }
        ),
        
        code: z.string().min(6, {
            message: "Your code must be 6 numbers.",
          }).optional()
    }
)

export const RestSchema=z.object(
    {
        email:z.string().email(
            {
                
            }
        )
    }
)

export const PasswordSchema=z.object(
    {
        password:z.string().min(6,
            {
                message:"Password should be 6 characters at least"
               }
        ),
        passwordConfirm:z.string().min(6,
            {
                message:"Password should be 6 characters at least"
               }
        )
    }
)
export const RegisterSchema=z.object(
    {
        email:z.string().email(
            {
                
            }
        ),
        password:z.string().min(6,
            {
                message:"Password should be 6 characters at least"
               }
        ),
        name:z.string().min(1,
            {
                message:"Name is required"
               }
        )
    }
)
export const ConfirmCodeSchema = z.object({
    pin: z.string().min(6, {
      message: "Your code must be 6 numbers.",
    }),
  })