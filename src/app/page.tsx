'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { GenesisVaultLogo } from '@/components/icons';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CreditCard, ShieldCheck, Zap, Bot, Globe, KeyRound } from 'lucide-react';
import Image from 'next/image';
import { BitcoinIcon, EthereumIcon, CardanoIcon } from '@/components/icons';
import { Atom, Dog, Unplug, Waves, Wind, Orbit, Sun, Gem } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) => (
  <div className="p-8 rounded-2xl shadow-neo-out-lg bg-background flex flex-col items-center text-center">
    <div className="p-5 rounded-full shadow-neo-in-lg bg-background mb-6">
      <Icon className="h-10 w-10 text-primary [filter:drop-shadow(0_0_5px_hsl(var(--primary)/0.7))]" />
    </div>
    <h3 className="text-xl font-bold font-headline mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

const faqItems = [
    {
      question: "What is Genesis Vault?",
      answer: "Genesis Vault is a non-custodial crypto wallet, meaning you have full control over your private keys and your funds. We provide a secure and user-friendly interface for you to manage your digital assets.",
    },
    {
      question: "Is Genesis Vault secure?",
      answer: "Yes, security is our top priority. Your private keys are encrypted and stored only on your device. We utilize state-of-the-art security measures to protect your assets.",
    },
    {
      question: "Which cryptocurrencies do you support?",
      answer: "We support a wide range of cryptocurrencies including Bitcoin (BTC), Ethereum (ETH), Cardano (ADA), and many more. We are constantly working to add support for new assets.",
    },
    {
        question: "Can I import an existing wallet?",
        answer: "Absolutely. You can easily import any existing wallet using your 12 or 24-word secret recovery phrase. Your assets will appear in Genesis Vault once the import is complete."
    }
];

const tokenAssets = [
    { name: 'Bitcoin', icon: BitcoinIcon },
    { name: 'Ethereum', icon: EthereumIcon },
    { name: 'Cardano', icon: CardanoIcon },
    { name: 'Cosmos', icon: Atom },
    { name: 'Dogecoin', icon: Dog },
    { name: 'Solana', icon: Sun },
    { name: 'Ripple', icon: Waves },
    { name: 'Polkadot', icon: Orbit },
    { name: 'Litecoin', icon: Gem },
    { name: 'Chainlink', icon: Unplug },
    { name: 'Stellar', icon: Wind },
    { name: 'Tether', icon: Globe },
];

export default function LandingPage() {
  const [year, setYear] = React.useState(new Date().getFullYear());

  React.useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <div className="min-h-screen w-full bg-background font-body text-foreground">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]"></div>
      
      <main className="relative z-10 flex flex-col items-center p-4 overflow-hidden">
        
        <div className="text-center my-24 flex flex-col items-center">
            <div className="relative w-full max-w-6xl mx-auto mb-16">
                <div className="absolute inset-0 rounded-3xl shadow-neo-out-xl bg-background -z-10"></div>
                <Image src="https://picsum.photos/seed/99/1200/600" width={1200} height={600} alt="Crypto vault hero image" className="rounded-3xl p-4 shadow-neo-in-xl" data-ai-hint="crypto vault abstract" />
            </div>

          <div className="inline-block p-8 rounded-full shadow-neo-out-xl mb-8 -mt-24 bg-background relative">
            <div className="p-8 rounded-full shadow-neo-in-xl">
              <GenesisVaultLogo />
            </div>
          </div>
          <h1 className="text-6xl md:text-8xl font-bold font-headline tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-b from-foreground/90 to-muted-foreground">
            Genesis Vault
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-muted-foreground mb-12">
            The ultimate non-custodial crypto wallet, giving you complete control over your digital assets. Secure, seamless, and powerful.
          </p>
          <Link href="/wallet-setup">
            <Button size="lg" className="h-16 px-12 text-xl rounded-full bg-primary text-primary-foreground btn-glow shadow-neo-out active:shadow-neo-in">
              Access Your Wallet
            </Button>
          </Link>
        </div>

        <section id="assets" className="w-full max-w-6xl mx-auto py-24">
            <div className="text-center mb-16">
                <h2 className="text-5xl font-bold font-headline">All Your Favorite Assets</h2>
                <p className="text-xl text-muted-foreground mt-4 max-w-3xl mx-auto">Genesis offers a unified home for your entire portfolio, supporting thousands of tokens across multiple blockchains. From the cornerstones of crypto to the latest DeFi gems, manage it all with unparalleled security and ease.</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
                {tokenAssets.map((token) => (
                    <div key={token.name} className="flex flex-col items-center text-center p-4 rounded-2xl shadow-neo-out-sm transition-all duration-300 hover:shadow-neo-in-sm hover:-translate-y-1">
                        <div className="p-4 rounded-full shadow-neo-in-sm bg-background mb-4">
                            <token.icon className="h-8 w-8 text-primary" />
                        </div>
                        <p className="font-semibold text-sm">{token.name}</p>
                    </div>
                ))}
            </div>
        </section>

        <section id="features" className="w-full max-w-6xl mx-auto py-24">
            <div className="text-center mb-16">
                <h2 className="text-5xl font-bold font-headline">Unparalleled Features</h2>
                <p className="text-xl text-muted-foreground mt-4">Everything you need for a secure crypto experience.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <FeatureCard 
                icon={ShieldCheck}
                title="Total Security"
                description="Your private keys never leave your device. State-of-the-art encryption for your peace of mind."
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
        </section>
        
        <section className="w-full max-w-6xl mx-auto py-24">
             <div className="relative p-8 rounded-3xl shadow-neo-out-xl">
                <Image src="https://picsum.photos/seed/45/1200/500" width={1200} height={500} alt="Digital wallet interface" className="rounded-2xl" data-ai-hint="digital wallet security" />
                <div className="absolute inset-0 flex items-center justify-start p-16">
                    <div className="max-w-md text-left bg-background/50 backdrop-blur-md p-8 rounded-2xl shadow-neo-out-lg">
                        <h3 className="text-4xl font-bold font-headline mb-4">Your Digital Fortress</h3>
                        <p className="text-lg text-muted-foreground">Built on a foundation of cryptographic excellence, Genesis Vault employs multi-layered security protocols to ensure your assets are impenetrable.</p>
                    </div>
                </div>
            </div>
        </section>

        <section id="why-choose-us" className="w-full max-w-6xl mx-auto py-24">
            <div className="grid md:grid-cols-2 gap-16 items-center">
                <div className="space-y-6">
                    <h2 className="text-5xl font-bold font-headline">Why Choose Genesis Vault?</h2>
                    <p className="text-xl text-muted-foreground">We provide a comprehensive suite of tools designed for both beginners and seasoned crypto enthusiasts.</p>
                    <ul className="space-y-6">
                        <li className="flex items-start gap-4">
                            <div className="p-3 rounded-full shadow-neo-in bg-background mt-1">
                                <KeyRound className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h4 className="font-bold text-lg">Full Ownership</h4>
                                <p className="text-muted-foreground">You are the sole owner of your private keys. No third-party has access to your funds.</p>
                            </div>
                        </li>
                        <li className="flex items-start gap-4">
                            <div className="p-3 rounded-full shadow-neo-in bg-background mt-1">
                                <Globe className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h4 className="font-bold text-lg">Multi-Currency Support</h4>
                                <p className="text-muted-foreground">Manage a diverse portfolio of assets all in one place, from Bitcoin to the latest DeFi tokens.</p>
                            </div>
                        </li>
                        <li className="flex items-start gap-4">
                            <div className="p-3 rounded-full shadow-neo-in bg-background mt-1">
                                <Bot className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h4 className="font-bold text-lg">AI-Powered Insights</h4>
                                <p className="text-muted-foreground">Leverage our GenAI assistant to analyze market trends, get security tips, and manage your portfolio.</p>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="p-8 rounded-3xl shadow-neo-out-xl">
                    <Image src="https://picsum.photos/seed/33/600/600" width={600} height={600} alt="Genesis Vault Interface" className="rounded-2xl" data-ai-hint="app interface" />
                </div>
            </div>
        </section>

        <section id="faq" className="w-full max-w-3xl mx-auto py-24">
            <div className="text-center mb-16">
                <h2 className="text-5xl font-bold font-headline">Frequently Asked Questions</h2>
            </div>
            <Accordion type="single" collapsible className="w-full space-y-4">
                {faqItems.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`} className="border-none rounded-2xl shadow-neo-out-lg bg-background p-2">
                        <AccordionTrigger className="text-lg font-bold px-6 hover:no-underline">
                            {item.question}
                        </AccordionTrigger>
                        <AccordionContent className="px-6 text-muted-foreground">
                            <div className="pt-4 border-t border-border">{item.answer}</div>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </section>
        
        <footer className="w-full max-w-6xl mx-auto py-12 text-center text-muted-foreground border-t border-border mt-12">
            <p>&copy; {year} Genesis Vault. All rights reserved.</p>
        </footer>

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
