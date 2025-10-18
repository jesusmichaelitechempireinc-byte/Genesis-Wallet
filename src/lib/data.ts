
import type { ComponentType } from "react";

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
}

const initialCoins: Coin[] = [
  {
    name: "Bitcoin",
    ticker: "BTC",
    iconUrl: 'https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760675521/bitcoin-btc-logo_fchtil.png',
    balance: 0,
    usdValue: 0,
    price: 67819,
    change: -1.43,
    history: [
      { time: '00:00', price: 67100 }, { time: '01:00', price: 67250 }, { time: '02:00', price: 67150 },
      { time: '03:00', price: 67300 }, { time: '04:00', price: 67400 }, { time: '05:00', price: 67350 },
      { time: '06:00', price: 67500 }, { time: '07:00', price: 67600 }, { time: '08:00', price: 67550 },
      { time: '09:00', price: 67700 }, { time: '10:00', price: 67800 }, { time: '11:00', price: 67750 },
      { time: '12:00', price: 67900 }, { time: '13:00', price: 68000 }, { time: '14:00', price: 67950 },
      { time: '15:00', price: 68100 }, { time: '16:00', price: 68200 }, { time: '17:00', price: 68150 },
      { time: '18:00', price: 68300 }, { time: '19:00', price: 68400 }, { time: '20:00', price: 68350 },
      { time: '21:00', price: 68500 }, { time: '22:00', price: 68600 }, { time: '23:00', price: 67819 },
    ],
  },
  {
    name: "Ethereum",
    ticker: "ETH",
    iconUrl: 'https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760675606/ethereum-eth-logo_gkt5dg.png',
    balance: 0,
    usdValue: 0,
    price: 3480,
    change: -1.35,
    history: [
      { time: '00:00', price: 3400 }, { time: '01:00', price: 3410 }, { time: '02:00', price: 3405 },
      { time: '03:00', price: 3415 }, { time: '04:00', price: 3420 }, { time: '05:00', price: 3418 },
      { time: '06:00', price: 3425 }, { time: '07:00', price: 3430 }, { time: '08:00', price: 3428 },
      { time: '09:00', price: 3435 }, { time: '10:00', price: 3440 }, { time: '11:00', price: 3438 },
      { time: '12:00', price: 3445 }, { time: '13:00', price: 3450 }, { time: '14:00', price: 3448 },
      { time: '15:00', price: 3455 }, { time: '16:00', price: 3460 }, { time: '17:00', price: 3458 },
      { time: '18:00', price: 3465 }, { time: '19:00', price: 3470 }, { time: '20:00', price: 3468 },
      { time: '21:00', price: 3475 }, { time: '22:00', price: 3480 }, { time: '23:00', price: 3480 },
    ]
  },
  {
    name: "Solana",
    ticker: "SOL",
    iconUrl: 'https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760675609/solana-sol-logo_bcifcy.png',
    balance: 0,
    usdValue: 0,
    price: 171.2,
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
    price: 0.134,
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
    name: "USD Coin",
    ticker: "USDC",
    iconUrl: 'https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760678111/usd-coin-usdc-logo_isqxlb.png',
    balance: 0,
    usdValue: 0,
    price: 1.00,
    change: 0.01,
    history: [ { time: '12:00', price: 1.00 }, { time: '13:00', price: 1.00 }, { time: '14:00', price: 1.00 } ]
  },
  {
    name: "Cardano",
    ticker: "ADA",
    iconUrl: 'https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760675738/cardano-ada-logo_pbavn1.png',
    balance: 0,
    usdValue: 0,
    price: 0.407,
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
    price: 0.476,
    change: -1.16,
    history: [ { time: '12:00', price: 0.4750 }, { time: '13:00', price: 0.4755 }, { time: '14:00', price: 0.4760 } ]
  },
  {
    name: "Avalanche",
    ticker: "AVAX",
    iconUrl: 'https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760675757/avalanche-avax-logo_yt45tu.png',
    balance: 0,
    usdValue: 0,
    price: 25.60,
    change: -4.63,
    history: [ { time: '12:00', price: 25.50 }, { time: '13:00', price: 25.55 }, { time: '14:00', price: 25.60 } ]
  },
  {
    name: "Sui",
    ticker: "SUI",
    iconUrl: 'https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760675771/sui-sui-logo_blqmgl.png',
    balance: 0,
    usdValue: 0,
    price: 0.884,
    change: -2.88,
    history: [ { time: '12:00', price: 0.880 }, { time: '13:00', price: 0.882 }, { time: '14:00', price: 0.884 } ]
  },
  {
    name: "BNB",
    ticker: "BNB",
    iconUrl: 'https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760675782/bnb-bnb-logo_matwsx.png',
    balance: 0,
    usdValue: 0,
    price: 576.00,
    change: -6.17,
    history: [ { time: '12:00', price: 575.00 }, { time: '13:00', price: 575.50 }, { time: '14:00', price: 576.00 } ]
  },
  {
    name: "Tron",
    ticker: "TRX",
    iconUrl: 'https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760675804/tron-trx-logo_amapma.png',
    balance: 0,
    usdValue: 0,
    price: 0.1144,
    change: -1.96,
    history: [ { time: '12:00', price: 0.1140 }, { time: '13:00', price: 0.1142 }, { time: '14:00', price: 0.1144 } ]
  },
  {
    name: "ASI",
    ticker: "FET",
    iconUrl: 'https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760675816/artificial-superintelligence-alliance-fet-logo_rhrvie.png',
    balance: 0,
    usdValue: 0,
    price: 1.63,
    change: -1.82,
    history: [ { time: '12:00', price: 1.62 }, { time: '13:00', price: 1.625 }, { time: '14:00', price: 1.63 } ]
  },
  {
    name: "Pepe",
    ticker: "PEPE",
    iconUrl: 'https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760675900/pepe-pepe-logo_ey1qka.png',
    balance: 0,
    usdValue: 0,
    price: 0.00001154,
    change: -2.94,
    history: [ { time: '12:00', price: 0.00001150 }, { time: '13:00', price: 0.00001152 }, { time: '14:00', price: 0.00001154 } ]
  },
  {
    name: "Tether USD (ERC20)",
    ticker: "USDT-ERC20",
    iconUrl: 'https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760688489/USDT-ERC20_zylqxi.png',
    balance: 0,
    usdValue: 0,
    price: 1.00,
    change: 0.03,
    history: [ { time: '12:00', price: 1.00 }, { time: '13:00', price: 1.00 }, { time: '14:00', price: 1.00 } ]
  },
  {
    name: "Tether USD (TRC20)",
    ticker: "USDT-TRC20",
    iconUrl: 'https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760688695/USDT-TRC20_mautso.png',
    balance: 0,
    usdValue: 0,
    price: 1.00,
    change: 0.02,
    history: [ { time: '12:00', price: 1.00 }, { time: '13:00', price: 1.00 }, { time: '14:00', price: 1.00 } ]
  },
];

