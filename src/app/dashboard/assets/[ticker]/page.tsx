
'use client';

import React, { useMemo, useState, useEffect } from 'react';
import AssetHeader from "@/components/dashboard/AssetHeader";
import BottomNav from "@/components/dashboard/BottomNav";
import { type Coin, getFundedCoins, getEmptyCoins } from "@/lib/data";
import AssetChart from "@/components/dashboard/AssetChart";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown, Repeat } from "lucide-react";
import Link from 'next/link';
import { useCurrency } from '@/hooks/use-currency';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AssetAbout from '@/components/dashboard/AssetAbout';

export default function AssetPage({ params }: { params: { ticker: string } }) {
  const [walletImported] = useLocalStorage('wallet-imported', 'none');
  
  const coins: Coin[] = useMemo(() => {
    if (walletImported === 'funded') {
      return getFundedCoins();
    }
    if (walletImported === 'empty') {
      return getEmptyCoins();
    }
    return getEmptyCoins();
  }, [walletImported]);

  const coin = useMemo(() => coins.find((c) => c.ticker === params.ticker.toUpperCase()), [coins, params.ticker]);
  
  const { selectedCurrency, formatCurrency } = useCurrency();

  if (!coin) {
    return (
        <div className="flex min-h-screen w-full bg-background font-body text-foreground">
          
            <main className="flex-1 p-4 md:p-6 lg:p-8 flex items-center justify-center pb-32">
              <p>Token not found.</p>
            </main>
            <BottomNav />
          
        </div>
    );
  }

  const convertedUsdValue = coin.usdValue * (selectedCurrency.rate || 1);
  const formattedBalance = formatCurrency(convertedUsdValue);
  const formattedPrice = formatCurrency(coin.price * (selectedCurrency.rate || 1));

  return (
      <div className="flex min-h-screen w-full bg-background font-body text-foreground">
          <div className="flex flex-1 flex-col relative">
            <AssetHeader coin={coin} />
            <main className="flex-1 p-4 md:p-6 lg:p-8 pb-32">
                <div className="text-center my-4">
                    <h1 className="text-5xl font-bold tracking-tight">{formattedBalance}</h1>
                    <p className="text-muted-foreground text-lg mt-1">
                        {coin.balance.toLocaleString()} {coin.ticker}
                    </p>
                </div>
                
                <div className="flex items-center justify-center gap-4 my-8">
                    <Link href={`/dashboard/send?ticker=${coin.ticker}`} className="flex-1">
                        <Button
                            size="lg"
                            className="w-full rounded-full bg-primary text-primary-foreground h-14 text-lg font-bold shadow-heavy-out-lg active:shadow-heavy-in-lg btn-glow"
                        >
                            <ArrowUp className="mr-2 h-6 w-6" />
                            Send
                        </Button>
                    </Link>
                    <Link href={`/dashboard/receive?ticker=${coin.ticker}`} className="flex-1">
                        <Button
                            size="lg"
                            variant="secondary"
                            className="w-full rounded-full h-14 text-lg font-bold bg-background text-foreground shadow-heavy-out-lg active:shadow-heavy-in-lg"
                        >
                            <ArrowDown className="mr-2 h-6 w-6" />
                            Receive
                        </Button>
                    </Link>
                     <Link href={`/dashboard/swap?from=${coin.ticker}`} className="flex-1">
                        <Button variant="secondary" size="lg" className="w-full rounded-full h-14 text-lg font-bold bg-background text-foreground shadow-heavy-out-lg active:shadow-heavy-in-lg">
                            <Repeat className="h-6 w-6" />
                        </Button>
                    </Link>
                </div>

                <Tabs defaultValue="chart" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 shadow-heavy-in-sm">
                    <TabsTrigger value="chart">Chart</TabsTrigger>
                    <TabsTrigger value="about">About</TabsTrigger>
                  </TabsList>
                  <TabsContent value="chart">
                    <AssetChart coin={coin} />
                  </TabsContent>
                  <TabsContent value="about">
                    <AssetAbout coin={coin} />
                  </TabsContent>
                </Tabs>

            </main>
            <BottomNav />
          </div>
      </div>
  );
}
