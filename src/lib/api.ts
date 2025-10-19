
import { Coin } from "./data";

const coinGeckoIds: { [key: string]: string } = {
  BTC: "bitcoin",
  ETH: "ethereum",
  SOL: "solana",
  DOGE: "dogecoin",
  USDC: "usd-coin",
  ADA: "cardano",
  XRP: "ripple",
  AVAX: "avalanche-2",
  SUI: "sui",
  BNB: "binancecoin",
  TRX: "tron",
  TON: "the-open-network",
  FET: "fetch-ai",
  PEPE: "pepe",
  "USDT-ERC20": "tether",
  "USDT-TRC20": "tether",
};

// Helper function to introduce a delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchCoinData = async (tickers: string[]): Promise<Coin[]> => {
  const ids = tickers.map((ticker) => coinGeckoIds[ticker]).join(",");
  const marketDataUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}`;

  try {
    const marketResponse = await fetch(marketDataUrl);
    if (!marketResponse.ok) {
      throw new Error(`HTTP error! status: ${marketResponse.status}`);
    }
    const marketData = await marketResponse.json();

    const enrichedCoinData: Coin[] = [];

    for (const coin of marketData) {
      const ticker = Object.keys(coinGeckoIds).find(key => coinGeckoIds[key] === coin.id)!;
      const historyUrl = `https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart?vs_currency=usd&days=7&interval=daily`;
      
      let history = [];
      try {
        const historyResponse = await fetch(historyUrl);
        if (historyResponse.ok) {
          const historyData = await historyResponse.json();
          if(historyData.prices) {
            history = historyData.prices.map((pricePoint: [number, number]) => ({
                time: new Date(pricePoint[0]).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                price: pricePoint[1]
            }));
          }
        }
        // Add a delay to avoid hitting API rate limits
        await delay(500); 
      } catch (e) {
        console.error(`Failed to fetch history for ${ticker}`, e);
      }


      enrichedCoinData.push({
        name: coin.name,
        ticker: ticker,
        iconUrl: coin.image,
        balance: 0,
        usdValue: 0,
        price: coin.current_price,
        change: coin.price_change_percentage_24h,
        marketCap: coin.market_cap,
        volume24h: coin.total_volume,
        circulatingSupply: coin.circulating_supply,
        totalSupply: coin.total_supply,
        maxSupply: coin.max_supply,
        allTimeHigh: coin.ath,
        description: "", // This can be populated from another endpoint if needed
        history: history,
      });
    }
    
    // Reorder to match original tickers array if necessary
    return tickers.map(ticker => enrichedCoinData.find(c => c.ticker === ticker)).filter((c): c is Coin => c !== undefined);

  } catch (error) {
    console.error("Error fetching coin data:", error);
    return [];
  }
};