export const coins: Coin[] = initialCoins;

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

export function getFundedCoins(): Coin[] {
    const fundedCoinsMap = {
      'BTC': { balance: 0, usdValue: 0 },
      'ETH': { balance: 0, usdValue: 0 },
      'SOL': { balance: 0, usdValue: 0 },
      'USDC': { balance: 108490, usdValue: 108490 },
    };

    return initialCoins.map(coin => {
        if (fundedCoinsMap.hasOwnProperty(coin.ticker)) {
            const fundedData = fundedCoinsMap[coin.ticker as keyof typeof fundedCoinsMap];
            return { ...coin, balance: fundedData.balance, usdValue: fundedData.usdValue };
        }
        return { ...coin, balance: 0, usdValue: 0 };
    });
}

export function getEmptyCoins(): Coin[] {
    return initialCoins.map(c => ({ ...c, balance: 0, usdValue: 0 }));
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


export const transactions: Transaction[] = [
  {
    id: "txn1",
    type: "Receive",
    status: "Completed",
    coin: initialCoins.find(c => c.ticker === 'USDC')!,
    amount: 50000.00,
    usdValue: 50000.00,
    timestamp: 1721484000000, // July 20, 2024 10:00:00 AM UTC
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
    coin: initialCoins.find(c => c.ticker === 'USDC')!,
    amount: 25000.00,
    usdValue: 25000.00,
    timestamp: 1721397600000, // July 19, 2024 10:00:00 AM UTC
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
    coin: initialCoins.find(c => c.ticker === 'ETH')!,
    amount: 1.5,
    usdValue: 5220,
    timestamp: 1721311200000, // July 18, 2024 10:00:00 AM UTC
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
    coin: initialCoins.find(c => c.ticker === 'USDC')!,
    amount: 33490.00,
    usdValue: 33490.00,
    timestamp: 1721224800000, // July 17, 2024 10:00:00 AM UTC
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
    coin: initialCoins.find(c => c.ticker === 'BTC')!,
    amount: 0.02,
    usdValue: 1356.38,
    timestamp: 1721138400000, // July 16, 2024 10:00:00 AM UTC
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
    coin: initialCoins.find(c => c.ticker === 'SOL')!,
    amount: 10,
    usdValue: 1712,
    timestamp: 1721052000000, // July 15, 2024 10:00:00 AM UTC
    fromAddress: "sol1...tuv",
    toAddress: "genesis-vault-main-0x...a4b8",
    hash: "0xghi...pqr",
    block: 250123456,
    fee: 0.01
  },
];
