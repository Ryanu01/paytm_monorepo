"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import prisma from "@repo/db"

export const createOnRampTransaction = async (
    provider: string,
    amount: Number
) => {
    const session = await getServerSession(authOptions)

    if(!session?.user?.id || !session?.user) {
        return {
            message: "Unauthenticated request"
        }
    }

    const token = (Math.random()*1000).toString()
    await prisma.onRampTransaction.create({
        data: {
            status: "Processing",
            userId: Number(session?.user.id),
            token: (Math.floor(Number(token))).toString(),
            startTime: new Date(),
            amount: Number(amount) * 100,
            provider: provider
        }
    })

    return {
        message: "Done"
    }
}