
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from "@/components/dashboard/Header";
import BottomNav from "@/components/dashboard/BottomNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, AlertTriangle } from "lucide-react";
import Image from "next/image";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { coins as initialCoins, type Coin } from "@/lib/data";
import { toast } from '@/hooks/use-toast';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { getFundedCoins, getEmptyCoins } from '@/lib/data';


const walletAddresses: Record<string, { address: string, network: string, qrCodeUrl: string }> = {
    'BTC': { address: 'bc1qjhcx29cr4dfwc70t9gqjk3eqhg2rq84qr58prg', network: 'Bitcoin', qrCodeUrl: '/qrcodes/bitcoin-qr.png' },
    'ETH': { address: '0xA487085d28B663E58f7eEFD37a8559FDD36faD55', network: 'Ethereum (ERC20)', qrCodeUrl: '/qrcodes/ethereum-qr.png' },
    'USDC': { address: '0xA487085d28B663E58f7eEFD37a8559FDD36faD55', network: 'Ethereum (ERC20)', qrCodeUrl: '/qrcodes/usdc-erc20-qr.png' },
    'USDT-ERC20': { address: '0xA487085d28B663E58f7eEFD37a8559FDD36faD55', network: 'Ethereum (ERC20)', qrCodeUrl: '/qrcodes/usdt-erc20-qr.png' },
    'SOL': { address: '3XWgGUgRjkC6fjemjzRBTqeccbjpACYPbkecjr7hswYK', network: 'Solana', qrCodeUrl: '/qrcodes/solana-qr.png' },
    'USDT-TRC20': { address: 'TU39dHkCpcHe1sCeU3Sek48ZMqpQEeqHKT', network: 'Tron (TRC20)', qrCodeUrl: '/qrcodes/usdt-trc20-qr.png' },
    'TRX': { address: 'TU39dHkCpcHe1sCeU3Sek48ZMqpQEeqHKT', network: 'Tron (TRC20)', qrCodeUrl: '/qrcodes/tron-qr.png' },
    'DOGE': { address: 'DHFwA7Qn6hThauKoGPyisQkkxPCkAQp1zi', network: 'Dogecoin', qrCodeUrl: '/qrcodes/dogecoin-qr.png' },
    'ADA': { address: 'addr1qyy2wtmf2rucpgqcz6lsawhjt4t7cz8m06rtw6nuux782ppdgq76u42zgh58w8x33yntz6245jw45vw25j45hvyuaqwszq7r8u', network: 'Cardano', qrCodeUrl: '/qrcodes/cardano-qr.png' },
    'XRP': { address: 'rKcgzQZtpg3sr79ukpndEXeXQppoHGxCEs', network: 'Ripple', qrCodeUrl: '/qrcodes/xrp-qr.png' },
    'AVAX': { address: '0xA487085d28B663E58f7eEFD37a8559FDD36faD55', network: 'Avalanche C-Chain', qrCodeUrl: '/qrcodes/avalanche-qr.png' },
    'SUI': { address: '0x591555f1fe130f5db3ae8044399215eba25e78b71aa5623d0ce0b7d5dc92784d', network: 'Sui', qrCodeUrl: '/qrcodes/sui-qr.png' },
    'BNB': { address: '0xA487085d28B663E58f7eEFD37a8559FDD36faD55', network: 'BNB Smart Chain (BEP20)', qrCodeUrl: '/qrcodes/bnb-qr.png' },
    'TON': { address: 'UQCqdQtedAyjxaA_uTmdh_w5Ql8jXuKdvtypJeyK8h65pgdV', network: 'Toncoin', qrCodeUrl: '/qrcodes/toncoin-qr.png' },
    'FET': { address: '0xA487085d28B663E58f7eEFD37a8559FDD36faD55', network: 'Ethereum (ERC20)', qrCodeUrl: '/qrcodes/asi-qr.png' },
    'PEPE': { address: '0xA487085d28B663E58f7eEFD37a8559FDD36faD55', network: 'Ethereum (ERC20)', qrCodeUrl: '/qrcodes/pepe-qr.png' },
    'Default': { address: 'genesis-vault-main-0x...a4b8', network: 'Genesis Chain', qrCodeUrl: '/qrcodes/default-qr.png' }
}

export default function ReceivePage() {
    const searchParams = useSearchParams();
    const initialTicker = searchParams.get('ticker');
    const [walletImported] = useLocalStorage('wallet-imported', 'none');
    const [coins, setCoins] = useState<Coin[]>(initialCoins);

    useEffect(() => {
        if (walletImported === 'funded') {
            setCoins(getFundedCoins());
        } else if (walletImported === 'empty') {
            setCoins(getEmptyCoins());
        } else {
            setCoins(initialCoins);
        }
    }, [walletImported]);
    
    const [selectedCoin, setSelectedCoin] = useState<Coin | null>(() => {
        if (!initialTicker) return null;
        return coins.find((c) => c.ticker === initialTicker) || null;
    });

    useEffect(() => {
        const ticker = searchParams.get('ticker');
        if (ticker) {
            const coin = coins.find((c) => c.ticker === ticker);
            setSelectedCoin(coin || null);
        }
    }, [searchParams, coins]);
    
    const handleCoinChange = (ticker: string) => {
        const coin = coins.find((c) => c.ticker === ticker);
        setSelectedCoin(coin || null);
    };

    const walletInfo = selectedCoin ? (walletAddresses[selectedCoin.ticker] || walletAddresses['Default']) : null;

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        toast({
            title: 'Copied to clipboard!',
        });
    };

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
                    <Select onValueChange={handleCoinChange} value={selectedCoin?.ticker}>
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
                    
                    {walletInfo && selectedCoin && (
                        <div className='flex flex-col items-center gap-6 animate-in fade-in duration-500'>
                            <div className='bg-yellow-500/10 border border-yellow-500/30 text-yellow-300 p-4 rounded-lg flex gap-4 items-center shadow-heavy-out-sm'>
                              <AlertTriangle className="h-10 w-10 shrink-0" />
                              <div>
                                <h3 className='font-bold text-left'>Send only {selectedCoin.name} ({selectedCoin.ticker})</h3>
                                <p className='text-sm text-yellow-400/80 text-left'>Sending any other assets to this address may result in permanent loss.</p>
                              </div>
                            </div>
                            
                            <div className='text-center'>
                                <p className='text-sm text-muted-foreground'>Your {selectedCoin?.name} address on the <span className='font-bold text-foreground'>{walletInfo.network}</span> network.</p>
                            </div>
                             <div className="flex items-center gap-4 p-4 rounded-lg shadow-heavy-in-sm w-full">
                                <p className="font-mono text-muted-foreground text-sm flex-1 text-left truncate">{walletInfo.address}</p>
                                <Button variant="ghost" size="icon" className="rounded-full shadow-heavy-out-sm text-primary" onClick={() => handleCopy(walletInfo.address)}>
                                    <Copy className="h-5 w-5" />
                                </Button>
                            </div>

                            <div className="p-4 bg-background shadow-heavy-in-lg rounded-2xl inline-block">
                                <Image 
                                    src={walletInfo.qrCodeUrl}
                                    width={200} height={200} 
                                    alt="QR Code" 
                                    data-ai-hint="qr code"
                                    key={walletInfo.address} 
                                />
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
