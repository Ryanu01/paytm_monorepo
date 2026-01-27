import { Center } from "@repo/ui/center"
import { ReceivedTransaction, Transactions } from "../app/lib/actions/transaction"
import { Transaction } from "./Transactions"
import { ReceivedTransactions } from "./ReceivedTransactions"

export default async function ShowRecentTransactions() {
  const txn = await Transactions()
  const rcvTxn = await ReceivedTransaction()
  return (
    <Center>
      
        <div className="m-2 min-w-100 pt-2 space-y-3">
        <Transaction transactions={txn} />
        </div>
        <div className="m-2 min-w-100 pt-2 space-y-3">
          <ReceivedTransactions transactions={rcvTxn} />
        </div>
      
    </Center>
  )
}

