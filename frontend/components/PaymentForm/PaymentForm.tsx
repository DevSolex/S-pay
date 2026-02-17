"use client";

import { useState } from "react";
import { useProcessPayment } from "@/hooks/useProcessPayment";
import { isValidPrincipal } from "@/lib/utils";
import styles from "./PaymentForm.module.css";

const MIN_STX = 1;

export function PaymentForm() {
  const [recipient, setRecipient] = useState("");
  const [amountStx, setAmountStx] = useState("");
  const [error, setError] = useState("");
  const { processPayment } = useProcessPayment();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!isValidPrincipal(recipient.trim())) {
      setError("Invalid Stacks address");
      return;
    }
    const amount = BigInt(Math.floor(parseFloat(amountStx || "0") * 1e6));
    if (amount < BigInt(MIN_STX * 1e6)) {
      setError(`Minimum ${MIN_STX} STX`);
      return;
    }
    processPayment(amount, recipient.trim());
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {error && <p className={styles.error}>{error}</p>}
      <input
        type="text"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        placeholder="SP..."
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
