
'use client';

import { totalBalance } from "@/lib/data";
import { useCurrency } from "@/hooks/use-currency";

export default function TotalBalance() {
  const { selectedCurrency, formatCurrency } = useCurrency();
  const convertedBalance = totalBalance * (selectedCurrency.rate || 1);
  const formattedBalance = formatCurrency(convertedBalance);
  
  return (
    <div className="text-center my-4">
      <h1 className="text-5xl font-bold tracking-tight">{formattedBalance}</h1>
      <p className="text-muted-foreground text-lg mt-1">{selectedCurrency.code}</p>
    </div>
  );
}
