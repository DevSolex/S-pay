"use client";

import { useState } from "react";
import { useStacks } from "@/context/StacksContext";
import { shortenAddress } from "@/lib/utils";
import styles from "./ConnectWallet.module.css";

export function ConnectWallet() {
  const { address, handleConnect, handleDisconnect } = useStacks();
  const [connecting, setConnecting] = useState(false);

  const onConnect = async () => {
    setConnecting(true);
    try {
      await handleConnect();
    } finally {
      setConnecting(false);
    }
  };

  return (
    <div className={styles.actions}>
      {address ? (
        <>
          <span className={styles.address}>{shortenAddress(address)}</span>
          <button className={styles.secondaryBtn} onClick={handleDisconnect}>
            Disconnect
          </button>
        </>
      ) : (
        <>
          <button className={styles.primaryBtn} onClick={onConnect} disabled={connecting}>
            {connecting ? "Connecting…" : "Connect Wallet"}
          </button>
          <button className={styles.secondaryBtn}>Learn More</button>
        </>
      )}
    </div>
  );
}
