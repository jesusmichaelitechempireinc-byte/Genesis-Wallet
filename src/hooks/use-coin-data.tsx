
'use client';

import { useState, useEffect, useCallback } from 'react';
import { initialCoins, type Coin } from '@/lib/data';
import { useLocalStorage } from './use-local-storage';

export const useCoinData = () => {
    const [coins, setCoins] = useState<Coin[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [walletImported] = useLocalStorage('wallet-imported', 'none');

    const fetchCoinData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const coinIds = initialCoins.map(c => c.coingeckoId).join(',');
            const response = await fetch(`/api/coin-data?ids=${coinIds}`);
            if (!response.ok) {
                throw new Error('Failed to fetch coin data');
            }
            const liveData: any[] = await response.json();

            const walletBalances: Record<string, { balance: number; usdValue: number }> = {};
            if (walletImported === 'funded') {
                walletBalances['usd-coin'] = { balance: 108490, usdValue: 108490 };
            }

            const mergedCoins = initialCoins.map(initialCoin => {
                const data = liveData.find(d => d.id === initialCoin.coingeckoId);
                const balanceData = walletBalances[initialCoin.coingeckoId] || { balance: 0, usdValue: 0 };
                
                if (data) {
                    return {
                        ...initialCoin,
                        balance: balanceData.balance,
                        usdValue: balanceData.usdValue,
                        price: data.current_price || 0,
                        change: data.price_change_percentage_24h || 0,
                        history: data.sparkline_in_7d?.price.map((price: number, index: number) => ({ time: `Day ${index}`, price })) || [],
                        marketCap: data.market_cap || 0,
                        volume24h: data.total_volume || 0,
                        circulatingSupply: data.circulating_supply || 0,
                        totalSupply: data.total_supply || 0,
                        maxSupply: data.max_supply,
                        allTimeHigh: data.ath || 0,
                        description: data.description?.en || 'No description available.',
                    };
                }
                // Return initial coin structure with zeroed live data if API fails for a coin
                return {
                    ...initialCoin,
                    ...balanceData,
                    price: 0, change: 0, history: [], marketCap: 0, volume24h: 0,
                    circulatingSupply: 0, totalSupply: 0, allTimeHigh: 0, description: 'Data not available.'
                };
            });

            setCoins(mergedCoins);
        } catch (err: any) {
            setError(err.message || 'An unknown error occurred');
            // Fallback to initial coin data structure on error
            setCoins(initialCoins.map(c => ({
                ...c, price: 0, change: 0, history: [], marketCap: 0, volume24h: 0,
                circulatingSupply: 0, totalSupply: 0, allTimeHigh: 0, description: 'Error fetching data.'
            })));
        } finally {
            setLoading(false);
        }
    }, [walletImported]);

    useEffect(() => {
        fetchCoinData();
        const interval = setInterval(fetchCoinData, 60000); // Refresh every minute
        return () => clearInterval(interval);
    }, [fetchCoinData]);

    return { coins, loading, error, refetch: fetchCoinData };
};
