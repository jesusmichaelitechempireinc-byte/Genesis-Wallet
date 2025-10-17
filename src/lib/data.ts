import { BitcoinIcon, EthereumIcon, CardanoIcon } from "@/components/icons";
import type { ComponentType } from "react";

export interface Coin {
  name: string;
  ticker: string;
  icon: ComponentType<{ className?: string }>;
  balance: number;
  usdValue: number;
}

export const coins: Coin[] = [
  {
    name: "Bitcoin",
    ticker: "BTC",
    icon: BitcoinIcon,
    balance: 1.25,
    usdValue: 81250.75,
  },
  {
    name: "Ethereum",
    ticker: "ETH",
    icon: EthereumIcon,
    balance: 20.8,
    usdValue: 70720.0,
  },
  {
    name: "Cardano",
    ticker: "ADA",
    icon: CardanoIcon,
    balance: 15300,
    usdValue: 7200.5,
  },
];

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

export const portfolioData = [
  { date: "Jan", balance: 80000 },
  { date: "Feb", balance: 92000 },
  { date: "Mar", balance: 85000 },
  { date: "Apr", balance: 110000 },
  { date: "May", balance: 130000 },
  { date: "Jun", balance: 145000 },
  { date: "Jul", balance: 159171 },
];

export const totalBalance = coins.reduce((acc, coin) => acc + coin.usdValue, 0);
