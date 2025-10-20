
"use client";

import { useMemo, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { getWalletCoins, type Coin } from "@/lib/data";
import { ChevronDown, SlidersHorizontal, ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import Link from 'next/link';
import { useCurrency } from "@/hooks/use-currency";
import { Skeleton } from "../ui/skeleton";

const PriceChange = ({ change }: { change: number }) => {
  const isPositive = change >= 0;
  return (
    <span className={`flex items-center text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
       {isPositive ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
      {Math.abs(change).toFixed(2)}%
    </span>
  );
}

const AssetRowSkeleton = () => (
    <TableRow className="border-none">
        <TableCell className="p-0">
            <div className="flex items-center gap-4 p-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div>
                    <Skeleton className="h-5 w-24 mb-1" />
                    <Skeleton className="h-4 w-32" />
                </div>
            </div>
        </TableCell>
        <TableCell className="text-right p-0">
            <div className="flex flex-col items-end p-3">
                <Skeleton className="h-5 w-28 mb-1" />
                <Skeleton className="h-4 w-20" />
            </div>
        </TableCell>
    </TableRow>
);

export default function AssetList({ searchTerm }: { searchTerm?: string }) {
  const { selectedCurrency, formatCurrency } = useCurrency();
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAndAugmentCoins = async () => {
      setLoading(true);
      const baseCoins = await getWalletCoins();
      
      const ids = baseCoins.map(coin => coin.coingeckoId).join(',');
      try {
        const response = await fetch(`/api/coin-data?ids=${ids}`);
        if (!response.ok) {
            // If API fails, use static data
            console.error("Failed to fetch live coin data, using static data.");
            setCoins(baseCoins);
            setLoading(false);
            return;
        }
        const liveData = await response.json();

        const augmentedCoins = baseCoins.map(baseCoin => {
            const liveCoin = liveData.find((c: any) => c.id === baseCoin.coingeckoId);
            if (liveCoin) {
                return {
                    ...baseCoin,
                    price: liveCoin.current_price,
                    change: liveCoin.price_change_percentage_24h,
                    usdValue: baseCoin.balance * liveCoin.current_price, // Recalculate USD value
                    history: liveCoin.sparkline_in_7d.price.map((price: number, index: number) => ({ time: `Day ${index}`, price: price })),
                    marketCap: liveCoin.market_cap,
                    volume24h: liveCoin.total_volume,
                    circulatingSupply: liveCoin.circulating_supply,
                    totalSupply: liveCoin.total_supply,
                    maxSupply: liveCoin.max_supply,
                    allTimeHigh: liveCoin.ath,
                };
            }
            return baseCoin; // Return base coin if no live data found
        });
        
        setCoins(augmentedCoins);
      } catch (error) {
        console.error("Error fetching or augmenting coin data:", error);
        setCoins(baseCoins); // Fallback to base coins on error
      } finally {
        setLoading(false);
      }
    };

    fetchAndAugmentCoins();
  }, []);

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
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => <AssetRowSkeleton key={i} />)
            ) : (
                filteredAssets.map((asset) => {
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
                            {asset.change ? <PriceChange change={asset.change} /> : <div className="h-5 w-12" />}
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
                })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
