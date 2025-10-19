
"use client";

import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { ArrowDown, Loader2, AlertCircle, Info } from "lucide-react";
import { Coin } from "@/lib/data";
import Image from "next/image";
import { useCurrency } from "@/hooks/use-currency";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export default function TokenSwap({ initialFromTicker, initialCoins }: { initialFromTicker: string | null, initialCoins: Coin[] }) {
  const coins = initialCoins;
  const [fromCoin, setFromCoin] = useState<Coin | undefined>(undefined);
  const [toCoin, setToCoin] = useState<Coin | undefined>(undefined);
  
  useEffect(() => {
      if (coins.length > 0) {
        let initialFrom = coins.find(c => c.ticker === 'USDC') || coins[0];
        if (initialFromTicker) {
            const foundCoin = coins.find(c => c.ticker === initialFromTicker);
            if (foundCoin) {
              initialFrom = foundCoin;
            }
        }
        setFromCoin(initialFrom);

        let initialTo = coins.find(c => c.ticker === 'BTC') || coins[1];
        if (initialFrom && initialTo && initialFrom.ticker === initialTo.ticker) {
            initialTo = coins.find(c => c.ticker !== initialFrom.ticker) || coins[1];
        }
        setToCoin(initialTo);
      }
  }, [coins, initialFromTicker]);


  const [fromAmount, setFromAmount] = useState<string>("1000.0");
  const [error, setError] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [gasError, setGasError] = useState(false);

  const { formatCurrency } = useCurrency();

  const handleFromCoinChange = (ticker: string) => {
    const coin = coins.find((c) => c.ticker === ticker);
    if (coin) setFromCoin(coin);
    setError('');
    setGasError(false);
  };

  const handleToCoinChange = (ticker: string) => {
    const coin = coins.find((c) => c.ticker === ticker);
    if (coin) setToCoin(coin);
  };

  const fromPriceUsd = useMemo(() => (fromCoin?.price || 0), [fromCoin]);
  const toPriceUsd = useMemo(() => (toCoin?.price || 0), [toCoin]);
  
  const exchangeRate = fromPriceUsd > 0 && toPriceUsd > 0 ? fromPriceUsd / toPriceUsd : 0;
  const toAmount = parseFloat(fromAmount) * exchangeRate;
  
  const fromAmountUsd = parseFloat(fromAmount) * fromPriceUsd;
  
  const networkFee = useMemo(() => {
    if (fromCoin?.ticker === 'USDC') {
        return 1596;
    }
    return 15.73;
  }, [fromCoin]);

  const totalAmountUsd = fromAmountUsd + networkFee;

  const handleReviewSwap = () => {
    if (!fromCoin) return;
    if (fromCoin.balance <= 0) {
        setError(`You have no ${fromCoin.ticker} to swap.`);
        return;
    }
    if (parseFloat(fromAmount) > fromCoin.balance) {
        setError('Amount exceeds your balance.');
        return;
    }
    setError('');
    setShowConfirmation(true);
  };

  const handleConfirmSwap = () => {
    setIsConfirming(true);
    setGasError(false);

    setTimeout(() => {
        if(fromCoin?.ticker === 'USDC') {
            setGasError(true);
        } else {
            setShowConfirmation(false);
        }
        setIsConfirming(false);
    }, 2500);
  };
  
  const isSwapDisabled = !fromCoin || fromCoin.balance <= 0 || !fromAmount || parseFloat(fromAmount) <= 0;

  if (!fromCoin || !toCoin) {
    return <div className="flex items-center justify-center h-full w-full"><Loader2 className="animate-spin"/></div>
  }

  return (
      <>
        <Card className="shadow-heavy-out-lg border-none h-full w-full">
        <CardHeader>
            <CardTitle className="font-headline text-3xl">Token Swap</CardTitle>
            <CardDescription>Instantly swap between assets.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col h-[calc(100%-88px)]">
            <div className="space-y-4 flex-grow">
            <div className="p-4 rounded-lg shadow-heavy-in-sm bg-background">
                <Label htmlFor="from-amount">You Pay</Label>
                <div className="flex items-center gap-2 mt-1">
                <Input
                    id="from-amount"
                    type="number"
                    value={fromAmount}
                    onChange={(e) => setFromAmount(e.target.value)}
                    className="text-2xl font-mono border-0 bg-transparent shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 p-0 h-auto"
                />
                <Select value={fromCoin.ticker} onValueChange={handleFromCoinChange}>
                    <SelectTrigger className="w-[150px] rounded-full shadow-heavy-out-sm border-none">
                    <SelectValue>
                        <div className="flex items-center gap-2">
                        {fromCoin.iconUrl ? <Image src={fromCoin.iconUrl} alt={fromCoin.name} width={20} height={20} /> : fromCoin.icon && <fromCoin.icon className="h-5 w-5" />}
                        {fromCoin.ticker}
                        </div>
                    </SelectValue>
                    </SelectTrigger>
                    <SelectContent className="shadow-heavy-out-sm">
                    {coins.map((c) => (
                        <SelectItem key={c.ticker} value={c.ticker} disabled={c.ticker === toCoin.ticker}>
                        <div className="flex items-center gap-2">
                            {c.iconUrl ? <Image src={c.iconUrl} alt={c.name} width={20} height={20} /> : c.icon && <c.icon className="h-5 w-5" />}
                            {c.ticker}
                        </div>
                        </SelectItem>
                    ))}
                    </SelectContent>
                </Select>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                Balance: {fromCoin.balance.toFixed(4)}
                </div>
            </div>
            
            <div className="flex justify-center -my-2 z-10">
                <Button variant="ghost" size="icon" className="rounded-full shadow-heavy-out-sm bg-background hover:bg-background active:shadow-heavy-in-sm text-primary hover:text-primary transition-all duration-300">
                <ArrowDown className="h-5 w-5" />
                </Button>
            </div>

            <div className="p-4 rounded-lg shadow-heavy-in-sm bg-background">
                <Label htmlFor="to-amount">You Get</Label>
                <div className="flex items-center gap-2 mt-1">
                <Input
                    id="to-amount"
                    readOnly
                    value={toAmount.toFixed(6)}
                    className="text-2xl font-mono border-0 bg-transparent shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 p-0 h-auto"
                />
                <Select value={toCoin.ticker} onValueChange={handleToCoinChange}>
                    <SelectTrigger className="w-[150px] rounded-full shadow-heavy-out-sm border-none">
                    <SelectValue>
                        <div className="flex items-center gap-2">
                        {toCoin.iconUrl ? <Image src={toCoin.iconUrl} alt={toCoin.name} width={20} height={20} /> : toCoin.icon && <toCoin.icon className="h-5 w-5" />}
                        {toCoin.ticker}
                        </div>
                    </SelectValue>
                    </SelectTrigger>
                    <SelectContent className="shadow-heavy-out-sm">
                    {coins.map((c) => (
                        <SelectItem key={c.ticker} value={c.ticker} disabled={c.ticker === fromCoin.ticker}>
                        <div className="flex items-center gap-2">
                            {c.iconUrl ? <Image src={c.iconUrl} alt={c.name} width={20} height={20} /> : c.icon && <c.icon className="h-5 w-5" />}
                            {c.ticker}
                        </div>
                        </SelectItem>
                    ))}
                    </SelectContent>
                </Select>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                Balance: {toCoin.balance.toFixed(4)}
                </div>
            </div>
            </div>
            {error && <p className="text-destructive text-sm font-bold text-center mt-4">{error}</p>}
            <div className="text-center text-sm text-muted-foreground font-mono mt-6">
            1 {fromCoin.ticker} ≈ {exchangeRate.toFixed(4)} {toCoin.ticker}
            </div>
            <Button size="lg" className="w-full mt-2 rounded-full bg-primary text-primary-foreground btn-glow shadow-heavy-out-lg" onClick={handleReviewSwap} disabled={isSwapDisabled}>
            Swap Tokens
            </Button>
        </CardContent>
        </Card>
        
        <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
            <DialogContent className="shadow-heavy-out-lg">
                <DialogHeader className="text-center">
                    <DialogTitle className="font-headline text-3xl">Swapping</DialogTitle>
                    <div className="flex items-center justify-center gap-2">
                        <h2 className="text-4xl font-bold font-mono">{parseFloat(fromAmount).toFixed(2)}</h2>
                        <span className="text-xl text-muted-foreground font-mono">{fromCoin?.ticker}</span>
                    </div>
                    <p className="text-muted-foreground">{formatCurrency(fromAmountUsd)}</p>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="p-4 rounded-lg shadow-heavy-in-sm space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">From</span>
                            <div className="font-bold font-mono flex items-center gap-2">
                                {fromCoin.iconUrl ? <Image src={fromCoin.iconUrl} alt={fromCoin.name} width={20} height={20} /> : fromCoin.icon && <fromCoin.icon className="h-5 w-5" />}
                                {fromAmount} {fromCoin?.ticker}
                            </div>
                        </div>
                        <div className="flex justify-center -my-1">
                            <ArrowDown className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">To (Estimated)</span>
                             <div className="font-bold font-mono flex items-center gap-2">
                                {toCoin.iconUrl ? <Image src={toCoin.iconUrl} alt={toCoin.name} width={20} height={20} /> : toCoin.icon && <toCoin.icon className="h-5 w-5" />}
                                {toAmount.toFixed(6)} {toCoin?.ticker}
                            </div>
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
                                {fromCoin?.ticker === 'USDC' && <p className="text-xs text-muted-foreground">Ethereum Network</p>}
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
                    <Button onClick={handleConfirmSwap} disabled={isConfirming || gasError} className="rounded-full bg-primary text-primary-foreground btn-glow shadow-heavy-out-lg min-w-[120px] flex-1">
                        {isConfirming ? <Loader2 className="animate-spin" /> : 'Confirm Swap'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
      </>
  );
}
