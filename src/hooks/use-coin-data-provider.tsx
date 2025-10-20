
'use client';

import { createContext, useContext } from 'react';
import { useCoinData } from './use-coin-data';
import { type Coin } from '@/lib/data';

interface CoinDataContextType {
  coins: Coin[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

const CoinDataContext = createContext<CoinDataContextType | undefined>(undefined);

export const CoinDataProvider = ({ children }: { children: React.ReactNode }) => {
  const coinData = useCoinData();
  return (
    <CoinDataContext.Provider value={coinData}>
      {children}
    </CoinDataContext.Provider>
  );
};

export const useCoinDataContext = () => {
  const context = useContext(CoinDataContext);
  if (context === undefined) {
    throw new Error('useCoinDataContext must be used within a CoinDataProvider');
  }
  return context;
};
