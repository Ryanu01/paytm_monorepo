import { z } from "zod"

export const SignInSchema = z.object({
    phone: z.number(),
    password: z.string().min(6)
})