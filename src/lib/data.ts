
import type { ComponentType } from "react";
import {
  BitcoinIcon,
  EthereumIcon,
  CardanoIcon,
  SolanaIcon,
  DogecoinIcon,
  RippleIcon,
  AvalancheIcon,
  SuiIcon,
  BnbIcon,
  TronIcon,
  AsiIcon,
  PepeIcon,
} from "@/components/icons";

export interface Coin {
  name: string;
  ticker: string;
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

export const coins: Coin[] = [
  {
    name: 'Bitcoin',
    ticker: 'BTC',
    iconUrl: 'https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760675521/bitcoin-btc-logo_fchtil.png',
    balance: 0,
    usdValue: 0,
    price: 67819.23,
    change: 1.5,
    history: [ { time: '12:00', price: 67000 }, { time: '13:00', price: 67200 }, { time: '14:00', price: 67150 }, { time: '15:00', price: 67819.23 } ],
    marketCap: 1339000000000,
    volume24h: 24000000000,
    circulatingSupply: 19700000,
    totalSupply: 21000000,
    maxSupply: 21000000,
    allTimeHigh: 73750.07,
    description: 'Bitcoin is a decentralized digital currency, without a central bank or single administrator, that can be sent from user to user on the peer-to-peer bitcoin network without the need for intermediaries.'
  },
  {
    name: 'Ethereum',
    ticker: 'ETH',
    iconUrl: 'https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760675606/ethereum-eth-logo_gkt5dg.png',
    balance: 0,
    usdValue: 0,
    price: 3480.05,
    change: -0.5,
    history: [ { time: '12:00', price: 3500 }, { time: '13:00', price: 3490 }, { time: '14:00', price: 3485 }, { time: '15:00', price: 3480.05 } ],
    marketCap: 418000000000,
    volume24h: 12000000000,
    circulatingSupply: 120000000,
    totalSupply: 120000000,
    allTimeHigh: 4891.70,
    description: 'Ethereum is a decentralized, open-source blockchain with smart contract functionality. Ether (ETH) is the native cryptocurrency of the platform.'
  },
  {
    name: 'USD Coin',
    ticker: 'USDC',
    iconUrl: 'https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760678111/usd-coin-usdc-logo_isqxlb.png',
    balance: 108490,
    usdValue: 108490,
    price: 1.00,
    change: 0.0,
    history: [ { time: '12:00', price: 1.00 }, { time: '13:00', price: 1.00 }, { time: '14:00', price: 1.00 }, { time: '15:00', price: 1.00 } ],
    marketCap: 33000000000,
    volume24h: 5000000000,
    circulatingSupply: 33000000000,
    totalSupply: 33000000000,
    allTimeHigh: 1.17,
    description: 'USD Coin (USDC) is a stablecoin that is pegged to the U.S. dollar on a 1:1 basis. Every unit of this cryptocurrency in circulation is backed up by $1 that is held in reserve.'
  },
  {
    name: 'Tether',
    ticker: 'USDT-ERC20',
    network: 'Ethereum (ERC20)',
    iconUrl: 'https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760688489/USDT-ERC20_zylqxi.png',
    balance: 0,
    usdValue: 0,
    price: 1.00,
    change: 0.0,
    history: [],
    marketCap: 112000000000,
    volume24h: 45000000000,
    circulatingSupply: 112000000000,
    totalSupply: 115000000000,
    allTimeHigh: 1.32,
    description: 'Tether (USDT) is a stablecoin pegged to the US dollar. This version is a token on the Ethereum blockchain (ERC-20).'
  },
  {
    name: 'Solana',
    ticker: 'SOL',
    iconUrl: 'https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760675609/solana-sol-logo_bcifcy.png',
    balance: 0,
    usdValue: 0,
    price: 171.23,
    change: 3.2,
    history: [],
    marketCap: 78000000000,
    volume24h: 3000000000,
    circulatingSupply: 462000000,
    totalSupply: 578000000,
    allTimeHigh: 260.06,
    description: 'Solana is a high-performance blockchain supporting builders around the world creating crypto apps that scale today.'
  },
  {
    name: 'Tether',
    ticker: 'USDT-TRC20',
    network: 'Tron (TRC20)',
    iconUrl: 'https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760688695/USDT-TRC20_mautso.png',
    balance: 0,
    usdValue: 0,
    price: 1.00,
    change: 0.0,
    history: [],
    marketCap: 112000000000, // Shared with ERC20 for simplicity
    volume24h: 45000000000,
    circulatingSupply: 112000000000,
    totalSupply: 115000000000,
    allTimeHigh: 1.32,
    description: 'Tether (USDT) is a stablecoin pegged to the US dollar. This version is a token on the Tron blockchain (TRC-20).'
  },
  {
    name: 'Dogecoin',
    ticker: 'DOGE',
    iconUrl: 'https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760675627/dogecoin-doge-logo_vhntvk.png',
    balance: 0,
    usdValue: 0,
    price: 0.15,
    change: -2.1,
    history: [],
    marketCap: 21000000000,
    volume24h: 1000000000,
    circulatingSupply: 144000000000,
    totalSupply: 144000000000,
    allTimeHigh: 0.73,
    description: 'Dogecoin is an open source peer-to-peer digital currency, favored by Shiba Inus worldwide.'
  },
  {
    name: 'Cardano',
    ticker: 'ADA',
    iconUrl: 'https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760675738/cardano-ada-logo_pbavn1.png',
    balance: 0,
    usdValue: 0,
    price: 0.45,
    change: 1.8,
    history: [],
    marketCap: 16000000000,
    volume24h: 400000000,
    circulatingSupply: 35000000000,
    totalSupply: 45000000000,
    maxSupply: 45000000000,
    allTimeHigh: 3.10,
    description: 'Cardano is a proof-of-stake blockchain platform that says its goal is to allow “changemakers, innovators and visionaries” to bring about positive global change.'
  },
  {
    name: 'XRP',
    ticker: 'XRP',
    iconUrl: 'https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760675751/xrp-xrp-logo_smpmq7.png',
    balance: 0,
    usdValue: 0,
    price: 0.52,
    change: 0.5,
    history: [],
    marketCap: 28000000000,
    volume24h: 1200000000,
    circulatingSupply: 55000000000,
    totalSupply: 100000000000,
    maxSupply: 100000000000,
    allTimeHigh: 3.84,
    description: 'XRP is the native digital asset on the XRP Ledger—an open-source, permissionless, and decentralized blockchain technology that can settle transactions in 3-5 seconds.'
  },
  {
    name: 'Avalanche',
    ticker: 'AVAX',
    iconUrl: 'https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760675757/avalanche-avax-logo_yt45tu.png',
    balance: 0,
    usdValue: 0,
    price: 36.45,
    change: 2.5,
    history: [],
    marketCap: 14000000000,
    volume24h: 500000000,
    circulatingSupply: 393000000,
    totalSupply: 443000000,
    maxSupply: 720000000,
    allTimeHigh: 146.22,
    description: 'Avalanche is the fastest smart contracts platform in the blockchain industry, as measured by time-to-finality. Avalanche is blazingly fast, low cost, and green.'
  },
  {
    name: 'Sui',
    ticker: 'SUI',
    iconUrl: 'https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760675771/sui-sui-logo_blqmgl.png',
    balance: 0,
    usdValue: 0,
    price: 1.35,
    change: -1.2,
    history: [],
    marketCap: 3000000000,
    volume24h: 200000000,
    circulatingSupply: 2300000000,
    totalSupply: 10000000000,
    maxSupply: 10000000000,
    allTimeHigh: 2.18,
    description: 'Sui is a first-of-its-kind Layer 1 blockchain and smart contract platform designed from the bottom up to make digital asset ownership fast, private, secure, and accessible to everyone.'
  },
  {
    name: 'BNB',
    ticker: 'BNB',
    iconUrl: 'https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760675782/bnb-bnb-logo_matwsx.png',
    balance: 0,
    usdValue: 0,
    price: 580.76,
    change: 1.1,
    history: [],
    marketCap: 85000000000,
    volume24h: 1500000000,
    circulatingSupply: 147000000,
    totalSupply: 147000000,
    allTimeHigh: 720.67,
    description: 'BNB, or Binance Coin, is the cryptocurrency that powers the BNB Chain ecosystem. As one of the world\'s most popular utility tokens, BNB is useful in a wide range of applications and use cases.'
  },
  {
    name: 'Tron',
    ticker: 'TRX',
    iconUrl: 'https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760675804/tron-trx-logo_amapma.png',
    balance: 0,
    usdValue: 0,
    price: 0.12,
    change: 0.8,
    history: [],
    marketCap: 10500000000,
    volume24h: 300000000,
    circulatingSupply: 87000000000,
    totalSupply: 87000000000,
    allTimeHigh: 0.30,
    description: 'TRON is a decentralized, open-source blockchain-based operating system with smart contract functionality, proof-of-stake principles as its consensus algorithm and a cryptocurrency native to the system, known as Tronix (TRX).'
  },
  {
    name: 'Toncoin',
    ticker: 'TON',
    iconUrl: 'https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760675862/toncoin-ton-logo_yhokxq.png',
    balance: 0,
    usdValue: 0,
    price: 7.50,
    change: 5.5,
    history: [],
    marketCap: 18000000000,
    volume24h: 400000000,
    circulatingSupply: 2400000000,
    totalSupply: 5100000000,
    allTimeHigh: 8.25,
    description: 'Toncoin (TON) is the native cryptocurrency of the TON (The Open Network) blockchain, a decentralized layer-1 blockchain developed by the messaging platform Telegram.'
  },
  {
    name: 'Fetch.ai',
    ticker: 'FET',
    iconUrl: 'https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760675816/artificial-superintelligence-alliance-fet-logo_rhrvie.png',
    balance: 0,
    usdValue: 0,
    price: 2.20,
    change: 10.2,
    history: [],
    marketCap: 2000000000,
    volume24h: 300000000,
    circulatingSupply: 848000000,
    totalSupply: 2600000000,
    maxSupply: 2600000000,
    allTimeHigh: 3.47,
    description: 'Fetch.ai is a decentralized machine learning platform based on a distributed ledger, that enables secure sharing, connection and transactions of any data globally.'
  },
  {
    name: 'Pepe',
    ticker: 'PEPE',
    iconUrl: 'https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760675900/pepe-pepe-logo_ey1qka.png',
    balance: 0,
    usdValue: 0,
    price: 0.000012,
    change: -5.0,
    history: [],
    marketCap: 5000000000,
    volume24h: 1000000000,
    circulatingSupply: 420000000000000,
    totalSupply: 420000000000000,
    maxSupply: 420000000000000,
    allTimeHigh: 0.000017,
    description: 'Pepe is a deflationary memecoin launched on Ethereum. The cryptocurrency was created as a tribute to the Pepe the Frog internet meme.'
  }
];

export async function getCoins(): Promise<Coin[]> {
    return coins;
}

export async function getFundedCoins(): Promise<Coin[]> {
    return coins.map(coin => {
        if (coin.ticker === 'USDC') {
            return { ...coin, balance: 108490, usdValue: 108490 };
        }
        return { ...coin, balance: 0, usdValue: 0 };
    });
}

export async function getEmptyCoins(): Promise<Coin[]> {
    return coins.map(c => ({ ...c, balance: 0, usdValue: 0 }));
}

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

export const getTransactions = async (): Promise<Transaction[]> => {
    const findCoin = (ticker: string) => coins.find(c => c.ticker === ticker)!;

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
