import ShowRecentTransactions from "../../../components/ShowRecentTransactions"
import { Transaction } from "../../../components/Transactions"
import { Transactions } from "../../lib/actions/transaction"

export default async function Home() {
  return <div className="w-screen">
    <ShowRecentTransactions />
  </div>
}
