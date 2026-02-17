"use client";

import styles from "./LoadingSpinner.module.css";

export function LoadingSpinner({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  return <div className={`${styles.spinner} ${styles[size]}`} aria-label="Loading" />;
}
