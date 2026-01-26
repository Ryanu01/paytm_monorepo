"use client"

import { Card } from "@repo/ui/card"
import { TextInput } from "@repo/ui/textInput"
import { Select } from "@repo/ui/select"
import { useState } from "react"
import { Button } from "@repo/ui/button"
import { createOnRampTransaction } from "../app/lib/actions/createOnRampTransaction"

const SUPPORTED_BANKS = [{
  name: "HDFC Bank",
  redirectUrl: "https://netbanking.hdfcbank.com"
}, {
  name: "Axis Bank",
  redirectUrl: "https://www.axisbank.com"
}]

export const AddMoneyCard = () => {
  const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl)
  const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "")
  const [amount, setAmount] = useState(0)
  return <Card title="Add Money">
    <div>
      <TextInput label={"Amount"} placeholder={"Ammount"} onChange={(e) => 
        setAmount(Number(e))
      } />
      <div className="py-4 text-left">
        Bank
      </div>
      <Select onSelect={(value) => {
        setProvider(SUPPORTED_BANKS.find(x => x.name === value)?.name || "")
        setRedirectUrl(SUPPORTED_BANKS.find(x => x.name === value)?.redirectUrl || "")
      }} options={SUPPORTED_BANKS.map(x => ({
        key: x.name,
        value: x.name
      }))} />
      <div className="flex justify-center pt-4">
        <Button onClick={async () => {
          await createOnRampTransaction(provider, amount)
          window.location.href = redirectUrl || "";
        }}>
          Add Money
        </Button>
      </div>
    </div>
  </Card>
}
