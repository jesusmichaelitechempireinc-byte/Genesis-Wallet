
import type { ComponentType } from "react";

export interface Coin {
  name: string;
  ticker: string;
  coingeckoId: string;
  network?: string;
  icon?: ComponentType<{ className?: string }>;
  iconUrl?: string;
  balance: number;
  usdValue: number;
  price: number;
  change: number;
  history: { time: string, price: number }[];
  marketCap: number;
  volume24h: number;
  circulatingSupply: number;
  totalSupply: number;
  maxSupply?: number;
  allTimeHigh: number;
  description: string;
}

export const initialCoins: Omit<Coin, 'price' | 'change' | 'history' | 'marketCap' | 'volume24h' | 'circulatingSupply' | 'totalSupply' | 'maxSupply' | 'allTimeHigh' | 'description'>[] = [
  { name: 'Bitcoin', ticker: 'BTC', coingeckoId: 'bitcoin', balance: 0, usdValue: 0, iconUrl: 'https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760675521/bitcoin-btc-logo_fchtil.png' },
  { name: 'Ethereum', ticker: 'ETH', coingeckoId: 'ethereum', balance: 0, usdValue: 0, iconUrl: 'https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760675606/ethereum-eth-logo_gkt5dg.png' },
  { name: 'USD Coin', ticker: 'USDC', coingeckoId: 'usd-coin', balance: 0, usdValue: 0, iconUrl: 'https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760678111/usd-coin-usdc-logo_isqxlb.png' },
  { name: 'Tether', ticker: 'USDT-ERC20', coingeckoId: 'tether', network: 'Ethereum (ERC20)', balance: 0, usdValue: 0, iconUrl: 'https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760688489/USDT-ERC20_zylqxi.png' },
  { name: 'Solana', ticker: 'SOL', coingeckoId: 'solana', balance: 0, usdValue: 0, iconUrl: 'https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760675609/solana-sol-logo_bcifcy.png' },
  { name: 'Tether', ticker: 'USDT-TRC20', coingeckoId: 'tether', network: 'Tron (TRC20)', balance: 0, usdValue: 0, iconUrl: 'https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760688695/USDT-TRC20_mautso.png' },
  { name: 'Dogecoin', ticker: 'DOGE', coingeckoId: 'dogecoin', balance: 0, usdValue: 0, iconUrl: 'https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760675627/dogecoin-doge-logo_vhntvk.png' },
  { name: 'Cardano', ticker: 'ADA', coingeckoId: 'cardano', balance: 0, usdValue: 0, iconUrl: 'https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760675738/cardano-ada-logo_pbavn1.png' },
  { name: 'XRP', ticker: 'XRP', coingeckoId: 'ripple', balance: 0, usdValue: 0, iconUrl: 'https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760675751/xrp-xrp-logo_smpmq7.png' },
  { name: 'Avalanche', ticker: 'AVAX', coingeckoId: 'avalanche-2', balance: 0, usdValue: 0, iconUrl: 'https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760675757/avalanche-avax-logo_yt45tu.png' },
  { name: 'Sui', ticker: 'SUI', coingeckoId: 'sui', balance: 0, usdValue: 0, iconUrl: 'https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760675771/sui-sui-logo_blqmgl.png' },
  { name: 'BNB', ticker: 'BNB', coingeckoId: 'binancecoin', balance: 0, usdValue: 0, iconUrl: 'https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760675782/bnb-bnb-logo_matwsx.png' },
  { name: 'Tron', ticker: 'TRX', coingeckoId: 'tron', balance: 0, usdValue: 0, iconUrl: 'https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760675804/tron-trx-logo_amapma.png' },
  { name: 'Toncoin', ticker: 'TON', coingeckoId: 'the-open-network', balance: 0, usdValue: 0, iconUrl: 'https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760675862/toncoin-ton-logo_yhokxq.png' },
  { name: 'Fetch.ai', ticker: 'FET', coingeckoId: 'fetch-ai', balance: 0, usdValue: 0, iconUrl: 'https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760675816/artificial-superintelligence-alliance-fet-logo_rhrvie.png' },
  { name: 'Pepe', ticker: 'PEPE', coingeckoId: 'pepe', balance: 0, usdValue: 0, iconUrl: 'https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760675900/pepe-pepe-logo_ey1qka.png' }
];

export interface Transaction {
    id: string;
    type: 'Send' | 'Receive';
    status: 'Completed' | 'Pending' | 'Failed';
    coin: Coin;
    amount: number;
    usdValue: number;
    timestamp: number;
    fromAddress: string;
    toAddress: string;
    hash: string;
    block: number;
    fee: number;
}

