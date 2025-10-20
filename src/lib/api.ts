
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

export const fetchCoinData = async (tickers: string[]): Promise<Coin[]> => {
  const ids = tickers.map((ticker) => coinGeckoIds[ticker]).join(",");
  const apiKey = process.env.COINGECKO_API_KEY;
  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}`;
  const proUrl = `https://pro-api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}&x_cg_pro_api_key=${apiKey}`;

  try {
    const response = await fetch(apiKey ? proUrl : url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    const coinData: Coin[] = tickers.map((ticker) => {
      const coin = data.find(
        (d: any) => d.id === coinGeckoIds[ticker]
      );
      if (coin) {
        return {
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
          description: "", 
          history: [], 
        };
      }
      return null;
    }).filter((c): c is Coin => c !== null);

    return coinData;
  } catch (error) {
    console.error("Error fetching coin data:", error);
    return [];
  }
};
