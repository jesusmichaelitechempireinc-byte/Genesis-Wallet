
'use client';

import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import { transactions } from '@/lib/data';
import BottomNav from '@/components/dashboard/BottomNav';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ArrowUpRight, ArrowDownLeft, Copy, ExternalLink, CheckCircle2, AlertTriangle, Clock } from 'lucide-react';
import Image from 'next/image';
import { useCurrency } from '@/hooks/use-currency';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export default function TransactionDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const { formatCurrency } = useCurrency();

  const transaction = transactions.find((tx) => tx.id === id);

  if (!transaction) {
    return (
      <div className="flex min-h-screen w-full bg-background font-body text-foreground items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="mx-auto h-12 w-12 text-destructive" />
          <h1 className="mt-4 text-2xl font-bold">Transaction Not Found</h1>
          <p className="mt-2 text-muted-foreground">The transaction you are looking for does not exist.</p>
          <Button onClick={() => router.push('/dashboard/history')} className="mt-6">
            Back to History
          </Button>
        </div>
      </div>
    );
  }

  const { type, status, coin, amount, usdValue, timestamp, fromAddress, toAddress, hash, block, fee } = transaction;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied to clipboard!',
    });
  };
  
  const statusInfo = {
    Completed: { icon: CheckCircle2, color: 'text-green-400' },
    Pending: { icon: Clock, color: 'text-yellow-400' },
    Failed: { icon: AlertTriangle, color: 'text-red-400' },
  };

  return (
    <div className="flex min-h-screen w-full bg-background font-body text-foreground">
      <div className="flex flex-1 flex-col relative">
        <header className="sticky top-0 z-10 flex h-20 items-center justify-between px-4 md:px-6">
          <Button variant="ghost" size="icon" className="rounded-full shadow-heavy-out-sm active:shadow-heavy-in-sm" onClick={() => router.back()}>
            <ArrowLeft className="h-6 w-6 text-muted-foreground" />
          </Button>
          <h1 className="text-xl font-bold font-headline">Transaction Details</h1>
          <div className="w-10"></div>
        </header>

        <main className="flex-1 p-4 md:p-6 lg:p-8 pb-28">
          <Card className="w-full max-w-2xl mx-auto shadow-heavy-out-lg border-none">
            <CardHeader className="text-center">
              <div className="flex justify-center items-center gap-4 mb-4">
                <div className={cn("flex items-center justify-center h-16 w-16 rounded-full bg-secondary", type === 'Send' ? 'text-red-400' : 'text-green-400')}>
                    {type === 'Send' ? <ArrowUpRight className="h-8 w-8" /> : <ArrowDownLeft className="h-8 w-8" />}
                </div>
                <div className="text-left">
                    <CardTitle className="font-headline text-4xl">{type === 'Send' ? '-' : '+'} {amount.toFixed(6)} {coin.ticker}</CardTitle>
                    <CardDescription className="text-lg">{formatCurrency(usdValue)}</CardDescription>
                </div>
              </div>
              <div className="flex justify-center items-center gap-2">
                 {React.createElement(statusInfo[status].icon, { className: cn('h-5 w-5', statusInfo[status].color) })}
                 <span className={cn('font-semibold', statusInfo[status].color)}>{status}</span>
              </div>
            </CardHeader>
            <CardContent className="grid gap-4 pt-6 text-sm">
                <div className="flex justify-between items-center p-4 rounded-lg shadow-heavy-in-sm">
                    <span className="text-muted-foreground">Asset</span>
                    <div className="flex items-center gap-2 font-semibold">
                        {coin.iconUrl ? <Image src={coin.iconUrl} alt={coin.name} width={20} height={20} /> : <coin.icon className="h-5 w-5" />}
                        <span>{coin.name}</span>
                    </div>
                </div>
                <div className="flex justify-between items-center p-4 rounded-lg shadow-heavy-in-sm">
                    <span className="text-muted-foreground">Timestamp</span>
                    <span className="font-semibold font-mono">{new Date(timestamp).toLocaleString()}</span>
                </div>
                 <div className="flex justify-between items-center p-4 rounded-lg shadow-heavy-in-sm">
                    <span className="text-muted-foreground">From</span>
                    <div className="flex items-center gap-2 font-semibold font-mono">
                        <span className="truncate max-w-[150px] md:max-w-xs">{fromAddress}</span>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full shadow-heavy-out-sm active:shadow-heavy-in-sm" onClick={() => handleCopy(fromAddress)}>
                            <Copy className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
                 <div className="flex justify-between items-center p-4 rounded-lg shadow-heavy-in-sm">
                    <span className="text-muted-foreground">To</span>
                    <div className="flex items-center gap-2 font-semibold font-mono">
                         <span className="truncate max-w-[150px] md:max-w-xs">{toAddress}</span>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full shadow-heavy-out-sm active:shadow-heavy-in-sm" onClick={() => handleCopy(toAddress)}>
                            <Copy className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
                <div className="flex justify-between items-center p-4 rounded-lg shadow-heavy-in-sm">
                    <span className="text-muted-foreground">Network Fee</span>
                     <span className="font-semibold font-mono">{formatCurrency(fee)}</span>
                </div>
                <div className="border-t border-border/50 my-2"></div>
                <div className="flex justify-between items-center p-4 rounded-lg shadow-heavy-in-sm">
                    <span className="text-muted-foreground">Transaction Hash</span>
                    <div className="flex items-center gap-2 font-semibold font-mono">
                        <span className="truncate max-w-[150px] md:max-w-xs">{hash}</span>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full shadow-heavy-out-sm active:shadow-heavy-in-sm" onClick={() => handleCopy(hash)}>
                            <Copy className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
                <div className="flex justify-between items-center p-4 rounded-lg shadow-heavy-in-sm">
                    <span className="text-muted-foreground">Block</span>
                    <span className="font-semibold font-mono">{block}</span>
                </div>
                <Button variant="outline" className="w-full mt-4 rounded-full shadow-heavy-out-sm active:shadow-heavy-in-sm">
                    View on Explorer
                    <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
            </CardContent>
          </Card>
        </main>
        <BottomNav />
      </div>
    </div>
  );
}
