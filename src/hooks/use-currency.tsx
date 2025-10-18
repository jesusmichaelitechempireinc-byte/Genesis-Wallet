
'use client';

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { useLocalStorage } from './use-local-storage';
import { currencies, Currency } from '@/lib/data';

const defaultCurrency = currencies.find(c => c.code === 'USD') || currencies[0];

interface CurrencyContextType {
    selectedCurrency: Currency;
    setSelectedCurrency: (currency: Currency) => void;
    formatCurrency: (value: number, options?: Intl.NumberFormatOptions) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [storedCurrencyCode, setStoredCurrencyCode] = useLocalStorage('selectedCurrency', defaultCurrency.code);
  
  const currentCurrency = currencies.find(c => c.code === storedCurrencyCode) || defaultCurrency;
  
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(currentCurrency);

  const handleSetSelectedCurrency = (currency: Currency) => {
      setSelectedCurrency(currency);
      setStoredCurrencyCode(currency.code);
  }

  const formatCurrency = useCallback((value: number, options?: Intl.NumberFormatOptions) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: selectedCurrency.code,
        ...options,
    }).format(value);
  }, [selectedCurrency]);

  return (
    <CurrencyContext.Provider value={{ selectedCurrency, setSelectedCurrency: handleSetSelectedCurrency, formatCurrency }}>
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
