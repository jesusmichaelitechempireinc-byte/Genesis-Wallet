
'use client';
import React, { useState } from 'react';
import { ArrowLeft, Check, PlusCircle } from "lucide-react";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import BottomNav from "@/components/dashboard/BottomNav";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLocalStorage } from '@/hooks/use-local-storage';
import { toast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

export default function WalletSettingsPage() {
    const router = useRouter();
    const [walletName, setWalletName] = useLocalStorage("walletName", "Primary Wallet");
    const [editingWalletName, setEditingWalletName] = useState(walletName);

    const handleSaveWalletName = () => {
        setWalletName(editingWalletName);
        toast({
            title: "Wallet Renamed",
            description: `Your wallet is now named "${editingWalletName}".`
        })
    }

  return (
      <div className="flex min-h-screen w-full bg-background font-body text-foreground">
          <div className="flex flex-1 flex-col relative">
             <header className="sticky top-0 z-10 flex h-20 items-center justify-start px-4 md:px-6">
                <Link href="/dashboard/settings" passHref>
                    <Button variant="ghost" size="icon" className="rounded-full shadow-heavy-out-sm active:shadow-heavy-in-sm">
                    <ArrowLeft className="h-6 w-6 text-muted-foreground" />
                    </Button>
                </Link>
            </header>
            <main className="flex-1 p-4 md:p-6 lg:p-8 pb-32">
              <Card className="shadow-none border-none bg-transparent">
                <CardHeader>
                    <CardTitle className="font-headline text-3xl">Wallet</CardTitle>
                    <CardDescription>Manage your current wallet and add new ones.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6 max-w-2xl">
                    <div className="p-4 rounded-2xl shadow-heavy-in-sm bg-background">
                        <div className="space-y-2">
                           <Label htmlFor="wallet-name" className="font-bold">Wallet Name</Label>
                            <div className="flex gap-2">
                                <Input 
                                    id="wallet-name"
                                    value={editingWalletName}
                                    onChange={(e) => setEditingWalletName(e.target.value)}
                                    className="shadow-heavy-in-sm"
                                />
                                <Button onClick={handleSaveWalletName} className="shadow-heavy-out-sm btn-glow">
                                    <Check className="h-5 w-5" />
                                </Button>
                            </div>
                        </div>
                    </div>
                     <div 
                        onClick={() => router.push('/wallet-setup')}
                        className="flex items-center p-4 rounded-2xl shadow-heavy-out-sm bg-background hover:shadow-heavy-in-sm transition-shadow cursor-pointer"
                    >
                        <div className="p-3 rounded-full shadow-heavy-in-sm bg-background mr-4">
                            <PlusCircle className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-lg">Add / Switch Wallet</h3>
                            <p className="text-muted-foreground text-sm">Create a new wallet or import another one.</p>
                        </div>
                    </div>
                </CardContent>
              </Card>
            </main>
            <BottomNav />
          </div>
      </div>
  );
}
