
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AreaChart, Wallet, Repeat, History, Settings, BrainCircuit } from 'lucide-react';
import { cn } from '@/lib/utils';
import { GenesisAILogo } from '../icons/GenesisAILogo';

const navItems = [
  { href: '/dashboard', icon: Wallet, label: 'Wallet' },
  { href: '/dashboard/swap', icon: Repeat, label: 'Swap' },
  { href: '/dashboard/genesis-ai', icon: GenesisAILogo, label: 'Genesis' },
  { href: '/dashboard/history', icon: History, label: 'History' },
  { href: '/dashboard/settings', icon: Settings, label: 'Settings' },
];

const NavItem = ({ href, icon: Icon, label }: typeof navItems[0]) => {
    const pathname = usePathname();
    const isActive = pathname === href;
    const isGenesis = label === 'Genesis';

    return (
        <Link href={href} className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors group w-full">
            <div className={cn(
                "w-16 h-12 flex items-center justify-center rounded-2xl shadow-heavy-out-sm transition-all duration-300",
                isActive ? "shadow-heavy-in-sm bg-primary/10" : "bg-background",
                isGenesis && "genesis-icon-glow"
            )}>
              <Icon className={cn(
                  "h-6 w-6 transition-all", 
                  isActive ? "text-primary" : "text-muted-foreground group-hover:text-primary",
                  isGenesis && "h-8 w-8"
              )} />
            </div>
            <span className={cn("text-xs font-medium", isActive ? "text-primary" : "text-muted-foreground")}>{label}</span>
        </Link>
    )
}

export default function BottomNav() {
  return (
    <footer className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-lg z-50">
        <nav className="h-24 w-full bg-background/80 backdrop-blur-lg border border-border/50 rounded-full flex items-center justify-between px-8 shadow-heavy-out-lg">
            {navItems.map(item => <NavItem key={item.href} {...item} />)}
        </nav>
    </footer>
  );
}
