"use client";

import { PaymentForm } from "@/components/PaymentForm/PaymentForm";
import { SPAY_FULL_CONTRACT } from "@/lib/constants";
import styles from "./pay.module.css";

export default function PayPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Process Payment</h1>
      <p className={styles.subtitle}>
        Send STX via S-pay protocol (process-payment)
      </p>
      <p className={styles.contract}>Contract: {SPAY_FULL_CONTRACT}</p>
      <PaymentForm />
    </div>
  );
}
