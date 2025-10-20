
'use client';

import { useMemo } from 'react';
import { useCurrency } from "@/hooks/use-currency";
import { useCoinData } from '@/hooks/use-coin-data';
import { Skeleton } from '../ui/skeleton';

export default function TotalBalance() {
  const { selectedCurrency, formatCurrency } = useCurrency();
  const { coins, loading } = useCoinData();

  const totalBalance = useMemo(() => {
    return coins.reduce((acc, coin) => acc + coin.usdValue, 0);
  }, [coins]);

  const convertedBalance = totalBalance * (selectedCurrency.rate || 1);
  const formattedBalance = formatCurrency(convertedBalance);
  
  if (loading) {
    return (
      <div className="text-center my-4">
        <Skeleton className="h-14 w-64 mx-auto mb-2" />
        <Skeleton className="h-7 w-20 mx-auto" />
      </div>
    )
  }

  return (
    <div className="text-center my-4">
      <h1 className="text-5xl font-bold tracking-tight">{formattedBalance}</h1>
      <p className="text-muted-foreground text-lg mt-1">{selectedCurrency.code}</p>
    </div>
  );
}
