"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  AppConfig,
  UserSession,
  showConnect,
  openContractCall,
} from "@stacks/connect";
import { StacksMainnet } from "@stacks/network";

export interface StacksUserData {
  profile: {
    stxAddress: {
      mainnet: string;
      testnet: string;
    };
  };
}

export interface ContractCallBase {
  contractAddress: string;
  contractName: string;
  functionName: string;
  functionArgs: unknown[];
}

interface StacksContextType {
  userSession: UserSession;
  userData: StacksUserData | null;
  handleConnect: () => void;
  handleDisconnect: () => void;
  network: unknown;
  callContract: (options: ContractCallBase) => void;
}

const StacksContext = createContext<StacksContextType | undefined>(undefined);

export function StacksProvider({ children }: { children: React.ReactNode }) {
  const [userData, setUserData] = useState<any>(null);
  
  const appConfig = new AppConfig(['store_write', 'publish_data']);
  const userSession = new UserSession({ appConfig });
  const network = new StacksMainnet();

  useEffect(() => {
    if (userSession.isUserSignedIn()) {
      setUserData(userSession.loadUserData());
    }
  }, []);

  const handleConnect = () => {
    showConnect({
      appDetails: {
        name: 'S-pay',
        icon: window.location.origin + '/favicon.ico',
      },
      redirectTo: '/',
      onFinish: () => {
        setUserData(userSession.loadUserData());
      },
      userSession,
    });
  };

  const handleDisconnect = () => {
    userSession.signUserOut();
    setUserData(null);
  };

  const callContract = (options: ContractCallBase) => {
    openContractCall({
      ...options,
      userSession,
      network,
      onFinish: () => {},
      onCancel: () => {},
    });
  };

  return (
    <StacksContext.Provider
      value={{
        userSession,
        userData,
        handleConnect,
        handleDisconnect,
        network,
        callContract,
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
