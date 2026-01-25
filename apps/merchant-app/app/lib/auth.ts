import prisma from "@repo/db"
import GoogleProvider from "next-auth/providers/google"

export const authOptions = {
    providers : [
        GoogleProvider({
            clientId: process.env.CLIENT_ID ?? "",
            clientSecret: process.env.CLIENT_SECRET ?? ""
        })       
    ],
    callbacks: {
        async signIn({user, account}: any) {
            try {
                if(account.provider === "google") {
                    if(!user.email) {
                        return false
                    }

                    await prisma.merchant.upsert({
                        where: {
                            email: user.email
                        },
                        update: {
                            name: user.name
                        },
                        create: {
                            name: user.name,
                            email: user.email,
                            auth_type: "Google"
                        }
                    })
                }
                return true    
            } catch (error) {
                console.log(error);
                return false
            }
            
        },
        async jwt({token, account}: any) {
            if(account?.provider === "google") {
                const dbUser = await prisma.merchant.findUnique({
                    where: {
                        email: token.email
                    }
                })

                if(!dbUser) {
                    return null;
                }

                token.id = dbUser.id
            }
            return token;
        },
        async session({session, token}: any) {
            if(session.user) {
                session.user.id = token.id as string
            }
            return session
        }
    }
}

