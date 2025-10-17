'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { GenesisVaultLogo } from '@/components/icons';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CreditCard, ShieldCheck, Zap, Bot, Globe, KeyRound, UserPlus, DownloadCloud, Rocket } from 'lucide-react';
import Image from 'next/image';

const FeatureCard = ({ icon: Icon, title, description, delay = 0 }: { icon: React.ElementType, title: string, description: string, delay?: number }) => (
    <div className="flex flex-col items-center text-center p-4 fade-in opacity-0" style={{ animationDelay: `${delay}ms` }}>
        <div className="relative mb-6 group">
            <div className="w-24 h-24 rounded-full bg-background shadow-neo-in-lg flex items-center justify-center transition-all duration-300 ease-in-out group-hover:shadow-neo-out-lg">
                <Icon className="h-10 w-10 text-primary transition-all duration-300 ease-in-out group-hover:scale-110 group-hover:text-[hsl(var(--primary)/0.8)]" />
            </div>
            <div className="absolute inset-0 rounded-full primary-glow opacity-50 blur-lg -z-10 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:blur-xl"></div>
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
  { name: 'Bitcoin', imageUrl: 'https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760675521/bitcoin-btc-logo_fchtil.png' },
  { name: 'Ethereum', imageUrl: 'https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760675606/ethereum-eth-logo_gkt5dg.png' },
  { name: 'Solana', imageUrl: 'https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760675609/solana-sol-logo_bcifcy.png' },
  { name: 'Dogecoin', imageUrl: 'https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760675627/dogecoin-doge-logo_vhntvk.png' },
  { name: 'Cardano', imageUrl: 'https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760675738/cardano-ada-logo_pbavn1.png' },
  { name: 'XRP', imageUrl: 'https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760675751/xrp-xrp-logo_smpmq7.png' },
  { name: 'Avalanche', imageUrl: 'https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760675757/avalanche-avax-logo_yt45tu.png' },
  { name: 'Sui', imageUrl: 'https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760675771/sui-sui-logo_blqmgl.png' },
  { name: 'BNB', imageUrl: 'https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760675782/bnb-bnb-logo_matwsx.png' },
  { name: 'Tron', imageUrl: 'https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760675804/tron-trx-logo_amapma.png' },
  { name: 'ASI', imageUrl: 'https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760675816/artificial-superintelligence-alliance-fet-logo_rhrvie.png' },
  { name: 'Pepe', imageUrl: 'https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760675900/pepe-pepe-logo_ey1qka.png' },
];

const GetStartedStep = ({ icon: Icon, title, description, delay = 0 }: { icon: React.ElementType, title: string, description: string, delay?: number }) => (
    <div className="flex flex-col items-center text-center fade-in opacity-0" style={{ animationDelay: `${delay}ms` }}>
        <div className="relative mb-6">
            <div className="p-6 rounded-full shadow-neo-in-lg bg-background">
                <Icon className="h-10 w-10 text-primary" />
            </div>
            <div className="absolute inset-0 rounded-full primary-glow opacity-30 blur-lg -z-10"></div>
        </div>
        <h3 className="text-xl font-bold font-headline mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
    </div>
);

