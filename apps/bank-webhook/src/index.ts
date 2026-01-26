import express from "express"
import { PaymentSchema } from "./types";
import prisma from "@repo/db"

const app = express()

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
            userId: string,
            amount: string
        } = {
            token: data.token,
            userId: data.userId,
            amount: data.amount
        }

    try {
        
        await prisma.$transaction([
            prisma.balance.updateMany({
                where: {
                    userId: Number(PaymentInformantion.userId)
                },
                data: {
                    amount: {
                        increment: Number(PaymentInformantion.amount)
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