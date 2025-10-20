
import React from 'react';
import Header from "@/components/dashboard/Header";
import TokenSwap from "@/components/dashboard/TokenSwap";
import BottomNav from "@/components/dashboard/BottomNav";
import { getFundedCoins, getEmptyCoins, type Coin } from '@/lib/data';
import { cookies } from 'next/headers';

export default async function SwapPage({ searchParams }: { searchParams?: { from?: string } }) {
  const initialFromTicker = searchParams?.from || null;
  const cookieStore = cookies();
  const walletImported = cookieStore.get('wallet-imported')?.value || 'empty';
  
  let coins: Coin[];
  if (walletImported === 'funded') {
    coins = await getFundedCoins();
  } else {
    coins = await getEmptyCoins();
  }

  // Server-side logic to determine initial coins
  let initialFromCoin = coins.find(c => c.ticker === 'USDC') || coins[0];
  if (initialFromTicker) {
    const foundCoin = coins.find(c => c.ticker === initialFromTicker);
    if (foundCoin) {
      initialFromCoin = foundCoin;
    }
  }

  let initialToCoin = coins.find(c => c.ticker === 'BTC') || coins[1];
  // Ensure "to" coin is not the same as "from" coin
  if (initialFromCoin && initialToCoin && initialFromCoin.ticker === initialToCoin.ticker) {
    initialToCoin = coins.find(c => c.ticker !== initialFromCoin.ticker) || coins[1];
  }

  return (
      <div className="flex min-h-screen w-full bg-background font-body text-foreground">
          <div className="flex flex-1 flex-col relative">
            <Header />
            <main className="flex py-8 items-center justify-center pb-32">
              <div className="w-full max-w-md">
                  <TokenSwap 
                    allCoins={coins} 
                    initialFromCoin={initialFromCoin}
                    initialToCoin={initialToCoin}
                  />
              </div>
            </main>
            <BottomNav />
          </div>
      </div>
  );
}
