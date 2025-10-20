
'use client';

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { getWalletCoins, type Coin } from '@/lib/data';

export interface CoinDataContextType {
  coins: Coin[];
  loading: boolean;
}

export const CoinDataContext = createContext<CoinDataContextType | undefined>(undefined);

export const CoinDataProvider = ({ children }: { children: ReactNode }) => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAndAugmentCoins = async () => {
      setLoading(true);
      // Phase 1: Load base data with correct balances immediately
      const baseCoins = await getWalletCoins();
      setCoins(baseCoins); // Set initial state with balances
      
      const ids = baseCoins.map(coin => coin.coingeckoId).join(',');
      try {
        const response = await fetch(`/api/coin-data?ids=${ids}`);
        if (!response.ok) {
            console.error("Failed to fetch live coin data, using static data.");
            setLoading(false);
            return;
        }
        const liveData = await response.json();

        // Phase 2: Augment with live data
        setCoins(currentCoins => {
            const augmentedCoins = currentCoins.map(baseCoin => {
                const liveCoin = liveData.find((c: any) => c.id === baseCoin.coingeckoId);
                if (liveCoin) {
                    return {
                        ...baseCoin,
                        price: liveCoin.current_price,
                        change: liveCoin.price_change_percentage_24h,
                        usdValue: baseCoin.balance * liveCoin.current_price,
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
            return augmentedCoins;
        });
      } catch (error) {
        console.error("Error fetching or augmenting coin data:", error);
      } finally {
        setLoading(false); // Stop loading after API call finishes or fails
      }
    };

    fetchAndAugmentCoins();
  }, []);

  return (
    <CoinDataContext.Provider value={{ coins, loading }}>
      {children}
    </CoinDataContext.Provider>
  );
};
