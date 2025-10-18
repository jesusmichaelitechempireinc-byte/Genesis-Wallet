
import Link from 'next/link';
import {
  AreaChart,
  Wallet,
  Repeat,
  History,
  Settings,
  HelpCircle,
} from 'lucide-react';
import { GenesisVaultLogo } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const navItems = [
  { href: '/dashboard/market', icon: AreaChart, label: 'Market' },
  { href: '/dashboard', icon: Wallet, label: 'Balance' },
  { href: '/dashboard/transactions', icon: Repeat, label: 'Transactions' },
  { href: '/dashboard/history', icon: History, label: 'History' },
  { href: '/dashboard/settings', icon: Settings, label: 'Settings' },
];

export default function Sidebar() {
  return (
    <aside className="hidden md:flex w-64 flex-col border-r bg-background p-4 z-20">
      <Link href="/" className="flex items-center gap-3 px-2 py-4">
        <GenesisVaultLogo />
        <h1 className="text-xl font-bold font-headline">Genesis Vault</h1>
      </Link>
      <nav className="flex-1 space-y-2 py-4">
        {navItems.map((item, index) => (
          <Link
            key={item.label}
            href={item.href}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted/50 ${
              item.href === '/dashboard' ? 'bg-muted/50 text-primary' : ''
            }`}
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </Link>
        ))}
      </nav>
       <div className="mt-auto space-y-2">
        <Card className="bg-card border-none shadow-heavy-out">
            <CardContent className="p-4 flex flex-col items-center text-center">
                <HelpCircle className="h-8 w-8 text-primary mb-2"/>
                <h3 className="font-semibold">Need help?</h3>
                <p className="text-xs text-muted-foreground mt-1 mb-3">Contact our support team for any assistance.</p>
                <Button size="sm" className="w-full rounded-full bg-primary text-primary-foreground shadow-heavy-out active:shadow-heavy-in">Contact Support</Button>
            </CardContent>
        </Card>
      </div>
    </aside>
  );
}