export default function LandingPage() {
  const [year, setYear] = React.useState(new Date().getFullYear());

  React.useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <div className="min-h-screen w-full bg-background font-body text-foreground">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]"></div>
      <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-primary/10 via-background to-background -z-10"></div>
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/10 via-background to-background -z-10"></div>

      <header className="relative z-20 flex justify-between items-center p-6 max-w-7xl mx-auto w-full">
        <Link href="/" className="flex items-center gap-3">
          <GenesisVaultLogo />
          <h2 className="text-xl font-bold">Genesis Vault</h2>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="#features" className="hover:text-primary transition-colors">Features</Link>
          <Link href="#assets" className="hover:text-primary transition-colors">Assets</Link>
          <Link href="#faq" className="hover:text-primary transition-colors">FAQ</Link>
        </nav>
        <Link href="/wallet-setup">
            <Button size="default" className="rounded-full bg-primary/10 border border-primary/50 text-primary-foreground hover:bg-primary/20 shadow-neo-out-sm active:shadow-neo-in-sm transition-all duration-300">
              Launch App
            </Button>
          </Link>
      </header>
      
      <main className="relative z-10 flex flex-col items-center p-4 overflow-hidden">
        
        <div className="w-full max-w-7xl mx-auto grid md:grid-cols-2 items-center my-16 md:my-24 gap-8">
            <div className="text-center md:text-left flex flex-col items-center md:items-start">
                <h1 className="text-5xl md:text-7xl font-bold font-headline tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-b from-foreground/90 to-muted-foreground fade-in opacity-0">
                    Your Gateway to the <span className="text-primary primary-glow">Digital Economy.</span>
                </h1>
                <p className="max-w-xl text-lg text-muted-foreground mb-12 fade-in opacity-0 animate-delay-200">
                    Genesis Vault combines a sleek, intuitive design with powerful, secure features for an unparalleled self-custody crypto experience.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 fade-in opacity-0 animate-delay-400">
                  <Link href="/wallet-setup">
                      <Button size="lg" className="h-14 px-10 text-lg rounded-full bg-primary text-primary-foreground btn-glow shadow-neo-out-lg active:shadow-neo-in-lg">
                       Launch Web Wallet
                      </Button>
                  </Link>
                  <Link href="#features">
                      <Button size="lg" variant="outline" className="h-14 px-10 text-lg rounded-full shadow-neo-out-sm active:shadow-neo-in-sm border-border bg-background/50 hover:bg-muted/50 hover:text-foreground">
                        Discover Features
                      </Button>
                  </Link>
                </div>
            </div>
            <div className="relative group flex justify-center items-center h-full fade-in opacity-0 animate-delay-200">
                <Image 
                  src="https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760722677/wallet-2_z7psdg.png" 
                  width={150}
                  height={75}
                  alt="Genesis Vault Wallet" 
                  className="transition-all duration-500 ease-in-out group-hover:scale-110 [filter:drop-shadow(0_15px_30px_hsl(var(--primary)/0.25))] group-hover:[filter:drop-shadow(0_20px_40px_hsl(var(--primary)/0.5))]"
                  data-ai-hint="app interface dark" />
            </div>
        </div>

        <section id="assets" className="w-full max-w-6xl mx-auto py-24 text-center">
            <div className="mb-16 fade-in opacity-0">
                <h2 className="text-5xl font-bold font-headline">All Your Favorite Assets</h2>
                <p className="text-xl text-muted-foreground mt-4 max-w-3xl mx-auto">
                    Genesis supports a vast and growing ecosystem of cryptocurrencies and digital tokens.
                </p>
            </div>
            <div className="flex justify-center items-center flex-wrap gap-x-8 gap-y-12 px-4">
                {tokenAssets.slice(0, 12).map((token, i) => (
                    <div
                        key={token.name}
                        className="group flex items-center justify-center h-20 w-20 rounded-full bg-background shadow-neo-in transition-all duration-300 ease-in-out hover:shadow-neo-out hover:-translate-y-2 fade-in opacity-0"
                        style={{ animationDelay: `${200 + i * 80}ms` }}
                    >
                        <Image
                            src={token.imageUrl}
                            alt={`${token.name} logo`}
                            width={40}
                            height={40}
                            className="transition-all duration-300 group-hover:scale-110 group-hover:[filter:drop-shadow(0_0_8px_hsl(var(--primary)/0.8))]"/>
                    </div>
                ))}
            </div>
            <p className="mt-8 text-muted-foreground fade-in opacity-0" style={{ animationDelay: `${200 + tokenAssets.length * 80}ms` }}>
                ...and hundreds more.
            </p>
        </section>

        <section id="features" className="w-full max-w-6xl mx-auto py-24">
            <div className="text-center mb-16 fade-in opacity-0">
                <h2 className="text-5xl font-bold font-headline">Unparalleled Features</h2>
                <p className="text-xl text-muted-foreground mt-4">Everything you need for a secure crypto experience.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
            <FeatureCard 
                icon={ShieldCheck}
                title="Total Security"
                description="Your private keys never leave your device. State-of-the-art encryption for your peace of mind."
                delay={0}
            />
            <FeatureCard 
                icon={CreditCard}
                title="Seamless Swaps"
                description="Instantly exchange between a vast array of cryptocurrencies with a single click."
                delay={200}
            />
            <FeatureCard 
                icon={Zap}
                title="Lightning Fast"
                description="Experience blazing-fast transactions and portfolio updates in real-time."
                delay={400}
            />
             <FeatureCard
                icon={Bot}
                title="Genesis AI Assistant"
                description="Leverage our GenAI assistant to analyze trends, get security tips, and manage your portfolio effortlessly."
                delay={600}
            />
            <FeatureCard
                icon={Globe}
                title="Global Access"
                description="Access your funds anywhere, anytime. Your gateway to the digital economy is always in your pocket."
                delay={800}
            />
            <FeatureCard
                icon={KeyRound}
                title="Absolute Ownership"
                description="You and only you control your assets. Non-custodial, decentralized, and truly yours."
                delay={1000}
            />
            </div>
        </section>
        
        <section className="w-full max-w-6xl mx-auto py-24 fade-in opacity-0">
             <div className="relative p-8 rounded-3xl shadow-neo-out-xl">
                <Image src="https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760740595/kerfin7_nea_2783_gjrktr.png" width={1200} height={500} alt="Digital wallet interface" className="rounded-2xl" data-ai-hint="digital wallet security" />
                <div className="absolute inset-0 flex items-center justify-start p-16">
                    <div className="max-w-md text-left bg-background/50 backdrop-blur-md p-8 rounded-2xl shadow-neo-out-lg">
                        <h3 className="text-4xl font-bold font-headline mb-4">Your Digital Fortress</h3>
                        <p className="text-lg text-muted-foreground mb-6">Built on a foundation of cryptographic excellence, Genesis Vault employs multi-layered security protocols to ensure your assets are impenetrable.</p>
                        <Link href="/wallet-setup">
                          <Button size="lg" className="h-12 px-8 text-base rounded-full bg-primary text-primary-foreground btn-glow shadow-neo-out-lg active:shadow-neo-in-lg">
                           Launch Web Wallet
                          </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>

        <section id="why-choose-us" className="w-full max-w-6xl mx-auto py-24 fade-in opacity-0">
          <div className="bg-card/40 rounded-3xl p-8 md:p-12 overflow-hidden">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-5xl font-bold font-headline mb-4">Multi-Wallet Mastery</h2>
                <p className="text-xl text-muted-foreground">
                  For easy and convenient multi-wallet self-custody while staying ultra secure. Manage all your portfolios from a single, unified interface.
                </p>
              </div>
              <div/>
            </div>
            <div className="mt-8 relative h-[400px] flex justify-center items-center group">
                <div className="absolute z-0 group-hover:z-0 transition-all duration-500 ease-in-out transform group-hover:translate-x-[-35%]">
                    <Image 
                        src="https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760722693/2_tf2hjp.png" 
                        width={250} 
                        height={500} 
                        alt="Manage Wallets Mockup"
                        className="rounded-xl transition-all duration-500 ease-in-out group-hover:scale-110 [filter:drop-shadow(0_10px_25px_hsl(var(--primary)/0.25))] group-hover:[filter:drop-shadow(0_15px_30px_hsl(var(--primary)/0.5))]"
                        data-ai-hint="app interface dark"
                    />
                </div>
                <div className="absolute z-10 group-hover:z-20 transition-all duration-500 ease-in-out transform scale-110 group-hover:scale-125">
                    <Image 
                        src="https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760722692/3_yydlje.png" 
                        width={250} 
                        height={500} 
                        alt="Investments Mockup"
                        className="rounded-xl transition-all duration-500 ease-in-out [filter:drop-shadow(0_20px_30px_hsl(var(--primary)/0.35))] group-hover:[filter:drop-shadow(0_25px_45px_hsl(var(--primary)/0.6))]"
                        data-ai-hint="app interface dark"
                    />
                </div>
                <div className="absolute z-0 group-hover:z-0 transition-all duration-500 ease-in-out transform group-hover:translate-x-[35%]">
                    <Image 
                        src="https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760722692/1_qhxhvr.png" 
                        width={250} 
                        height={500} 
                        alt="Exchange Wallet Mockup"
                        className="rounded-xl transition-all duration-500 ease-in-out group-hover:scale-110 [filter:drop-shadow(0_10px_25px_hsl(var(--primary)/0.25))] group-hover:[filter:drop-shadow(0_15px_30px_hsl(var(--primary)/0.5))]"
                        data-ai-hint="app interface dark"
                    />
                </div>
            </div>
          </div>
        </section>

        <section id="get-started" className="w-full max-w-6xl mx-auto py-24 text-center">
            <div className="mb-16 fade-in opacity-0">
                <h2 className="text-5xl font-bold font-headline">Get Started in Seconds</h2>
                <p className="text-xl text-muted-foreground mt-4 max-w-3xl mx-auto">
                    Embark on your self-custody journey with three simple steps.
                </p>
            </div>
            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
                <div className="absolute top-1/2 left-0 w-full h-px bg-border/50 -translate-y-1/2 -z-10 hidden md:block"></div>
                <div className="absolute top-1/2 left-0 w-full border-t-2 border-dashed border-border/50 -translate-y-1/2 -z-10 hidden md:block"></div>
                
                <GetStartedStep
                    icon={UserPlus}
                    title="Create Your Wallet"
                    description="Generate a new wallet or import an existing one. Your keys, your crypto."
                    delay={200}
                />
                <GetStartedStep
                    icon={DownloadCloud}
                    title="Secure Your Phrase"
                    description="Safely store your unique secret recovery phrase. This is your master key."
                    delay={400}
                />
                <GetStartedStep
                    icon={Rocket}
                    title="Explore Web3"
                    description="You're all set! Dive into the world of decentralized finance with Genesis Vault."
                    delay={600}
                />
            </div>
             <div className="mt-16 fade-in opacity-0" style={{ animationDelay: '800ms' }}>
                <Link href="/wallet-setup">
                    <Button size="lg" className="h-14 px-10 text-lg rounded-full bg-primary text-primary-foreground btn-glow shadow-neo-out-lg active:shadow-neo-in-lg">
                        Begin Your Journey
                    </Button>
                </Link>
            </div>
        </section>

        <section id="faq" className="w-full max-w-3xl mx-auto py-24 fade-in opacity-0">
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
