
'use client';

import { useState, useEffect, createContext, useContext, useMemo, useCallback } from 'react';
import { currencies as currencyData, Currency, Coin, getFundedCoins, getEmptyCoins } from '@/lib/data';
import { useLocalStorage } from './use-local-storage';

interface CurrencyContextType {
  selectedCurrency: Currency;
  setSelectedCurrency: (currency: Currency) => void;
  formatCurrency: (value: number, options?: Intl.NumberFormatOptions) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedCurrency, setSelectedCurrency] = useLocalStorage<Currency>('selectedCurrency', currencyData[0]);

  const formatCurrency = useCallback((value: number, options: Intl.NumberFormatOptions = {}) => {
    if (!selectedCurrency || !selectedCurrency.code) {
      // Return a placeholder or empty string if currency is not yet loaded
      return '';
    }
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: selectedCurrency.code,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      ...options,
    }).format(value);
  }, [selectedCurrency]);


  const value = {
    selectedCurrency,
    setSelectedCurrency,
    formatCurrency,
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
