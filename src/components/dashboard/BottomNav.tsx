'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AreaChart, Wallet, Repeat, History, Settings, BrainCircuit } from 'lucide-react';
import { cn } from '@/lib/utils';
import { GenesisAILogo } from '../icons/GenesisAILogo';

const navItems = [
  { href: '/dashboard', icon: Wallet, label: 'Wallet' },
  { href: '/dashboard/swap', icon: Repeat, label: 'Swap' },
  { href: '/dashboard/send', icon: AreaChart, label: 'Send' },
  { href: '/dashboard/receive', icon: History, label: 'Receive' },
  { href: '/dashboard/history', icon: History, label: 'History' },
  { href: '/dashboard/genesis-ai', icon: GenesisAILogo, label: 'Genesis' },
];

const NavItem = ({ href, icon: Icon, label }: typeof navItems[0]) => {
    const pathname = usePathname();
    const isActive = pathname === href;
    const isGenesis = label === 'Genesis';

    return (
        <Link href={href} className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors group w-full">
            <div className={cn(
                "p-3 rounded-full shadow-neo-out-sm transition-all duration-300",
                isActive ? "shadow-neo-in-sm bg-primary/10" : "bg-background",
                isGenesis && "genesis-icon-glow"
            )}>
              <Icon className={cn(
                  "h-6 w-6 transition-all", 
                  isActive ? "text-primary" : "text-muted-foreground group-hover:text-primary",
              )} />
            </div>
            <span className={cn("text-xs font-medium", isActive ? "text-primary" : "text-muted-foreground")}>{label}</span>
        </Link>
    )
}

export default function BottomNav() {
  return (
    <footer className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-md z-50">
        <nav className="h-24 w-full bg-background/80 backdrop-blur-lg border border-border/50 rounded-3xl flex items-center justify-around px-2 shadow-neo-out-lg">
            {navItems.map(item => <NavItem key={item.href} {...item} />)}
        </nav>
    </footer>
  );
}
