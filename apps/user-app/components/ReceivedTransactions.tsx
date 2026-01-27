"use client"

import { Card } from "@repo/ui/card"

export const ReceivedTransactions = ({ transactions }: {
    transactions : {
        time: Date,
        amount: string,
    }[]
}) => {
    if(!transactions.length) {
        return <Card title="Money Received">
            <div className="text-center pb-8 pt-8">
                No Recent Transactions
            </div>
        </Card>
    }
    return <Card title="Money Received">
        {transactions.map((txn, _) => 
        <div key={_} className="flex space-x-4 justify-between">
            <div className="pb-4">
                <div className="text-sm pt-1">
                    Received INR
                </div>
                <div className="text-slate-600 text-xs">
                    {txn.time.toDateString()}
                </div>
            </div>
            <div>
                + Rs {Number(txn.amount) / 100}
            </div>
        </div>
        )}
    </Card>

}