export const getTransactions = async (allCoins: Coin[]): Promise<Transaction[]> => {
    const findCoin = (ticker: string): Coin => {
      const coin = allCoins.find(c => c.ticker === ticker);
      if (!coin) {
        // Fallback for safety, though this should ideally not happen
        return allCoins[0];
      }
      return coin;
    }
    
    return [
      {
        id: "txn1",
        type: "Receive",
        status: "Completed",
        coin: findCoin('USDC'),
        amount: 50000.00,
        usdValue: 50000.00,
        timestamp: 1721484000000,
        fromAddress: "0x3a...b4c5",
        toAddress: "genesis-vault-main-0x...a4b8",
        hash: "0x123...abc",
        block: 15203040,
        fee: 5.21
      },
      {
        id: "txn2",
        type: "Receive",
        status: "Completed",
        coin: findCoin('USDC'),
        amount: 25000.00,
        usdValue: 25000.00,
        timestamp: 1721397600000,
        fromAddress: "0x9d...e5f6",
        toAddress: "genesis-vault-main-0x...a4b8",
        hash: "0x456...def",
        block: 15198765,
        fee: 4.88
      },
      {
        id: "txn3",
        type: "Send",
        status: "Completed",
        coin: findCoin('ETH'),
        amount: 1.5,
        usdValue: 5220,
        timestamp: 1721311200000,
        fromAddress: "genesis-vault-main-0x...a4b8",
        toAddress: "0x7g...h8i9",
        hash: "0x789...ghi",
        block: 15194321,
        fee: 2.15
      },
      {
        id: "txn4",
        type: "Receive",
        status: "Completed",
        coin: findCoin('USDC'),
        amount: 33490.00,
        usdValue: 33490.00,
        timestamp: 1721224800000,
        fromAddress: "0x2b...c3d4",
        toAddress: "genesis-vault-main-0x...a4b8",
        hash: "0xabc...jkl",
        block: 15189987,
        fee: 3.97
      },
      {
        id: "txn5",
        type: "Send",
        status: "Pending",
        coin: findCoin('BTC'),
        amount: 0.02,
        usdValue: 1356.38,
        timestamp: 1721138400000,
        fromAddress: "genesis-vault-main-0x...a4b8",
        toAddress: "bc1...q5r6",
        hash: "0xdef...mno",
        block: 800543,
        fee: 1.02
      },
       {
        id: "txn6",
        type: "Receive",
        status: "Failed",
        coin: findCoin('SOL'),
        amount: 10,
        usdValue: 1712,
        timestamp: 1721052000000,
        fromAddress: "sol1...tuv",
        toAddress: "genesis-vault-main-0x...a4b8",
        hash: "0xghi...pqr",
        block: 250123456,
        fee: 0.01
      },
    ];
}


export interface Currency {
  code: string;
  name: string;
  symbol: string;
  rate?: number;
}

export const currencies: Currency[] = [
    { code: 'USD', name: 'United States Dollar', symbol: '$', rate: 1 },
    { code: 'EUR', name: 'Euro', symbol: '€', rate: 0.93 },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥', rate: 159.81 },
    { code: 'GBP', name: 'British Pound Sterling', symbol: '£', rate: 0.79 },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', rate: 1.50 },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', rate: 1.37 },
    { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF', rate: 0.90 },
    { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', rate: 7.26 },
    { code: 'SEK', name: 'Swedish Krona', symbol: 'kr', rate: 10.55 },
    { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$', rate: 1.64 },
    { code: 'MXN', name: 'Mexican Peso', symbol: '$', rate: 18.11 },
    { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', rate: 1.35 },
    { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$', rate: 7.81 },
    { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr', rate: 10.63 },
    { code: 'KRW', name: 'South Korean Won', symbol: '₩', rate: 1388.55 },
    { code: 'TRY', name: 'Turkish Lira', symbol: '₺', rate: 32.95 },
    { code: 'RUB', name: 'Russian Ruble', symbol: '₽', rate: 88.22 },
    { code: 'INR', name: 'Indian Rupee', symbol: '₹', rate: 83.45 },
    { code: 'BRL', name: 'Brazilian Real', symbol: 'R$', rate: 5.44 },
    { code: 'ZAR', name: 'South African Rand', symbol: 'R', rate: 18.23 },
];

export const portfolioData = [
    { date: "Jan 24", balance: 50000 },
    { date: "Feb 24", balance: 52000 },
    { date: "Mar 24", balance: 60000 },
    { date: "Apr 24", balance: 58000 },
    { date: "May 24", balance: 75000 },
    { date: "Jun 24", balance: 72000 },
    { date: "Jul 24", balance: 85000 },
];
