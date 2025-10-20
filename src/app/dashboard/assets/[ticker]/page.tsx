
'use client';

import React, { useMemo } from 'react';
import AssetHeader from "@/components/dashboard/AssetHeader";
import BottomNav from "@/components/dashboard/BottomNav";
import { type Coin } from "@/lib/data";
import AssetChart from "@/components/dashboard/AssetChart";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown, Repeat, AlertTriangle } from "lucide-react";
import Link from 'next/link';
import { useCurrency } from '@/hooks/use-currency';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AssetAbout from '@/components/dashboard/AssetAbout';
import { useCoinDataContext } from '@/hooks/use-coin-data-provider';
import { Skeleton } from '@/components/ui/skeleton';

const AssetPageSkeleton = () => (
    <div className="flex min-h-screen w-full bg-background font-body text-foreground">
      <div className="flex flex-1 flex-col relative">
        <header className="sticky top-0 z-10 flex h-20 items-center justify-between px-4 md:px-6">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="flex items-center gap-3">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-6 w-24" />
            </div>
            <Skeleton className="h-10 w-10 rounded-full" />
        </header>
        <main className="flex-1 p-4 md:p-6 lg:p-8 pb-32">
            <div className="text-center my-4">
                <Skeleton className="h-14 w-64 mx-auto mb-2" />
                <Skeleton className="h-7 w-32 mx-auto" />
            </div>
            <div className="flex items-center justify-center gap-4 my-8">
                <Skeleton className="h-14 flex-1 rounded-full" />
                <Skeleton className="h-14 flex-1 rounded-full" />
                <Skeleton className="h-14 w-14 rounded-full" />
            </div>
            <Skeleton className="h-[400px] w-full" />
        </main>
        <BottomNav />
      </div>
    </div>
);


export default function AssetPage({ params }: { params: Promise<{ ticker: string }> }) {
  const { ticker } = React.use(params);
  const { coins, loading } = useCoinDataContext();
  
  const coin = useMemo(() => coins.find((c) => c.ticker === ticker.toUpperCase()), [coins, ticker]);
  
  const { selectedCurrency, formatCurrency } = useCurrency();

  if (loading) {
    return <AssetPageSkeleton />;
  }

  if (!coin) {
    return (
        <div className="flex min-h-screen w-full bg-background font-body text-foreground">
          
            <main className="flex-1 p-4 md:p-6 lg:p-8 flex items-center justify-center pb-32">
              <div className="text-center">
                <AlertTriangle className="mx-auto h-12 w-12 text-destructive" />
                <h1 className="mt-4 text-2xl font-bold">Token Not Found</h1>
                <p className="mt-2 text-muted-foreground">The token with ticker '{ticker}' could not be found.</p>
                <Link href="/dashboard" className="mt-6">
                    <Button>Back to Wallet</Button>
                </Link>
              </div>
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
