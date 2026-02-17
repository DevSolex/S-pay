"use client";

import Link from "next/link";
import { RegisterUserForm } from "@/components/RegisterUserForm/RegisterUserForm";
import { useStacks } from "@/context/StacksContext";
import styles from "./register.module.css";

export default function RegisterPage() {
  const { address } = useStacks();

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Register as User</h1>
      <p className={styles.subtitle}>
        Pick a unique username to join S-pay (string-ascii 24 max)
      </p>
      {!address && (
        <p className={styles.cta}>
          <Link href="/">Connect your wallet</Link> to get started.
        </p>
      )}
      <RegisterUserForm />
    </div>
  );
}
