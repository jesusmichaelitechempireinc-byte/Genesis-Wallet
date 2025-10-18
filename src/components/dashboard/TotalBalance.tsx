
'use client';

import { useMemo } from 'react';
import { coins } from "@/lib/data";
import { useCurrency } from "@/hooks/use-currency";
import { useLocalStorage } from '@/hooks/use-local-storage';
import { getFundedCoins, getEmptyCoins } from '@/lib/data';

export default function TotalBalance() {
  const { selectedCurrency, formatCurrency } = useCurrency();
  const [walletImported] = useLocalStorage('wallet-imported', 'none');

  const currentCoins = useMemo(() => {
    if (walletImported === 'funded') {
        return getFundedCoins();
    }
    if (walletImported === 'empty') {
        return getEmptyCoins();
    }
    return coins;
  }, [walletImported]);

  const totalBalance = useMemo(() => {
    return currentCoins.reduce((acc, coin) => acc + coin.usdValue, 0);
  }, [currentCoins]);

  const convertedBalance = totalBalance * (selectedCurrency.rate || 1);
  const formattedBalance = formatCurrency(convertedBalance);
  
  return (
    <div className="text-center my-4">
      <h1 className="text-5xl font-bold tracking-tight">{formattedBalance}</h1>
      <p className="text-muted-foreground text-lg mt-1">{selectedCurrency.code}</p>
    </div>
  );
}
