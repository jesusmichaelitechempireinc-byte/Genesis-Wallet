
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
  history: { time: string, price: number }[];
}

export const coins: Coin[] = [
  {
    name: "Bitcoin",
    ticker: "BTC",
    iconUrl: 'https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760675521/bitcoin-btc-logo_fchtil.png',
    balance: 0,
    usdValue: 0,
    change: -1.43,
    history: [
      { time: '00:00', price: 67100 },
      { time: '01:00', price: 67250 },
      { time: '02:00', price: 67150 },
      { time: '03:00', price: 67300 },
      { time: '04:00', price: 67400 },
      { time: '05:00', price: 67350 },
      { time: '06:00', price: 67500 },
      { time: '07:00', price: 67600 },
      { time: '08:00', price: 67550 },
      { time: '09:00', price: 67700 },
      { time: '10:00', price: 67800 },
      { time: '11:00', price: 67750 },
      { time: '12:00', price: 67900 },
      { time: '13:00', price: 68000 },
      { time: '14:00', price: 67950 },
      { time: '15:00', price: 68100 },
      { time: '16:00', price: 68200 },
      { time: '17:00', price: 68150 },
      { time: '18:00', price: 68300 },
      { time: '19:00', price: 68400 },
      { time: '20:00', price: 68350 },
      { time: '21:00', price: 68500 },
      { time: '22:00', price: 68600 },
      { time: '23:00', price: 68550 },
    ],
  },
  {
    name: "Ethereum",
    ticker: "ETH",
    iconUrl: 'https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760675606/ethereum-eth-logo_gkt5dg.png',
    balance: 0,
    usdValue: 0,
    change: -1.35,
    history: [
      { time: '00:00', price: 3400 },
      { time: '01:00', price: 3410 },
      { time: '02:00', price: 3405 },
      { time: '03:00', price: 3415 },
      { time: '04:00', price: 3420 },
      { time: '05:00', price: 3418 },
      { time: '06:00', price: 3425 },
      { time: '07:00', price: 3430 },
      { time: '08:00', price: 3428 },
      { time: '09:00', price: 3435 },
      { time: '10:00', price: 3440 },
      { time: '11:00', price: 3438 },
      { time: '12:00', price: 3445 },
      { time: '13:00', price: 3450 },
      { time: '14:00', price: 3448 },
      { time: '15:00', price: 3455 },
      { time: '16:00', price: 3460 },
      { time: '17:00', price: 3458 },
      { time: '18:00', price: 3465 },
      { time: '19:00', price: 3470 },
      { time: '20:00', price: 3468 },
      { time: '21:00', price: 3475 },
      { time: '22:00', price: 3480 },
      { time: '23:00', price: 3478 },
    ]
  },
  {
    name: "Solana",
    ticker: "SOL",
    iconUrl: 'https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760675609/solana-sol-logo_bcifcy.png',
    balance: 0,
    usdValue: 0,
    change: -1.28,
     history: [
      { time: '00:00', price: 165.00 }, { time: '01:00', price: 165.50 }, { time: '02:00', price: 164.80 },
      { time: '03:00', price: 166.00 }, { time: '04:00', price: 166.20 }, { time: '05:00', price: 165.90 },
      { time: '06:00', price: 167.00 }, { time: '07:00', price: 167.30 }, { time: '08:00', price: 166.90 },
      { time: '09:00', price: 167.80 }, { time: '10:00', price: 168.00 }, { time: '11:00', price: 167.70 },
      { time: '12:00', price: 168.50 }, { time: '13:00', price: 169.00 }, { time: '14:00', price: 168.60 },
      { time: '15:00', price: 169.20 }, { time: '16:00', price: 169.80 }, { time: '17:00', price: 169.50 },
      { time: '18:00', price: 170.00 }, { time: '19:00', price: 170.50 }, { time: '20:00', price: 170.10 },
      { time: '21:00', price: 171.00 }, { time: '22:00', price: 171.50 }, { time: '23:00', price: 171.20 },
    ]
  },
  {
    name: "Dogecoin",
    ticker: "DOGE",
    iconUrl: 'https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760675627/dogecoin-doge-logo_vhntvk.png',
    balance: 0,
    usdValue: 0,
    change: -1.67,
     history: [
      { time: '00:00', price: 0.120 }, { time: '01:00', price: 0.121 }, { time: '02:00', price: 0.119 },
      { time: '03:00', price: 0.122 }, { time: '04:00', price: 0.123 }, { time: '05:00', price: 0.122 },
      { time: '06:00', price: 0.124 }, { time: '07:00', price: 0.125 }, { time: '08:00', price: 0.124 },
      { time: '09:00', price: 0.126 }, { time: '10:00', price: 0.127 }, { time: '11:00', price: 0.126 },
      { time: '12:00', price: 0.128 }, { time: '13:00', price: 0.129 }, { time: '14:00', price: 0.128 },
      { time: '15:00', price: 0.130 }, { time: '16:00', price: 0.131 }, { time: '17:00', price: 0.130 },
      { time: '18:00', price: 0.132 }, { time: '19:00', price: 0.133 }, { time: '20:00', price: 0.132 },
      { time: '21:00', price: 0.134 }, { time: '22:00', price: 0.135 }, { time: '23:00', price: 0.134 },
    ]
  },
  {
    name: "Cardano",
    ticker: "ADA",
    iconUrl: 'https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760675738/cardano-ada-logo_pbavn1.png',
    balance: 0,
    usdValue: 0,
    change: -3.00,
     history: [
      { time: '00:00', price: 0.380 }, { time: '01:00', price: 0.382 }, { time: '02:00', price: 0.379 },
      { time: '03:00', price: 0.383 }, { time: '04:00', price: 0.385 }, { time: '05:00', price: 0.384 },
      { time: '06:00', price: 0.386 }, { time: '07:00', price: 0.388 }, { time: '08:00', price: 0.387 },
      { time: '09:00', price: 0.390 }, { time: '10:00', price: 0.392 }, { time: '11:00', price: 0.391 },
      { time: '12:00', price: 0.394 }, { time: '13:00', price: 0.396 }, { time: '14:00', price: 0.395 },
      { time: '15:00', price: 0.398 }, { time: '16:00', price: 0.400 }, { time: '17:00', price: 0.399 },
      { time: '18:00', price: 0.402 }, { time: '19:00', price: 0.404 }, { time: '20:00', price: 0.403 },
      { time: '21:00', price: 0.406 }, { time: '22:00', price: 0.408 }, { time: '23:00', price: 0.407 },
    ]
  },
  {
    name: "Ripple",
    ticker: "XRP",
    iconUrl: 'https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760675751/xrp-xrp-logo_smpmq7.png',
    balance: 0,
    usdValue: 0,
    change: -1.16,
    history: [ { time: '12:00', price: 0.4750 }, { time: '13:00', price: 0.4755 }, { time: '14:00', price: 0.4760 } ]
  },
  {
    name: "Avalanche",
    ticker: "AVAX",
    iconUrl: 'https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760675757/avalanche-avax-logo_yt45tu.png',
    balance: 0,
    usdValue: 0,
    change: -4.63,
    history: [ { time: '12:00', price: 25.50 }, { time: '13:00', price: 25.55 }, { time: '14:00', price: 25.60 } ]
  },
  {
    name: "Sui",
    ticker: "SUI",
    iconUrl: 'https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760675771/sui-sui-logo_blqmgl.png',
    balance: 0,
    usdValue: 0,
    change: -2.88,
    history: [ { time: '12:00', price: 0.880 }, { time: '13:00', price: 0.882 }, { time: '14:00', price: 0.884 } ]
  },
  {
    name: "BNB",
    ticker: "BNB",
    iconUrl: 'https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760675782/bnb-bnb-logo_matwsx.png',
    balance: 0,
    usdValue: 0,
    change: -6.17,
    history: [ { time: '12:00', price: 575.00 }, { time: '13:00', price: 575.50 }, { time: '14:00', price: 576.00 } ]
  },
  {
    name: "Tron",
    ticker: "TRX",
    iconUrl: 'https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760675804/tron-trx-logo_amapma.png',
    balance: 0,
    usdValue: 0,
    change: -1.96,
    history: [ { time: '12:00', price: 0.1140 }, { time: '13:00', price: 0.1142 }, { time: '14:00', price: 0.1144 } ]
  },
  {
    name: "ASI",
    ticker: "FET",
    iconUrl: 'https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760675816/artificial-superintelligence-alliance-fet-logo_rhrvie.png',
    balance: 0,
    usdValue: 0,
    change: -1.82,
    history: [ { time: '12:00', price: 1.62 }, { time: '13:00', price: 1.625 }, { time: '14:00', price: 1.63 } ]
  },
  {
    name: "Pepe",
    ticker: "PEPE",
    iconUrl: 'https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760675900/pepe-pepe-logo_ey1qka.png',
    balance: 0,
    usdValue: 0,
    change: -2.94,
    history: [ { time: '12:00', price: 0.00001150 }, { time: '13:00', price: 0.00001152 }, { time: '14:00', price: 0.00001154 } ]
  },
  {
    name: "USD Coin",
    ticker: "USDC",
    iconUrl: 'https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760678111/usd-coin-usdc-logo_isqxlb.png',
    balance: 108490,
    usdValue: 108490,
    change: 0.01,
    history: [ { time: '12:00', price: 1.00 }, { time: '13:00', price: 1.00 }, { time: '14:00', price: 1.00 } ]
  },
  {
    name: "Tether USD (ERC20)",
    ticker: "USDT-ERC20",
    iconUrl: 'https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760688489/USDT-ERC20_zylqxi.png',
    balance: 0,
    usdValue: 0,
    change: 0.03,
    history: [ { time: '12:00', price: 1.00 }, { time: '13:00', price: 1.00 }, { time: '14:00', price: 1.00 } ]
  },
  {
    name: "Tether USD (TRC20)",
    ticker: "USDT-TRC20",
    iconUrl: 'https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760688695/USDT-TRC20_mautso.png',
    balance: 0,
    usdValue: 0,
    change: 0.02,
    history: [ { time: '12:00', price: 1.00 }, { time: '13:00', price: 1.00 }, { time: '14:00', price: 1.00 } ]
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
