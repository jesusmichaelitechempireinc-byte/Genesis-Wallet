'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { GenesisVaultLogo } from '@/components/icons';
import { CreditCard, ShieldCheck, Zap } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) => (
  <div className="p-8 rounded-2xl shadow-neo-out border-none flex flex-col items-center text-center">
    <div className="p-6 rounded-full shadow-neo-in bg-background mb-6">
      <Icon className="h-10 w-10 text-primary [filter:drop-shadow(0_0_5px_hsl(var(--primary)/0.7))]" />
    </div>
    <h3 className="text-xl font-bold font-headline mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);


export default function LandingPage() {
  return (
    <div className="min-h-screen w-full bg-background font-body text-foreground">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]"></div>
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 overflow-hidden">
        
        <div className="text-center mb-16">
          <div className="inline-block p-8 rounded-full shadow-neo-out mb-8">
            <div className="p-8 rounded-full shadow-neo-in">
              <GenesisVaultLogo />
            </div>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold font-headline tracking-tighter mb-4">
            Genesis Vault
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-muted-foreground mb-12">
            The future of decentralized finance. A beautifully crafted, secure, and powerful neumorphic crypto wallet.
          </p>
          <Link href="/wallet-setup">
            <Button size="lg" className="h-16 px-12 text-xl rounded-full bg-primary text-primary-foreground btn-glow shadow-neo-out-sm active:shadow-neo-in-sm">
              Enter Web Wallet
            </Button>
          </Link>
        </div>

        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <FeatureCard 
            icon={ShieldCheck}
            title="Unparalleled Security"
            description="Your assets are protected with state-of-the-art encryption and security protocols."
          />
          <FeatureCard 
            icon={CreditCard}
            title="Seamless Swaps"
            description="Instantly exchange between a vast array of cryptocurrencies with a single click."
          />
          <FeatureCard 
            icon={Zap}
            title="Lightning Fast"
            description="Experience blazing-fast transactions and portfolio updates in real-time."
          />
        </div>

        <style jsx>{`
          .bg-grid-pattern {
            background-image:
              linear-gradient(hsl(var(--border)) 1px, transparent 1px),
              linear-gradient(to right, hsl(var(--border)) 1px, hsl(var(--background)) 1px);
            background-size: 40px 40px;
          }
        `}</style>
      </main>
    </div>
  );
}
