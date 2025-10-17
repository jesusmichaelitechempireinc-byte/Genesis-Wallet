import Link from 'next/link';
import {
  Home,
  Wallet,
  ArrowRightLeft,
  History,
  Settings,
  HelpCircle,
  BrainCircuit,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';
import { GenesisVaultLogo } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const navItems = [
  { href: '/dashboard', icon: Wallet, label: 'Wallet' },
  { href: '/dashboard/swap', icon: ArrowRightLeft, label: 'Swap' },
  { href: '/dashboard/send', icon: ArrowUp, label: 'Send' },
  { href: '/dashboard/receive', icon: ArrowDown, label: 'Receive' },
  { href: '/dashboard/history', icon: History, label: 'History' },
  { href: '/dashboard/genesis-ai', icon: BrainCircuit, label: 'Genesis AI' },
];

export default function Sidebar() {
  return (
    <aside className="hidden w-64 flex-col border-r p-4 shadow-neo-out z-20 bg-background">
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
              index === 0 ? 'bg-muted/50 text-primary shadow-neo-in-sm' : ''
            }`}
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </Link>
        ))}
      </nav>
       <div className="mt-auto space-y-2">
         <Link
            href={'/dashboard/settings'}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted/50`}
          >
            <Settings className="h-5 w-5" />
            Settings
          </Link>
        <Card className="shadow-neo-in border-none">
            <CardContent className="p-4 flex flex-col items-center text-center">
                <HelpCircle className="h-8 w-8 text-primary mb-2 [filter:drop-shadow(0_0_3px_hsl(var(--primary)/0.6))]"/>
                <h3 className="font-semibold">Need help?</h3>
                <p className="text-xs text-muted-foreground mt-1 mb-3">Contact our support team for any assistance.</p>
                <Button size="sm" className="w-full rounded-full bg-primary text-primary-foreground btn-glow">Contact Support</Button>
            </CardContent>
        </Card>
      </div>
    </aside>
  );
}
