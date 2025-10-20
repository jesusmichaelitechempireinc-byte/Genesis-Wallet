
'use client';

import { useContext } from 'react';
import { CoinDataContext, type CoinDataContextType } from './use-coin-data-provider';

export const useCoinData = (): CoinDataContextType => {
  const context = useContext(CoinDataContext);
  if (context === undefined) {
    throw new Error('useCoinData must be used within a CoinDataProvider');
  }
  return context;
};
