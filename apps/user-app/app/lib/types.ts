import { z } from "zod"

export const SignInSchema = z.object({
    number: z.string(),
    password: z.string().min(6)
})

export const SignUpSchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string().min(6),
    number: z.string()
})