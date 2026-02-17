"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppConfig, UserSession, showConnect } from '@stacks/connect';
import { StacksMainnet } from '@stacks/network';

export interface StacksUserData {
  profile: {
    stxAddress: {
      mainnet: string;
      testnet: string;
    };
  };
}

interface StacksContextType {
  userSession: UserSession;
  userData: StacksUserData | null;
  handleConnect: () => void;
  handleDisconnect: () => void;
  network: any;
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

  return (
    <StacksContext.Provider value={{ userSession, userData, handleConnect, handleDisconnect, network }}>
      {children}
    </StacksContext.Provider>
  );
}

export const useStacks = () => {
  const context = useContext(StacksContext);
  if (!context) throw new Error("useStacks must be used within StacksProvider");
  return context;
};
