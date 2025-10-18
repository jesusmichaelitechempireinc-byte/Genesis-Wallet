
'use client';

import React, { useState } from 'react';
import Header from "@/components/dashboard/Header";
import BottomNav from "@/components/dashboard/BottomNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, QrCode } from "lucide-react";
import Image from "next/image";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { coins, type Coin } from "@/lib/data";

const walletAddresses: Record<string, { address: string, network: string }> = {
    'BTC': { address: 'bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq', network: 'Bitcoin' },
    'ETH': { address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F', network: 'Ethereum (ERC20)' },
    'USDC': { address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F', network: 'Ethereum (ERC20)' },
    'USDT-ERC20': { address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F', network: 'Ethereum (ERC20)' },
    'SOL': { address: 'So11111111111111111111111111111111111111112', network: 'Solana' },
    'USDT-TRC20': { address: 'TXYZopYRdj2D9XRtbG411XZZ3kM5xV3FpS', network: 'Tron (TRC20)' },
    'TRX': { address: 'TXYZopYRdj2D9XRtbG411XZZ3kM5xV3FpS', network: 'Tron (TRC20)' },
    'Default': { address: 'genesis-vault-main-0x...a4b8', network: 'Genesis Chain' }
}

export default function ReceivePage() {
    const [selectedCoin, setSelectedCoin] = useState<Coin | null>(null);
    
    const handleCoinChange = (ticker: string) => {
        const coin = coins.find((c) => c.ticker === ticker);
        setSelectedCoin(coin || null);
    };

    const walletInfo = selectedCoin ? (walletAddresses[selectedCoin.ticker] || walletAddresses['Default']) : null;

  return (
      <div className="flex min-h-screen w-full bg-background font-body text-foreground">
          <div className="flex flex-1 flex-col relative">
            <Header />
            <main className="flex-1 p-4 md:p-6 lg:p-8 flex items-center justify-center pb-32">
               <Card className="w-full max-w-md shadow-heavy-out-lg border-none text-center">
                <CardHeader>
                    <CardTitle className="font-headline text-3xl">Receive Assets</CardTitle>
                    <CardDescription>Select an asset to view your address.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6 items-center justify-center">
                    <Select onValueChange={handleCoinChange}>
                        <SelectTrigger className="w-full shadow-heavy-in-sm">
                            <SelectValue placeholder="Select an asset..." />
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
                    
                    {walletInfo && (
                        <div className='flex flex-col items-center gap-6 animate-in fade-in duration-500'>
                            <div className="p-4 bg-background shadow-heavy-in-lg rounded-2xl inline-block">
                                <Image 
                                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${walletInfo.address}`} 
                                    width={200} height={200} 
                                    alt="QR Code" 
                                    data-ai-hint="qr code"
                                    key={walletInfo.address} 
                                />
                            </div>
                            <div className='text-center'>
                                <p className='text-sm text-muted-foreground'>Your {selectedCoin?.name} address on the <span className='font-bold text-foreground'>{walletInfo.network}</span> network.</p>
                            </div>
                             <div className="flex items-center gap-4 p-4 rounded-lg shadow-heavy-in-sm w-full">
                                <p className="font-mono text-muted-foreground text-sm flex-1 text-left truncate">{walletInfo.address}</p>
                                <Button variant="ghost" size="icon" className="rounded-full shadow-heavy-out-sm text-primary">
                                    <Copy className="h-5 w-5" />
                                </Button>
                            </div>
                        </div>
                    )}
                </CardContent>
              </Card>
            </main>
            <BottomNav />
          </div>
      </div>
  );
}
