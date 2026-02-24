'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AppConfig, UserSession, showConnect } from '@stacks/connect';

interface AuthContextType {
  userSession: UserSession | null;
  isSignedIn: boolean;
  userData: any;
  connect: () => void;
  disconnect: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const appConfig = new AppConfig(['store_write', 'publish_data']);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [userSession] = useState(() => new UserSession({ appConfig }));
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    if (userSession.isUserSignedIn()) {
      setIsSignedIn(true);
      setUserData(userSession.loadUserData());
    }
  }, [userSession]);

  const connect = () => {
    showConnect({
      appDetails: {
        name: 'S-pay',
        icon: '/logo.png',
      },
      onFinish: () => {
        setIsSignedIn(true);
        setUserData(userSession.loadUserData());
      },
      userSession,
    });
  };

  const disconnect = () => {
    userSession.signUserOut();
    setIsSignedIn(false);
    setUserData(null);
  };

  return (
    <AuthContext.Provider value={{ userSession, isSignedIn, userData, connect, disconnect }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
