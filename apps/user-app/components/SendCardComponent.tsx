"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@repo/ui/button";
import { TextInput } from "@repo/ui/textInput";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { P2ptransaction } from "../app/lib/actions/p2pTransaction";

export default function SendCard() {
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isDisabled = !number || !amount || isLoading;

  const handleSend = async () => {
    if (isDisabled) return;

    try {
      setIsLoading(true);

      const success = await P2ptransaction(
        number,
        (Number(amount) * 100).toString()
      );

      if(success) {
        toast.success("Money sent successfully");

      }else{
        toast.error("Transaction failed")
      }
      setAmount("");
      setNumber("");
    } catch (err) {
      toast.error("Transfer failed");
    } finally {
        isDisabled
      setIsLoading(false);
    }
  };

  return (
    <Center>
      <Card title="Send">
        <div className="min-w-72 pt-2 space-y-3">
          <TextInput
            label="Number"
            placeholder="Number"
            onChange={setNumber}
          />

          <TextInput
            label="Amount"
            placeholder="Amount"
            onChange={setAmount}
          />

          <div className="pt-4 flex justify-center">
            <Button
              onClick={handleSend}
              disabled={isDisabled ?? false}
              isLoading={isLoading}
            >
              Send
            </Button>
          </div>
        </div>
      </Card>
    </Center>
  );
}
