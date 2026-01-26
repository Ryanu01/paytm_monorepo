"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import prisma from "@repo/db"

export async function P2ptransaction (number: string, amount: string) {
    
    const session = await getServerSession(authOptions)

    if(!session?.user?.id || !session.user) {
        return {
            message: "Error while sending"
        }
    }
    try {
        
        
        const to = await prisma.user.findFirst({
            where: {
                number: number
            }
        })

        
        if(!to) {
            return {
                message: "User not found"
            }
        }        

        
        await prisma.$transaction(async (tx) => {

            await tx.$executeRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(session?.user?.id)} FOR UPDATE;`

            const fromBalance = await tx.balance.findUnique({
                where: {
                    userId: Number(session?.user?.id)
                }
            })
            
            if(!fromBalance || fromBalance.amount < Number(amount)) {
                throw new Error("Insufficent Balance")
            }
            
            await tx.balance.update({
                where: {
                    userId: Number(session?.user?.id)
                },
                data: {
                    amount: {
                        decrement: Number(amount)
                        
                    }
                }
            })
            console.log("Enter transaction");
            
            await tx.balance.update({
                where: {
                    userId: to.id
                },
                data: {
                    amount: {
                        increment: Number(amount)
                    }
                }
            })
        })
    } catch (error) {
        return {
            message : error
        }
    }
}