"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { transactions, type Transaction } from "@/lib/data";
import { ArrowUpRight, ArrowDownLeft } from "lucide-react";
import Image from "next/image";

const statusColors = {
  Completed: "bg-green-500/20 text-green-400 border-green-500/30",
  Pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  Failed: "bg-red-500/20 text-red-400 border-red-500/30",
};

export default function TransactionHistory() {
  const [history] = useState<Transaction[]>(transactions);

  return (
    <Card className="shadow-none border-none bg-transparent">
      <CardHeader>
        <CardTitle className="font-headline text-3xl">Transaction History</CardTitle>
        <CardDescription>Your most recent transactions.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg bg-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-b-0 hover:bg-transparent">
                <TableHead className="w-[80px]"></TableHead>
                <TableHead>Asset</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="hidden md:table-cell text-right">Value</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {history.map((tx) => (
                <TableRow key={tx.id} className="border-t border-border/50 hover:bg-accent/50">
                  <TableCell>
                    <div className={`flex items-center justify-center h-10 w-10 rounded-full bg-secondary ${tx.type === 'Send' ? 'text-red-400' : 'text-green-400'}`}>
                      {tx.type === "Send" ? <ArrowUpRight className="h-5 w-5" /> : <ArrowDownLeft className="h-5 w-5" />}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 flex items-center justify-center rounded-full bg-background">
                         {tx.coin.iconUrl ? <Image src={tx.coin.iconUrl} alt={tx.coin.name} width={24} height={24} /> : <tx.coin.icon className="h-6 w-6" />}
                      </div>
                      <div>
                        <div className="font-medium">{tx.coin.name}</div>
                        <div className="text-xs text-muted-foreground font-mono">{tx.address}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className={`font-mono font-medium ${tx.type === 'Send' ? 'text-red-400' : 'text-green-400'}`}>{`${tx.type === "Send" ? "-" : "+"} ${tx.amount.toFixed(4)} ${tx.coin.ticker}`}</div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-right font-mono">
                    ${tx.usdValue.toLocaleString()}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{tx.date}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant="outline" className={`font-mono text-xs ${statusColors[tx.status]}`}>
                      {tx.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
