"use client"

import { NavBar } from "@repo/ui/navbar"
import { signIn, signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export function AppBar() {
  const session = useSession()
  const router = useRouter()

  return <div>

    <NavBar user={session.data?.user} onSignin={signIn} onSignout={async () => {
      signOut({ redirect: false })
      router.push("/api/auth/signin")
    }}></NavBar >
  </div >
}

