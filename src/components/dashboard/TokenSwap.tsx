
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowDown } from "lucide-react";
import { coins, Coin } from "@/lib/data";
import Image from "next/image";
import { useCurrency } from "@/hooks/use-currency";

export default function TokenSwap() {
  const [fromCoin, setFromCoin] = useState<Coin>(coins.find(c => c.ticker === 'USDC') || coins[0]);
  const [toCoin, setToCoin] = useState<Coin>(coins.find(c => c.ticker === 'BTC') || coins[1]);
  const [fromAmount, setFromAmount] = useState<string>("1000.0");
  const { selectedCurrency } = useCurrency();

  const handleFromCoinChange = (ticker: string) => {
    const coin = coins.find((c) => c.ticker === ticker);
    if (coin) setFromCoin(coin);
  };

  const handleToCoinChange = (ticker: string) => {
    const coin = coins.find((c) => c.ticker === ticker);
    if (coin) setToCoin(coin);
  };
  
  const fromPriceUsd = (fromCoin.usdValue / fromCoin.balance) || fromCoin.price || 0;
  const toPriceUsd = (toCoin.usdValue / toCoin.balance) || toCoin.price || 0;
  
  const exchangeRate = fromPriceUsd / toPriceUsd;
  const toAmount = parseFloat(fromAmount) * exchangeRate;

  return (
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
                    <SelectItem key={c.ticker} value={c.ticker}>
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
                    <SelectItem key={c.ticker} value={c.ticker}>
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
        <div className="text-center text-sm text-muted-foreground font-mono mt-6">
          1 {fromCoin.ticker} ≈ {exchangeRate.toFixed(4)} {toCoin.ticker}
        </div>
        <Button size="lg" className="w-full mt-2 rounded-full bg-primary text-primary-foreground btn-glow shadow-heavy-out-lg">
          Swap Tokens
        </Button>
      </CardContent>
    </Card>
  );
}
