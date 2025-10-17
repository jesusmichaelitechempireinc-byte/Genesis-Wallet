
import { BitcoinIcon, EthereumIcon, CardanoIcon } from "@/components/icons";
import { CircleDot, CircleDollarSign, Box } from 'lucide-react';
import type { ComponentType } from "react";

export interface Coin {
  name: string;
  ticker: string;
  network?: string;
  icon: ComponentType<{ className?: string }>;
  balance: number;
  usdValue: number;
  change: number;
}

export const coins: Coin[] = [
  {
    name: "Bitcoin",
    ticker: "BTC",
    network: "BIP84",
    icon: BitcoinIcon,
    balance: 10.2510,
    usdValue: 582554.00,
    change: 1.91,
  },
  {
    name: "Ethereum",
    ticker: "ETH",
    icon: EthereumIcon,
    balance: 152.94,
    usdValue: 351763.11,
    change: 4.21,
  },
  {
    name: "Matic",
    ticker: "MATIC",
    icon: CircleDot,
    balance: 183622.12,
    usdValue: 303187.05,
    change: -0.21,
  },
  {
    name: "Tether",
    ticker: "USDT",
    network: "TRC20",
    icon: CircleDollarSign,
    balance: 65922.82,
    usdValue: 65922.82,
    change: -0.01,
  },
    {
    name: "USD Coin",
    ticker: "USDC",
    network: "ERC20",
    icon: CircleDollarSign,
    balance: 56230.23,
    usdValue: 56230.23,
    change: 1.66,
  },
   {
    name: "BNB",
    ticker: "BNB",
    icon: Box,
    balance: 20,
    usdValue: 11560.00,
    change: -0.22,
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
