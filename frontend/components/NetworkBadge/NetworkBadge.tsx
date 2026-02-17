"use client";

import styles from "./NetworkBadge.module.css";

export function NetworkBadge() {
  return (
    <span className={styles.badge} title="Stacks Mainnet">
      Mainnet
    </span>
  );
}
