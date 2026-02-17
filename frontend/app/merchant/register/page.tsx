"use client";

import { RegisterMerchantForm } from "@/components/RegisterMerchantForm/RegisterMerchantForm";
import styles from "./register.module.css";

export default function MerchantRegisterPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Register as Merchant</h1>
      <p className={styles.subtitle}>
        Requires 50 STX verification stake. Refundable after verification.
      </p>
      <RegisterMerchantForm />
    </div>
  );
}
