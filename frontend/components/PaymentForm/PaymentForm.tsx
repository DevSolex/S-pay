"use client";

import { useState } from "react";
import { useProcessPayment } from "@/hooks/useProcessPayment";
import styles from "./PaymentForm.module.css";

export function PaymentForm() {
  const [recipient, setRecipient] = useState("");
  const [amountStx, setAmountStx] = useState("");
  const { processPayment } = useProcessPayment();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = BigInt(Math.floor(parseFloat(amountStx || "0") * 1e6));
    if (recipient && amount > BigInt(0)) processPayment(amount, recipient);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        placeholder="Recipient principal"
        className={styles.input}
      />
      <input
        type="number"
        step="0.000001"
        value={amountStx}
        onChange={(e) => setAmountStx(e.target.value)}
        placeholder="Amount (STX)"
        className={styles.input}
      />
      <button type="submit" className={styles.btn}>
        Send Payment
      </button>
    </form>
  );
}
