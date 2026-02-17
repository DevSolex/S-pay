"use client";

import { RegisterUserForm } from "@/components/RegisterUserForm/RegisterUserForm";
import styles from "./register.module.css";

export default function RegisterPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Register as User</h1>
      <p className={styles.subtitle}>
        Pick a unique username to join S-pay (string-ascii 24 max)
      </p>
      <RegisterUserForm />
    </div>
  );
}
