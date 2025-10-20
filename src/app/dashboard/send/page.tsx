
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from "@/components/dashboard/Header";
import BottomNav from "@/components/dashboard/BottomNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { type Coin } from "@/lib/data";
import Image from "next/image";
import { AlertCircle, Info, Loader2 } from 'lucide-react';
import { useCurrency } from '@/hooks/use-currency';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useCoinData } from '@/hooks/use-coin-data';

const CRYPTO_ADDRESS_REGEX = /^(0x[a-fA-F0-9]{40})|(bc1[a-zA-Z0-9]{25,39})|([13][a-km-zA-HJ-NP-Z1-9]{25,34})|([LM3][a-km-zA-HJ-NP-Z1-9]{25,34})|(D[a-km-zA-HJ-NP-Z1-9]{33})|([4][a-km-zA-HJ-NP-Z1-9]{94})|(addr1[a-zA-Z0-9]+)|(r[a-zA-Z0-9]{24,34})|(T[a-zA-Z0-9]{33})|([a-zA-Z0-9]{47,48})|(U[a-zA-Z0-9]{63})|(0x[a-fA-F0-9]{64})$/;


export default function SendPage() {
    const searchParams = useSearchParams();
    const { coins } = useCoinData();
    
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState('');
    const [selectedCoin, setSelectedCoin] = useState<Coin | null>(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [isConfirming, setIsConfirming] = useState(false);
    const [error, setError] = useState('');
    const [gasError, setGasError] = useState(false);

    const { formatCurrency } = useCurrency();

    const isAddressValid = useMemo(() => recipient.length === 0 || CRYPTO_ADDRESS_REGEX.test(recipient), [recipient]);

    const networkFee = useMemo(() => {
        if (selectedCoin?.ticker === 'USDC') {
            return 15.96;
        }
        return 1.57;
    }, [selectedCoin]);
    
    const amountAsNumber = parseFloat(amount) || 0;
    const totalAmountUsd = (amountAsNumber * (selectedCoin?.price || 0)) + networkFee;
    
    const isReviewDisabled = !recipient || !amount || !selectedCoin || !isAddressValid || amountAsNumber <= 0 || amountAsNumber > (selectedCoin?.balance ?? 0);

    useEffect(() => {
        if (coins.length > 0) {
          const ticker = searchParams.get('ticker');
          if (ticker) {
              const coin = coins.find((c) => c.ticker === ticker);
              setSelectedCoin(coin || null);
          } else if (!selectedCoin) {
              setSelectedCoin(coins[0]);
          }
        }
    }, [searchParams, selectedCoin, coins]);

    const handleAssetChange = (ticker: string) => {
        const coin = coins.find((c) => c.ticker === ticker);
        setSelectedCoin(coin || null);
        setError('');
        setGasError(false);
    };

    const handleReview = () => {
        setError('');
        
        if (!selectedCoin || !amount || !recipient) {
            setError('Please fill in all fields.');
            return;
        }
        if (!isAddressValid) {
            setError('Invalid recipient address format.');
            return;
        }
        if (parseFloat(amount) <= 0) {
            setError('Amount must be greater than zero.');
            return;
        }
        if (parseFloat(amount) > selectedCoin.balance) {
            setError('Amount exceeds your balance.');
            return;
        }
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
                        {!isAddressValid && recipient.length > 0 && <p className="text-destructive text-xs font-bold text-center">Invalid address format.</p>}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="asset">Asset</Label>
                         <Select onValueChange={handleAssetChange} value={selectedCoin?.ticker}>
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
                         {selectedCoin && amountAsNumber > selectedCoin.balance && <p className="text-destructive text-xs font-bold text-center">Amount exceeds your balance.</p>}
                    </div>
                    
                    {error && <p className="text-destructive text-sm font-bold text-center">{error}</p>}
                    
                    <Button size="lg" className="w-full rounded-full bg-primary text-primary-foreground btn-glow shadow-heavy-out-lg" onClick={handleReview} disabled={isReviewDisabled}>Review Transaction</Button>
                </CardContent>
              </Card>
            </main>
            <BottomNav />
            <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
                <DialogContent className="shadow-heavy-out-lg">
                    <DialogHeader className="text-center">
                        <DialogTitle className="font-headline text-3xl">Sending {selectedCoin?.ticker}</DialogTitle>
                         <div className="flex items-center justify-center gap-2">
                            <h2 className="text-4xl font-bold font-mono">{amount}</h2>
                            <span className="text-xl text-muted-foreground font-mono">{selectedCoin?.ticker}</span>
                         </div>
                         <p className="text-muted-foreground">{formatCurrency(amountAsNumber * (selectedCoin?.price || 0))}</p>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="p-4 rounded-lg shadow-heavy-in-sm space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">Asset</span>
                                <div className="font-bold font-mono flex items-center gap-2">
                                    {selectedCoin?.iconUrl ? <Image src={selectedCoin.iconUrl} alt={selectedCoin.name} width={20} height={20} /> : selectedCoin?.icon && <selectedCoin.icon className="h-5 w-5" />}
                                    {selectedCoin?.name}
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">To</span>
                                <span className="font-mono text-sm truncate max-w-[200px]">{recipient}</span>
                            </div>
                        </div>

                         <div className="p-4 rounded-lg shadow-heavy-in-sm space-y-3">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-1.5 text-muted-foreground">
                                    <span>Network Fee</span>
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <Info className="h-4 w-4" />
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Fee paid to the network validators.</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                                <div className="font-bold font-mono text-right">
                                    <p>{formatCurrency(networkFee)}</p>
                                    {selectedCoin?.ticker === 'USDC' && <p className="text-xs text-muted-foreground">Ethereum Network</p>}
                                </div>
                            </div>
                            <div className="flex justify-between items-center text-lg">
                                <span className="font-bold">Max Total</span>
                                <div className="font-bold font-mono text-right">
                                    <p>{formatCurrency(totalAmountUsd)}</p>
                                </div>
                            </div>
                        </div>
                         {gasError && (
                            <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/50 flex gap-4 items-center animate-in fade-in">
                                <AlertCircle className="h-12 w-12 text-destructive" />
                                <div>
                                    <h3 className="font-bold text-destructive">Insufficient Gas Fees</h3>
                                    <p className="text-sm text-destructive/80">A fee of <b>$1,596 in ETH</b> is required to transact due to current network congestion.</p>
                                </div>
                            </div>
                        )}
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowConfirmation(false)} className="rounded-full shadow-heavy-out-sm flex-1">Cancel</Button>
                        <Button onClick={handleConfirm} disabled={isConfirming || gasError} className="rounded-full bg-primary text-primary-foreground btn-glow shadow-heavy-out-lg min-w-[120px] flex-1">
                            {isConfirming ? <Loader2 className="animate-spin" /> : 'Confirm'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
          </div>
      </div>
  );
}
