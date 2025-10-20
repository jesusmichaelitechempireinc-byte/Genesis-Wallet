
'use client';

import { useMemo } from 'react';
import { useCurrency } from "@/hooks/use-currency";
import { useCoinDataContext } from '@/hooks/use-coin-data-provider';

export default function TotalBalance() {
  const { selectedCurrency, formatCurrency } = useCurrency();
  const { coins } = useCoinDataContext();

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
