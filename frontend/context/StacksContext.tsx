"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  AppConfig,
  UserSession,
  showConnect,
  openContractCall,
  openSTXTransfer,
} from "@stacks/connect";
import { StacksMainnet } from "@stacks/network";

export interface ContractCallBase {
  contractAddress: string;
  contractName: string;
  functionName: string;
  functionArgs: unknown[];
}

interface StacksContextType {
  address: string | null;
  handleConnect: () => void;
  handleDisconnect: () => void;
  callContract: (options: ContractCallBase) => void;
  transferStx: (recipient: string, amountMicroStx: bigint) => void;
}

const StacksContext = createContext<StacksContextType | undefined>(undefined);

export function StacksProvider({ children }: { children: React.ReactNode }) {
  const [address, setAddress] = useState<string | null>(null);

  const appConfig = new AppConfig(["store_write", "publish_data"]);
  const userSession = new UserSession({ appConfig });
  const network = new StacksMainnet();

  useEffect(() => {
    if (userSession.isUserSignedIn()) {
      const data = userSession.loadUserData();
      const addr =
        data?.profile?.stxAddress?.mainnet ?? data?.profile?.stxAddress?.testnet;
      setAddress(addr ?? null);
    }
  }, []);

  const handleConnect = () => {
    showConnect({
      appDetails: {
        name: "S-pay",
        icon: typeof window !== "undefined" ? window.location.origin + "/favicon.ico" : "",
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
  };

  const handleDisconnect = () => {
    userSession.signUserOut();
    setAddress(null);
  };

  const callContract = (options: ContractCallBase) => {
    openContractCall({
      ...options,
      functionArgs: options.functionArgs as (string | import("@stacks/transactions").ClarityValue)[],
      userSession,
      network,
      onFinish: () => {},
      onCancel: () => {},
    });
  };

  const transferStx = (recipient: string, amountMicroStx: bigint) => {
    openSTXTransfer({
      recipient,
      amount: amountMicroStx,
      userSession,
      network,
      onFinish: () => {},
      onCancel: () => {},
    });
  };

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
