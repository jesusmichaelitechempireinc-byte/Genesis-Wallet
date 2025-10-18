
'use client';

import { useMemo, useState, useEffect } from 'react';
import { useCurrency } from "@/hooks/use-currency";
import { useLocalStorage } from '@/hooks/use-local-storage';
import { getFundedCoins, getEmptyCoins, Coin } from '@/lib/data';

export default function TotalBalance() {
  const { selectedCurrency, formatCurrency } = useCurrency();
  const [walletImported] = useLocalStorage('wallet-imported', 'none');
  const [coins, setCoins] = useState<Coin[]>([]);

  useEffect(() => {
    if (walletImported === 'funded') {
        setCoins(getFundedCoins());
    } else if (walletImported === 'empty') {
        setCoins(getEmptyCoins());
    } else {
        // Default to empty if no state is set
        setCoins(getEmptyCoins());
    }
  }, [walletImported]);

  const totalBalance = useMemo(() => {
    return coins.reduce((acc, coin) => acc + coin.usdValue, 0);
  }, [coins]);

  const convertedBalance = totalBalance * (selectedCurrency.rate || 1);
  const formattedBalance = formatCurrency(convertedBalance);
  
  return (
    <div className="text-center my-4">
      <h1 className="text-5xl font-bold tracking-tight">{formattedBalance}</h1>
      <p className="text-muted-foreground text-lg mt-1">{selectedCurrency.code}</p>
    </div>
  );
}

    