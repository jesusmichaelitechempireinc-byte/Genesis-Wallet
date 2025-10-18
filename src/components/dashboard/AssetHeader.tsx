
'use client';
import { useState } from 'react';
import { ChevronLeft, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Coin } from "@/lib/data";
import Link from "next/link";
import Image from "next/image";
import { cn } from '@/lib/utils';

export default function AssetHeader({ coin }: { coin: Coin }) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <header className="sticky top-0 z-10 flex h-20 items-center justify-between px-4 md:px-6">
      <Link href="/dashboard" passHref>
        <Button variant="ghost" size="icon" className="rounded-full shadow-heavy-out-sm active:shadow-heavy-in-sm">
          <ChevronLeft className="h-6 w-6 text-muted-foreground" />
        </Button>
      </Link>
      <div className="flex items-center gap-3">
         {coin.iconUrl ? (
            <Image src={coin.iconUrl} alt={coin.name} width={32} height={32} />
         ) : (
            coin.icon && <coin.icon className="h-8 w-8" />
         )}
        <h1 className="text-xl font-bold font-headline">{coin.name}</h1>
      </div>
      <Button 
        variant="ghost" 
        size="icon" 
        className={cn(
          "rounded-full shadow-heavy-out-sm active:shadow-heavy-in-sm",
          isFavorite && "genesis-icon-glow"
        )}
        onClick={() => setIsFavorite(!isFavorite)}
      >
        <Star 
          className={cn(
            "h-6 w-6 text-muted-foreground transition-all",
            isFavorite && "text-primary fill-primary"
          )} 
        />
      </Button>
    </header>
  );
}
