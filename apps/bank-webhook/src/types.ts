import { z } from "zod"

export const PaymentSchema = z.object({
    token: z.string(),
    userId: z.string(),
    amount: z.string()
})