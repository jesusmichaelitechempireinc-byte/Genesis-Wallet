
'use client';
import React, { useEffect, useState } from 'react';
import Header from "@/components/dashboard/Header";
import TokenSwap from "@/components/dashboard/TokenSwap";
import BottomNav from "@/components/dashboard/BottomNav";
import { useSearchParams } from 'next/navigation';
import { type Coin } from '@/lib/data';
import { Loader2 } from 'lucide-react';
import { useCoinData } from '@/hooks/use-coin-data';

export default function SwapPageClient() {
  const searchParams = useSearchParams();
  const { coins, loading } = useCoinData();
  const initialFromTicker = searchParams.get('from');

  const [initialFromCoin, setInitialFromCoin] = useState<Coin | null>(null);
  const [initialToCoin, setInitialToCoin] = useState<Coin | null>(null);

  useEffect(() => {
    if (!loading && coins.length > 0) {
      const fromTicker = initialFromTicker || 'USDC';
      
      let fromCoin = coins.find(c => c.ticker === fromTicker) || coins.find(c => c.ticker === 'USDC') || coins[0];
      let toCoin = coins.find(c => c.ticker === 'BTC' && c.ticker !== fromCoin?.ticker) || coins.find(c => c.ticker !== fromCoin?.ticker) || coins[1];
      
      setInitialFromCoin(fromCoin);
      setInitialToCoin(toCoin);
    }
  }, [loading, coins, initialFromTicker]);

  return (
      <div className="flex min-h-screen w-full bg-background font-body text-foreground">
          <div className="flex flex-1 flex-col relative">
            <Header />
            <main className="flex py-8 items-center justify-center pb-32">
              <div className="w-full max-w-md">
                  {loading || !initialFromCoin || !initialToCoin ? (
                    <div className="flex flex-col items-center justify-center h-[500px]">
                      <Loader2 className="h-10 w-10 animate-spin text-primary" />
                      <p className="mt-4 text-muted-foreground">Loading swap details...</p>
                    </div>
                  ) : (
                    <TokenSwap 
                      initialFromCoin={initialFromCoin}
                      initialToCoin={initialToCoin}
                    />
                  )}
              </div>
            </main>
            <BottomNav />
          </div>
      </div>
  );
}
