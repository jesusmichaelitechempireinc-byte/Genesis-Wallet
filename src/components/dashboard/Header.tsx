
'use client';

import { useState } from 'react';
import { Search, Bell, Settings, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const walletName = "Primary Wallet";

  return (
    <header className="sticky top-0 z-20 flex h-20 items-center justify-between px-4 md:px-6 transition-all duration-300">
      <div className={cn("flex items-center gap-3 transition-all duration-300", isSearchOpen && 'opacity-0 pointer-events-none')}>
         <Button variant="ghost" className="flex items-center gap-2 rounded-full shadow-heavy-out-sm active:shadow-heavy-in-sm p-3 h-auto">
            <span className="font-bold text-lg">{walletName}</span>
            <ChevronDown className="h-5 w-5 text-muted-foreground" />
        </Button>
      </div>

      <div className={cn("flex items-center gap-2 transition-all duration-300", isSearchOpen && 'opacity-0 pointer-events-none')}>
        <Button variant="ghost" size="icon" className="rounded-full shadow-heavy-out-sm active:shadow-heavy-in-sm" onClick={() => setIsSearchOpen(true)}>
          <Search className="h-5 w-5 text-muted-foreground" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full shadow-heavy-out-sm active:shadow-heavy-in-sm relative">
          <Bell className="h-5 w-5 text-muted-foreground" />
          <div className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary primary-glow"></div>
        </Button>
        <Link href="/dashboard/settings">
            <Button variant="ghost" size="icon" className="rounded-full shadow-heavy-out-sm active:shadow-heavy-in-sm">
                <Settings className="h-5 w-5 text-muted-foreground" />
            </Button>
        </Link>
      </div>

       <div className={cn("absolute inset-0 h-20 px-4 md:px-6 bg-background flex items-center justify-center transition-all duration-300 z-10", isSearchOpen ? 'opacity-100' : 'opacity-0 pointer-events-none')}>
          <div className="w-full max-w-md relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input placeholder="Search assets..." className="w-full h-12 rounded-full shadow-heavy-in-lg pl-12 pr-12" />
            <Button variant="ghost" size="icon" className="rounded-full absolute right-2 top-1/2 -translate-y-1/2" onClick={() => setIsSearchOpen(false)}>
                <X className="h-5 w-5 text-muted-foreground" />
            </Button>
          </div>
       </div>

    </header>
  );
}
