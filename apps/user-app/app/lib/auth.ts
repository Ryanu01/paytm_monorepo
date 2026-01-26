import prisma from "@repo/db";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt"
import { SignInSchema } from "./types";

export const authOptions = {
    providers: [ 
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                number: {label: "Phone Number", type: "text", placeholder: "123456"},
                password: {label: "Password", type: "password"}
            },
            async authorize(credentials) {
                if(!credentials) {
                    return null
                }
                
                const { success, data } = SignInSchema.safeParse(credentials)
                
                if(!success) {
                    return null
                }

                const existingUser = await prisma.user.findFirst({
                    where: {
                        number: data.number.toString()
                    }
                })

                if(existingUser) {
                    const passwordValidation = await bcrypt.compare(data.password, existingUser.password)
                    if (passwordValidation) {
                        return {
                            id: existingUser.id.toString(),
                            name: existingUser.name,
                            email: existingUser.email
                        }
                    }
                    return null
                }
                return null
            }
        }) 
    ],
    secret:  process.env.JWT_SECRET,
    callbacks: {
        async jwt ({token, user}: any) {
             if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
            }
            return token;
        },
        async session ({token, session}: any) {
            session.user.id = token.id;
            session.user.name = token.name;
            session.user.email = token.email;
            return session;
        },
    },
}
