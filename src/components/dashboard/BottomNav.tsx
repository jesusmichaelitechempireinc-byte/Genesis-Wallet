'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AreaChart, Wallet, Repeat, History, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/dashboard/market', icon: AreaChart, label: 'Market' },
  { href: '/dashboard', icon: Wallet, label: 'Balance' },
  { href: '/dashboard/transactions', icon: Repeat, label: 'Transactions' },
  { href: '/dashboard/settings', icon: Settings, label: 'Settings' },
];

const NavItem = ({ href, icon: Icon, label }: typeof navItems[0]) => {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Link href={href} className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors group w-full">
            <Icon className={cn(
                "h-6 w-6 transition-all", 
                isActive ? "text-primary" : "text-muted-foreground",
            )} />
            <span className={cn("text-xs font-medium", isActive ? "text-primary" : "text-muted-foreground")}>{label}</span>
        </Link>
    )
}

export default function BottomNav() {
  return (
    <footer className="fixed bottom-0 left-0 w-full z-50 md:hidden">
        <nav className="h-20 w-full bg-background/95 backdrop-blur-sm border-t border-border/50 flex items-center justify-around px-2">
            {navItems.map(item => <NavItem key={item.href} {...item} />)}
        </nav>
    </footer>
  );
}
