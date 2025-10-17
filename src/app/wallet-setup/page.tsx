'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { GenesisVaultLogo } from '@/components/icons';
import { PlusCircle, Download } from 'lucide-react';

export default function WalletSetupPage() {
  return (
    <div className="min-h-screen w-full bg-background font-body text-foreground flex flex-col items-center justify-center p-4">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]"></div>
      <main className="relative z-10 flex flex-col items-center text-center">

        <Link href="/" className="mb-12">
          <div className="inline-block p-6 rounded-full shadow-neo-out mb-4">
            <div className="p-6 rounded-full shadow-neo-in">
              <GenesisVaultLogo />
            </div>
          </div>
          <h1 className="text-4xl font-bold font-headline tracking-tight">
            Genesis Vault
          </h1>
        </Link>
        
        <p className="max-w-md mx-auto text-lg text-muted-foreground mb-12">
          Welcome. Get started by creating a new wallet or importing an existing one using your seed phrase.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl">
          <Link href="/create-wallet" className="w-full">
            <div className="p-10 rounded-2xl shadow-neo-out border-none flex flex-col items-center text-center h-full transition-shadow duration-300 hover:shadow-neo-in">
                <div className="p-6 rounded-full shadow-neo-in bg-background mb-6">
                    <PlusCircle className="h-12 w-12 text-primary [filter:drop-shadow(0_0_5px_hsl(var(--primary)/0.7))]" />
                </div>
                <h2 className="text-2xl font-bold font-headline mb-2">Create New Wallet</h2>
                <p className="text-muted-foreground">Generate a new, secure wallet and receive your unique seed phrase.</p>
            </div>
          </Link>
          <Link href="/import-wallet" className="w-full">
            <div className="p-10 rounded-2xl shadow-neo-out border-none flex flex-col items-center text-center h-full transition-shadow duration-300 hover:shadow-neo-in">
                <div className="p-6 rounded-full shadow-neo-in bg-background mb-6">
                    <Download className="h-12 w-12 text-primary [filter:drop-shadow(0_0_5px_hsl(var(--primary)/0.7))]" />
                </div>
                <h2 className="text-2xl font-bold font-headline mb-2">Import Wallet</h2>
                <p className="text-muted-foreground">Access your existing wallet by entering your secret recovery phrase.</p>
            </div>
          </Link>
        </div>
      </main>
      <style jsx>{`
          .bg-grid-pattern {
            background-image:
              linear-gradient(hsl(var(--border)) 1px, transparent 1px),
              linear-gradient(to right, hsl(var(--border)) 1px, hsl(var(--background)) 1px);
            background-size: 40px 40px;
          }
        `}</style>
    </div>
  );
}
