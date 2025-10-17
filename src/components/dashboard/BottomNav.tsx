'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Wallet, ArrowRightLeft, ArrowUp, ArrowDown, History, BrainCircuit } from 'lucide-react';
import { cn } from '@/lib/utils';
import { GenesisAILogo } from '../icons';

const navItems = [
  { href: '/dashboard', icon: Wallet, label: 'Wallet' },
  { href: '/dashboard/swap', icon: ArrowRightLeft, label: 'Swap' },
  { href: '/dashboard/send', icon: ArrowUp, label: 'Send' },
  { href: '/dashboard/receive', icon: ArrowDown, label: 'Receive' },
  { href: '/dashboard/history', icon: History, label: 'History' },
  { href: '/dashboard/genesis-ai', icon: BrainCircuit, label: 'Genesis' },
];

const NavItem = ({ href, icon: Icon, label }: typeof navItems[0]) => {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Link href={href} className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors group">
            <div className={cn(
                "w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ease-in-out",
                isActive ? 'shadow-neo-in-lg bg-background/70' : 'shadow-neo-out-sm bg-background/70 group-hover:shadow-neo-in-sm'
            )}>
                <Icon className={cn("h-7 w-7 transition-all", isActive ? "text-primary primary-glow" : "group-hover:text-primary")} />
            </div>
            <span className={cn("text-xs font-medium", isActive && "text-primary")}>{label}</span>
        </Link>
    )
}

export default function BottomNav() {
  return (
    <footer className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-2xl z-50">
        <nav className="h-28 w-full rounded-2xl bg-background/50 backdrop-blur-lg border border-white/10 shadow-neo-out-lg flex items-center justify-around px-2">
            {navItems.map(item => <NavItem key={item.href} {...item} />)}
        </nav>
    </footer>
  );
}
