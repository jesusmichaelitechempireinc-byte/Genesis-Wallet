import { CircleDollarSign } from 'lucide-react';
import type { ComponentType } from "react";

export interface Coin {
  name: string;
  ticker: string;
  network?: string;
  icon?: ComponentType<{ className?: string }>;
  iconUrl?: string;
  balance: number;
  usdValue: number;
  change: number;
}

export const coins: Coin[] = [
  {
    name: "Bitcoin",
    ticker: "BTC",
    iconUrl: 'https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760675521/bitcoin-btc-logo_fchtil.png',
    balance: 0,
    usdValue: 0.00,
    change: -1.43,
  },
  {
    name: "Ethereum",
    ticker: "ETH",
    iconUrl: 'https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760675606/ethereum-eth-logo_gkt5dg.png',
    balance: 0,
    usdValue: 0.00,
    change: -1.35,
  },
  {
    name: "Solana",
    ticker: "SOL",
    iconUrl: 'https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760675609/solana-sol-logo_bcifcy.png',
    balance: 0,
    usdValue: 0.00,
    change: -1.28,
  },
  {
    name: "Dogecoin",
    ticker: "DOGE",
    iconUrl: 'https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760675627/dogecoin-doge-logo_vhntvk.png',
    balance: 0,
    usdValue: 0.00,
    change: -1.67,
  },
  {
    name: "Cardano",
    ticker: "ADA",
    iconUrl: 'https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760675738/cardano-ada-logo_pbavn1.png',
    balance: 0,
    usdValue: 0.00,
    change: -3.00,
  },
  {
    name: "Ripple",
    ticker: "XRP",
    iconUrl: 'https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760675751/xrp-xrp-logo_smpmq7.png',
    balance: 0,
    usdValue: 0.00,
    change: -1.16,
  },
  {
    name: "Avalanche",
    ticker: "AVAX",
    iconUrl: 'https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760675757/avalanche-avax-logo_yt45tu.png',
    balance: 0,
    usdValue: 0.00,
    change: -4.63,
  },
  {
    name: "Sui",
    ticker: "SUI",
    iconUrl: 'https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760675771/sui-sui-logo_blqmgl.png',
    balance: 0,
    usdValue: 0.00,
    change: -2.88,
  },
  {
    name: "BNB",
    ticker: "BNB",
    iconUrl: 'https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760675782/bnb-bnb-logo_matwsx.png',
    balance: 0,
    usdValue: 0.00,
    change: -6.17,
  },
  {
    name: "Tron",
    ticker: "TRX",
    iconUrl: 'https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760675804/tron-trx-logo_amapma.png',
    balance: 0,
    usdValue: 0.00,
    change: -1.96,
  },
  {
    name: "ASI",
    ticker: "FET",
    iconUrl: 'https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760675816/artificial-superintelligence-alliance-fet-logo_rhrvie.png',
    balance: 0,
    usdValue: 0.00,
    change: -1.82,
  },
  {
    name: "Pepe",
    ticker: "PEPE",
    iconUrl: 'https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760675900/pepe-pepe-logo_ey1qka.png',
    balance: 0,
    usdValue: 0.00,
    change: -2.94,
  },
  {
    name: "USD Coin",
    ticker: "USDC",
    icon: CircleDollarSign,
    balance: 108490,
    usdValue: 108477.31,
    change: 0.01,
  },
  {
    name: "Tether USD (ERC20)",
    ticker: "USDT-ERC20",
    icon: CircleDollarSign,
    balance: 0,
    usdValue: 0.00,
    change: 0.03,
  },
];

export const portfolioData = [
    { date: 'Jan', balance: 850000 },
    { date: 'Feb', balance: 920000 },
    { date: 'Mar', balance: 900000 },
    { date: 'Apr', balance: 980000 },
    { date: 'May', balance: 1100000 },
    { date: 'Jun', balance: 1250000 },
    { date: 'Jul', balance: 1371667.21 },
]

export interface Transaction {
  id: string;
  type: "Send" | "Receive";
  status: "Completed" | "Pending" | "Failed";
  coin: Coin;
  amount: number;
  usdValue: number;
  date: string;
  address: string;
}

export const transactions: Transaction[] = [
  {
    id: "txn1",
    type: "Receive",
    status: "Completed",
    coin: coins[1],
    amount: 2.5,
    usdValue: 8500.0,
    date: "2024-07-20",
    address: "0x...a1b2",
  },
  {
    id: "txn2",
    type: "Send",
    status: "Completed",
    coin: coins[0],
    amount: 0.1,
    usdValue: 6500.0,
    date: "2024-07-19",
    address: "bc1...y3z4",
  },
  {
    id: "txn3",
    type: "Receive",
    status: "Pending",
    coin: coins[2],
    amount: 500,
    usdValue: 235.0,
    date: "2024-07-18",
    address: "addr1...k7l8",
  },
  {
    id: "txn4",
    type: "Send",
    status: "Failed",
    coin: coins[1],
    amount: 1.0,
    usdValue: 3400.0,
    date: "2024-07-17",
    address: "0x...c3d4",
  },
    {
    id: "txn5",
    type: "Receive",
    status: "Completed",
    coin: coins[0],
    amount: 0.05,
    usdValue: 3250.0,
    date: "2024-07-16",
    address: "bc1...w5x6",
  },
];

export const totalBalance = coins.reduce((acc, coin) => acc + coin.usdValue, 0);
