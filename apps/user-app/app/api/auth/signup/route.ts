import { NextRequest, NextResponse } from "next/server";
import { SignUpSchema } from "../../../lib/types";
import prisma from "@repo/db";
import bcrypt from "bcrypt";

export async function POST (req: NextRequest) {
    try {
        
        const body = await req.json()
        const { success, data } = SignUpSchema.safeParse(body)

        if(!success) {
            return NextResponse.json({
                message:"INVALID_INPUTS"
            }, {
                status: 400
            })
        }

        const existingUser = await prisma.user.findFirst({
            where: {
                number: data.number
            }
        })        

        if(existingUser) {
            return NextResponse.json({
                message: "User already exists"
            }, {
                status: 400
            })
        }
        const hashedPassword = await bcrypt.hash(data.password, 12)
        const user = await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: hashedPassword,
                number: data.number
            }
        })

        const balanceDb = await prisma.balance.create({
            data: {
                userId: user.id,
                amount: 0,
                locked: 0
            }
        })
        return NextResponse.json({
            id: user.id.toString(),
            name: user.name,
            email: user.email,
            amount: balanceDb.amount
        }, {
            status: 201
        })
    } catch (error) {
        return NextResponse.json({
            error
        }, {
            status: 500
        })        
    }
}