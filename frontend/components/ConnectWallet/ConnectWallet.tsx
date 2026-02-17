"use client";

import { useStacks } from "@/context/StacksContext";
import styles from "./ConnectWallet.module.css";

export function ConnectWallet() {
  const { userData, handleConnect, handleDisconnect } = useStacks();
  const address = userData?.profile?.stxAddress?.mainnet ?? userData?.profile?.stxAddress?.testnet;

  return (
    <div className={styles.actions}>
      {address ? (
        <>
          <span className={styles.address}>{address.slice(0, 6)}…{address.slice(-4)}</span>
          <button className={styles.secondaryBtn} onClick={handleDisconnect}>
            Disconnect
          </button>
        </>
      ) : (
        <>
          <button className={styles.primaryBtn} onClick={handleConnect}>
            Connect Wallet
          </button>
          <button className={styles.secondaryBtn}>Learn More</button>
        </>
      )}
    </div>
  );
}
