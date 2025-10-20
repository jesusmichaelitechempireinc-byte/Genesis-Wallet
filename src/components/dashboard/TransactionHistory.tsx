
"use client";

import { useMemo, useState, useEffect } from 'react';
import { type Transaction, getTransactions } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useCurrency } from "@/hooks/use-currency";
import { useCoinDataContext } from '@/hooks/use-coin-data-provider';

const statusClasses = {
  Completed: "text-green-400",
  Pending: "text-yellow-400",
  Failed: "text-red-400",
};

export default function TransactionHistory() {
  const router = useRouter();
  const { formatCurrency } = useCurrency();
  const { coins } = useCoinDataContext();
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const loadTransactions = async () => {
      if (coins.length > 0) {
        setTransactions(await getTransactions(coins));
      }
    };
    loadTransactions();
  }, [coins]);


  const handleTransactionClick = (id: string) => {
    router.push(`/dashboard/history/${id}`);
  };
  
  const groupedTransactions = transactions.reduce((acc, tx) => {
    const date = new Date(tx.timestamp).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(tx);
    return acc;
  }, {} as Record<string, Transaction[]>);

  return (
    <Card className="shadow-none border-none bg-transparent">
      <CardHeader>
        <CardTitle className="font-headline text-3xl">Transaction History</CardTitle>
        <CardDescription>Your most recent transactions.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        {Object.keys(groupedTransactions).length > 0 ? (
            Object.entries(groupedTransactions).map(([date, txs]) => (
                <div key={date}>
                    <h3 className="text-sm font-semibold text-muted-foreground mb-4 px-2">{date}</h3>
                    <div className="grid gap-2">
                        {txs.map((tx) => (
                        <div
                            key={tx.id}
                            onClick={() => handleTransactionClick(tx.id)}
                            className="flex items-center p-4 rounded-2xl shadow-heavy-out-sm bg-background hover:shadow-heavy-in-sm transition-shadow cursor-pointer"
                        >
                            <div className={cn("flex items-center justify-center h-12 w-12 rounded-full bg-secondary mr-4", tx.type === 'Send' ? 'text-red-400' : 'text-green-400')}>
                            {tx.type === "Send" ? <ArrowUpRight className="h-6 w-6" /> : <ArrowDownLeft className="h-6 w-6" />}
                            </div>
                            <div className="flex-1 grid grid-cols-2 items-center gap-2">
                                <div className="flex items-center gap-3">
                                    {tx.coin.iconUrl ? <Image src={tx.coin.iconUrl} alt={tx.coin.name} width={24} height={24} /> : tx.coin.icon && <tx.coin.icon className="h-6 w-6" />}
                                    <div>
                                        <div className="font-bold text-base">{tx.type}</div>
                                        <div className={cn("text-xs font-semibold", statusClasses[tx.status])}>{tx.status}</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className={cn("font-mono font-bold text-base", tx.type === 'Send' ? 'text-foreground' : 'text-green-400')}>
                                        {`${tx.type === "Send" ? "-" : "+"} ${tx.amount.toFixed(4)} ${tx.coin.ticker}`}
                                    </div>
                                    <div className="text-sm text-muted-foreground font-mono">
                                        {formatCurrency(tx.usdValue)}
                                    </div>
                                </div>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
            ))
        ) : (
            <div className="text-center text-muted-foreground py-10">
                <p>No transaction history found.</p>
            </div>
        )}
      </CardContent>
    </Card>
  );
}
