import prisma from "@repo/db"
import { getServerSession } from "next-auth"
import { authOptions } from "../../lib/auth"
import { OnRampTransaction } from "../../../components/OnRampTransaction"
import { BalanceCard } from "../../../components/BalanceCard"
import { AddMoneyCard } from "../../../components/AddMoneyCard"
import { redirect } from "next/navigation"

async function getBalance() {
  const session = await getServerSession(authOptions)
  if(!session) {
    redirect("/api/auth/signin")
  }
  const balance = await prisma.balance.findFirst({
    where: {
      userId: Number(session?.user?.id)
    }
  })

  return {
    amount: balance?.amount || 0,
    locked: balance?.locked || 0
  }
}

async function getOnRampTransactions () {
  const session = await getServerSession(authOptions)
  if(!session) {
    redirect("/api/auth/signin")
  }
  const txs = await prisma.onRampTransaction.findMany({
    where: {
      userId: Number(session?.user?.id)
    }
  })

  return txs.map(t => ({
    time: t.startTime,
    amount: t.amount,
    status: t.status,
    provider: t.provider
  }))
}

export default async function() {
    const balance = await getBalance();
    const transactions = await getOnRampTransactions();

    return <div className="w-screen">
        <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
            Transfer
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
            <div>
                <AddMoneyCard />
            </div>
            <div>
                <BalanceCard amount={balance.amount} locked={balance.locked} />
                <div className="pt-4">
                    <OnRampTransaction transactions={transactions} />
                </div>
            </div>
        </div>
    </div>
}