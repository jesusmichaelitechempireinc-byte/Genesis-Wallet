
"use client";

import { useMemo, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { coins as initialCoins, type Coin, getFundedCoins, getEmptyCoins } from "@/lib/data";
import { ChevronDown, SlidersHorizontal, ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import Link from 'next/link';
import { useCurrency } from "@/hooks/use-currency";
import { useLocalStorage } from "@/hooks/use-local-storage";

const PriceChange = ({ change }: { change: number }) => {
  const isPositive = change >= 0;
  return (
    <span className={`flex items-center text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
       {isPositive ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
      {Math.abs(change).toFixed(2)}%
    </span>
  );
}

export default function AssetList({ searchTerm }: { searchTerm?: string }) {
  const { selectedCurrency, formatCurrency } = useCurrency();
  const [walletImported] = useLocalStorage('wallet-imported', 'none');
  const [coins, setCoins] = useState<Coin[]>(initialCoins);

  useEffect(() => {
    if (walletImported === 'funded') {
      setCoins(getFundedCoins());
    } else if (walletImported === 'empty') {
      setCoins(getEmptyCoins());
    } else {
      setCoins(initialCoins);
    }
  }, [walletImported]);

  const filteredAssets = useMemo(() => {
    if (!searchTerm) return coins;
    const lowercasedFilter = searchTerm.toLowerCase();
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(lowercasedFilter) ||
        coin.ticker.toLowerCase().includes(lowercasedFilter)
    );
  }, [searchTerm, coins]);

  return (
    <div className="w-full">
        <div className="flex justify-between items-center mb-4 px-2">
            <Button variant="ghost" className="flex items-center gap-1 text-muted-foreground">
                Balance
                <ChevronDown className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground">
                <SlidersHorizontal className="h-5 w-5" />
            </Button>
        </div>
      <div className="rounded-lg bg-transparent overflow-hidden">
        <Table>
          <TableBody>
            {filteredAssets.map((asset) => {
              const convertedValue = asset.usdValue * (selectedCurrency.rate || 1);
              const convertedPrice = asset.price * (selectedCurrency.rate || 1);

              return (
                <TableRow key={asset.ticker} className="border-none hover:bg-accent/50 cursor-pointer">
                  <TableCell className="p-0">
                    <Link href={`/dashboard/assets/${asset.ticker}`} className="flex items-center gap-4 p-3">
                      <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
                          {asset.iconUrl ? <Image src={asset.iconUrl} alt={asset.name} width={24} height={24} /> : asset.icon ? <asset.icon className="h-6 w-6 text-foreground" /> : null}
                      </div>
                      <div>
                        <div className="font-bold text-base">{asset.name}</div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">{formatCurrency(convertedPrice)}</span>
                          <PriceChange change={asset.change} />
                        </div>
                      </div>
                    </Link>
                  </TableCell>
                  <TableCell className="text-right p-0">
                    <Link href={`/dashboard/assets/${asset.ticker}`} className="flex flex-col items-end p-3">
                        <div className="font-bold text-base font-mono">{asset.balance.toLocaleString(undefined, {minimumFractionDigits: asset.balance > 0 ? 4: 0, maximumFractionDigits: 4})} {asset.ticker}</div>
                        <div className="text-sm text-muted-foreground font-mono">{formatCurrency(convertedValue)}</div>
                    </Link>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
