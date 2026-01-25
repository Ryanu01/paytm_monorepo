"use client"

import { Button } from "@repo/ui/button"
import { NavBar } from "@repo/ui/navbar"
import { signIn, signOut, useSession } from "next-auth/react"

export default function Home() {
  const session = useSession()
  return (
    <div >
      <NavBar user={session.data?.user} onSignin={signIn} onSignout={signOut}></NavBar>
     </div>
  )
}