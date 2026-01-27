import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db";
import { redirect } from "next/navigation"

export async function Transactions () {
    const session = await getServerSession(authOptions)
    if(!session?.user?.id) {
        redirect("/api/auth/signin")
    }

    const userSpendTransactions = await prisma.p2PTransaction.findMany({
        where: {
            fromUserId: Number(session?.user?.id)
        }
    })

    return userSpendTransactions.map(x => ({
        amount: x.amount.toString(),
        time: x.timeStamp
    }))    
}

export async function ReceivedTransaction () {
    const session = await getServerSession(authOptions)
    if(!session?.user?.id) {
        redirect("/api/auth/signin")
    }

    const userSpendTransactions = await prisma.p2PTransaction.findMany({
        where: {
            toUserId: Number(session?.user?.id)
        }
    })

    return userSpendTransactions.map(x => ({
        amount: x.amount.toString(),
        time: x.timeStamp
    }))    

}
