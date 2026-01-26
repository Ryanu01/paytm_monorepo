import express from "express"
import prisma from "@repo/db"
import cors from "cors"
const app = express()
app.use(cors())
app.use(express.json())
import { z } from "zod"

export const PaymentSchema = z.object({
    token: z.string()
})
app.post("/hdfcWebhook", async (req, res) => {
    const body = req.body;

    const { success, data } = PaymentSchema.safeParse(body)

    if(!success) {
        return res.status(411).json({
            message: "INVALID_SCHEMA",
            success: false
        })
    }

    const PaymentInformantion : {
        token: string,
    } = {
        token: data.token
    }

    try {    const { success, data } = PaymentSchema.safeParse(body)

    if(!success) {
        return res.status(411).json({
            message: "INVALID_SCHEMA",
            success: false
        })
    }

    const PaymentInformantion : {
        token: string,
    } = {
        token: data.token
    }

        
        const txn = await prisma.onRampTransaction.findFirst({
            where: {
                token: PaymentInformantion.token
            }
        })

        if(!txn) {
            return res.status(400).json({
                message:"TOKEN_INVALID"
            })
        }

        await prisma.$transaction([
            prisma.balance.updateMany({
                where: {
                    userId: Number(txn.userId)
                },
                data: {
                    amount: {
                        increment: Number(txn.amount)
                    }
                }
            }),
            prisma.onRampTransaction.update({
                where: {
                    token: PaymentInformantion.token
                },
                data: {
                    status: "success"
                }
            })
        ])

        return res.status(200).json({
            message: "captured"
        })
    } catch (error) {

        await prisma.onRampTransaction.update({
            where: {
                token: PaymentInformantion.token
            },
            data: {
                status: "Failed"
            }
        })

        return res.status(400).json({
            message: error
        })
    }
})

app.listen(3003, () => {
    console.log("Server running on port 3003");  
})