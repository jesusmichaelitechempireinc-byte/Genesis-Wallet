
'use client';

import { useState } from 'react';
import { Search, Bell, Settings, X, ChevronDown, Check, Coins, AlertCircle, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuRadioGroup, DropdownMenuRadioItem } from '@/components/ui/dropdown-menu';
import { currencies } from '@/lib/data';
import { useCurrency } from '@/hooks/use-currency';

const notifications = [
    {
        icon: Coins,
        title: "Large ETH Transfer",
        description: "A transfer of 2.5 ETH was successfully received.",
        time: "1 day ago"
    },
    {
        icon: AlertCircle,
        title: "Security Alert",
        description: "A new device signed into your account. Was this you?",
        time: "2 days ago"
    }
]

export default function Header({ onSearchChange }: { onSearchChange?: (term: string) => void }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [walletName, setWalletName] = useState("Primary Wallet");
  const [editingWalletName, setEditingWalletName] = useState(walletName);
  const { selectedCurrency, setSelectedCurrency } = useCurrency();

  const handleSaveWalletName = () => {
    setWalletName(editingWalletName);
  }

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onSearchChange) {
      onSearchChange(e.target.value);
    }
  };

  return (
    <header className="sticky top-0 z-20 flex h-20 items-center justify-between px-4 md:px-6 transition-all duration-300">
      <div className={cn("flex items-center gap-3 transition-all duration-300", isSearchOpen && 'opacity-0 pointer-events-none')}>
         <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 rounded-full shadow-heavy-out-sm active:shadow-heavy-in-sm p-3 h-auto text-lg">
                    <span className="font-bold">{walletName}</span>
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 shadow-heavy-out-lg border-none" align="start">
                <DropdownMenuLabel>Rename Wallet</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="p-2 space-y-2">
                    <Input 
                        placeholder="New wallet name" 
                        className="shadow-heavy-in-sm" 
                        value={editingWalletName}
                        onChange={(e) => setEditingWalletName(e.target.value)}
                    />
                    <DropdownMenuItem asChild>
                        <Button 
                            className="w-full btn-glow"
                            onClick={handleSaveWalletName}
                        >
                            <Check className="mr-2 h-4 w-4" />
                            Save Name
                        </Button>
                    </DropdownMenuItem>
                </div>
            </DropdownMenuContent>
         </DropdownMenu>
      </div>

      <div className={cn("flex items-center gap-2 transition-all duration-300", isSearchOpen && 'opacity-0 pointer-events-none')}>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full shadow-heavy-out-sm active:shadow-heavy-in-sm">
                    <Globe className="h-5 w-5 text-muted-foreground" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 shadow-heavy-out-lg border-none max-h-80 overflow-y-auto" align="end">
                <DropdownMenuLabel>Select Currency</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={selectedCurrency.code} onValueChange={(code) => {
                    const currency = currencies.find(c => c.code === code);
                    if (currency) {
                        setSelectedCurrency(currency);
                    }
                }}>
                {currencies.map(c => (
                    <DropdownMenuRadioItem key={c.code} value={c.code} className="cursor-pointer">
                        <div className="flex items-center justify-between w-full">
                           <span>{c.code} - {c.name}</span>
                           <span className="font-bold">{c.symbol}</span>
                        </div>
                    </DropdownMenuRadioItem>
                ))}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>

        {onSearchChange && (
            <Button variant="ghost" size="icon" className="rounded-full shadow-heavy-out-sm active:shadow-heavy-in-sm" onClick={() => setIsSearchOpen(true)}>
                <Search className="h-5 w-5 text-muted-foreground" />
            </Button>
        )}
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full shadow-heavy-out-sm active:shadow-heavy-in-sm relative">
                    <Bell className="h-5 w-5 text-muted-foreground" />
                    <div className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary primary-glow"></div>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80 shadow-heavy-out-lg border-none" align="end">
                <DropdownMenuLabel className="flex justify-between items-center">
                    Notifications
                    <Button variant="ghost" size="sm">Clear all</Button>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {notifications.length > 0 ? (
                    notifications.map((n, i) => (
                        <DropdownMenuItem key={i} className="flex gap-3 items-start p-3 cursor-pointer">
                            <div className="p-2 rounded-full shadow-heavy-in-sm bg-background">
                                <n.icon className="h-5 w-5 text-primary" />
                            </div>
                            <div className="flex-1">
                                <p className="font-semibold">{n.title}</p>
                                <p className="text-xs text-muted-foreground">{n.description}</p>
                                <p className="text-xs text-muted-foreground/50 mt-1">{n.time}</p>
                            </div>
                        </DropdownMenuItem>
                    ))
                ) : (
                    <div className="p-4 text-center text-sm text-muted-foreground">
                        No new notifications.
                    </div>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
        <Link href="/dashboard/settings">
            <Button variant="ghost" size="icon" className="rounded-full shadow-heavy-out-sm active:shadow-heavy-in-sm">
                <Settings className="h-5 w-5 text-muted-foreground" />
            </Button>
        </Link>
      </div>

       <div className={cn("absolute inset-0 h-20 px-4 md:px-6 bg-background flex items-center justify-center transition-all duration-300 z-10", isSearchOpen ? 'opacity-100' : 'opacity-0 pointer-events-none')}>
          <div className="w-full max-w-md relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              placeholder="Search assets..." 
              className="w-full h-12 rounded-full shadow-heavy-in-lg pl-12 pr-12"
              onChange={handleSearchInputChange}
            />
            <Button variant="ghost" size="icon" className="rounded-full absolute right-2 top-1/2 -translate-y-1/2" onClick={() => setIsSearchOpen(false)}>
                <X className="h-5 w-5 text-muted-foreground" />
            </Button>
          </div>
       </div>

    </header>
  );
}
