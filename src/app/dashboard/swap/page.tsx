
import React from 'react';
import Header from "@/components/dashboard/Header";
import TokenSwap from "@/components/dashboard/TokenSwap";
import BottomNav from "@/components/dashboard/BottomNav";
import { getFundedCoins, getEmptyCoins, type Coin } from '@/lib/data';
import { cookies } from 'next/headers';

export default async function SwapPage({ searchParams }: { searchParams?: { from?: string } }) {
  const initialFromTicker = searchParams?.from || 'USDC';
  const cookieStore = cookies();
  const walletImported = cookieStore.get('wallet-imported')?.value || 'empty';
  
  let coins: Coin[];
  if (walletImported === 'funded') {
    coins = await getFundedCoins();
  } else {
    coins = await getEmptyCoins();
  }

  // --- Start of Corrected Logic ---
  // Reliably find the initial "from" coin. Default to USDC if no ticker is provided or if the provided ticker is not found.
  let initialFromCoin = coins.find(c => c.ticker === initialFromTicker);
  if (!initialFromCoin) {
    initialFromCoin = coins.find(c => c.ticker === 'USDC') || coins[0];
  }

  // Find the initial "to" coin, ensuring it's not the same as the "from" coin.
  let initialToCoin = coins.find(c => c.ticker === 'BTC');
  if (!initialToCoin || initialToCoin.ticker === initialFromCoin.ticker) {
    // If BTC is not available or is the same as the fromCoin, find the first available different coin.
    initialToCoin = coins.find(c => c.ticker !== initialFromCoin!.ticker) || coins[1];
  }
  // --- End of Corrected Logic ---

  return (
      <div className="flex min-h-screen w-full bg-background font-body text-foreground">
          <div className="flex flex-1 flex-col relative">
            <Header />
            <main className="flex py-8 items-center justify-center pb-32">
              <div className="w-full max-w-md">
                  <TokenSwap 
                    allCoins={coins} 
                    initialFromCoin={initialFromCoin!}
                    initialToCoin={initialToCoin!}
                  />
              </div>
            </main>
            <BottomNav />
          </div>
      </div>
  );
}
