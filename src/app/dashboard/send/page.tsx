
'use client';

import React, { useState, useEffect } from 'react';
import Header from "@/components/dashboard/Header";
import BottomNav from "@/components/dashboard/BottomNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { coins, type Coin } from "@/lib/data";
import Image from "next/image";
import { AlertCircle, Loader2 } from 'lucide-react';
import { useCurrency } from '@/hooks/use-currency';

export default function SendPage() {
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState('');
    const [selectedCoin, setSelectedCoin] = useState<Coin | null>(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [isConfirming, setIsConfirming] = useState(false);
    const [error, setError] = useState('');
    const [gasError, setGasError] = useState(false);

    const { formatCurrency } = useCurrency();

    const handleAssetChange = (ticker: string) => {
        const coin = coins.find((c) => c.ticker === ticker);
        setSelectedCoin(coin || null);
        setError('');
        setGasError(false);
    };

    const handleReview = () => {
        if (!selectedCoin || !amount || !recipient) {
            setError("Please fill in all fields.");
            return;
        }
        if (selectedCoin.balance <= 0) {
            setError("You have no balance for this asset.");
            return;
        }
        if (parseFloat(amount) > selectedCoin.balance) {
            setError("Amount exceeds your balance.");
            return;
        }
        setError('');
        setShowConfirmation(true);
    };

    const handleConfirm = () => {
        setIsConfirming(true);
        setGasError(false);

        // Simulate network confirmation
        setTimeout(() => {
            if (selectedCoin?.ticker === 'USDC') {
                setGasError(true);
            } else {
                // This would be a successful transaction in a real scenario
                setShowConfirmation(false);
            }
            setIsConfirming(false);
        }, 2500);
    };

    const isReviewDisabled = !selectedCoin || !amount || !recipient || selectedCoin.balance <= 0;

  return (
      <div className="flex min-h-screen w-full bg-background font-body text-foreground">
          <div className="flex flex-1 flex-col relative">
            <Header />
            <main className="flex-1 p-4 md:p-6 lg:p-8 flex items-center justify-center pb-32">
              <Card className="w-full max-w-md shadow-heavy-out-lg border-none">
                <CardHeader>
                    <CardTitle className="font-headline text-3xl">Send Assets</CardTitle>
                    <CardDescription>Enter the recipient details to send crypto.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="recipient">Recipient Address</Label>
                        <Input id="recipient" placeholder="0x..." className="shadow-heavy-in-sm" value={recipient} onChange={(e) => setRecipient(e.target.value)} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="asset">Asset</Label>
                         <Select onValueChange={handleAssetChange}>
                            <SelectTrigger className="w-full shadow-heavy-in-sm">
                                <SelectValue placeholder="Select an asset" />
                            </SelectTrigger>
                            <SelectContent className="shadow-heavy-out-sm">
                                {coins.map((c) => (
                                    <SelectItem key={c.ticker} value={c.ticker}>
                                    <div className="flex items-center gap-2">
                                        {c.iconUrl ? <Image src={c.iconUrl} alt={c.name} width={20} height={20} /> : (c.icon && <c.icon className="h-5 w-5" />)}
                                        <span>{c.name} ({c.ticker})</span>
                                    </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {selectedCoin && <p className="text-xs text-muted-foreground mt-1">Balance: {selectedCoin.balance.toLocaleString()} {selectedCoin.ticker}</p>}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="amount">Amount</Label>
                        <Input id="amount" type="number" placeholder="0.00" className="shadow-heavy-in-sm" value={amount} onChange={(e) => setAmount(e.target.value)} />
                    </div>
                    {error && <p className="text-destructive text-sm font-bold text-center">{error}</p>}
                    <Button size="lg" className="w-full rounded-full bg-primary text-primary-foreground btn-glow shadow-heavy-out-lg" onClick={handleReview} disabled={isReviewDisabled}>Review Transaction</Button>
                </CardContent>
              </Card>
            </main>
            <BottomNav />
            <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
                <DialogContent className="shadow-heavy-out-lg">
                    <DialogHeader>
                        <DialogTitle className="font-headline text-2xl">Confirm Transaction</DialogTitle>
                        <DialogDescription>
                            Please review the details before confirming.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="flex justify-between items-center p-3 rounded-lg shadow-heavy-in-sm">
                            <span className="text-muted-foreground">Sending</span>
                            <span className="font-bold text-lg font-mono">{amount} {selectedCoin?.ticker}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 rounded-lg shadow-heavy-in-sm">
                            <span className="text-muted-foreground">To</span>
                            <span className="font-mono text-sm truncate max-w-[200px]">{recipient}</span>
                        </div>
                         {gasError && (
                            <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/50 flex gap-4 items-center animate-in fade-in">
                                <AlertCircle className="h-12 w-12 text-destructive" />
                                <div>
                                    <h3 className="font-bold text-destructive">Insufficient Gas Fees</h3>
                                    <p className="text-sm text-destructive/80">A fee of **$1,596 in ETH** is required to transact due to current network congestion.</p>
                                </div>
                            </div>
                        )}
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowConfirmation(false)} className="rounded-full shadow-heavy-out-sm">Cancel</Button>
                        <Button onClick={handleConfirm} disabled={isConfirming || gasError} className="rounded-full bg-primary text-primary-foreground btn-glow shadow-heavy-out-lg min-w-[120px]">
                            {isConfirming ? <Loader2 className="animate-spin" /> : 'Confirm'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
          </div>
      </div>
  );
}
