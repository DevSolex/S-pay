"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  AppConfig,
  UserSession,
  showConnect,
  openContractCall,
  openSTXTransfer,
} from "@stacks/connect";
import { StacksMainnet } from "@stacks/network";
import {
  isLeatherAvailable,
  leatherGetAddresses,
  leatherCallContract,
  leatherTransferStx,
} from "@/lib/leather";

export interface ContractCallBase {
  contractAddress: string;
  contractName: string;
  functionName: string;
  functionArgs: unknown[];
}

interface StacksContextType {
  address: string | null;
  handleConnect: () => void | Promise<void>;
  handleDisconnect: () => void;
  callContract: (options: ContractCallBase) => void | Promise<void>;
  transferStx: (recipient: string, amountMicroStx: bigint) => void | Promise<void>;
}

const StacksContext = createContext<StacksContextType | undefined>(undefined);

const LEATHER_KEY = "s-pay-wallet-leather";

export function StacksProvider({ children }: { children: React.ReactNode }) {
  const [address, setAddress] = useState<string | null>(null);
  const [useLeather, setUseLeather] = useState(false);

  const appConfig = new AppConfig(["store_write", "publish_data"]);
  const userSession = new UserSession({ appConfig });
  const network = new StacksMainnet();

  useEffect(() => {
    const stored = typeof window !== "undefined" && sessionStorage.getItem(LEATHER_KEY);
    if (stored === "true" && isLeatherAvailable()) {
      leatherGetAddresses().then((addr) => {
        if (addr) setAddress(addr);
        else sessionStorage.removeItem(LEATHER_KEY);
      });
      setUseLeather(true);
    } else if (userSession.isUserSignedIn()) {
      const data = userSession.loadUserData();
      const addr =
        data?.profile?.stxAddress?.mainnet ?? data?.profile?.stxAddress?.testnet;
      setAddress(addr ?? null);
    }
  }, []);

  const handleConnect = useCallback(async () => {
    if (isLeatherAvailable()) {
      try {
        const addr = await leatherGetAddresses();
        if (addr) {
          setAddress(addr);
          setUseLeather(true);
          sessionStorage.setItem(LEATHER_KEY, "true");
        }
      } catch (err) {
        console.error("Leather connect failed:", err);
      }
    } else {
      showConnect({
        appDetails: {
          name: "S-pay",
          icon: typeof window !== "undefined" ? `${window.location.origin}/favicon.ico` : "",
        },
        redirectTo: "/",
        onFinish: () => {
          const data = userSession.loadUserData();
          const addr =
            data?.profile?.stxAddress?.mainnet ?? data?.profile?.stxAddress?.testnet;
          setAddress(addr ?? null);
        },
        onCancel: () => {},
        userSession,
      });
    }
  }, []);

  const handleDisconnect = useCallback(() => {
    sessionStorage.removeItem(LEATHER_KEY);
    setUseLeather(false);
    userSession.signUserOut();
    setAddress(null);
  }, []);

  const callContract = useCallback(
    async (options: ContractCallBase) => {
      const contract = `${options.contractAddress}.${options.contractName}`;
      const args = options.functionArgs as import("@stacks/transactions").ClarityValue[];

      if (useLeather && isLeatherAvailable()) {
        await leatherCallContract(contract, options.functionName, args);
      } else {
        openContractCall({
          ...options,
          functionArgs: args,
          userSession,
          network,
          onFinish: () => {},
          onCancel: () => {},
        });
      }
    },
    [useLeather, userSession, network]
  );

  const transferStx = useCallback(
    (recipient: string, amountMicroStx: bigint) => {
      const amount = amountMicroStx.toString();
      if (useLeather && isLeatherAvailable()) {
        leatherTransferStx(recipient, amount);
      } else {
        openSTXTransfer({
          recipient,
          amount: amountMicroStx,
          userSession,
          network,
          onFinish: () => {},
          onCancel: () => {},
        });
      }
    },
    [useLeather, userSession, network]
  );

  return (
    <StacksContext.Provider
      value={{
        address,
        handleConnect,
        handleDisconnect,
        callContract,
        transferStx,
      }}
    >
      {children}
    </StacksContext.Provider>
  );
}

export const useStacks = () => {
  const context = useContext(StacksContext);
  if (!context) throw new Error("useStacks must be used within StacksProvider");
  return context;
};
