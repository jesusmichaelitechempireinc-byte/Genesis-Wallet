
'use client';
import React, { Suspense } from 'react';
import Header from "@/components/dashboard/Header";
import TokenSwap from "@/components/dashboard/TokenSwap";
import BottomNav from "@/components/dashboard/BottomNav";
import { useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';

function SwapPage() {
  const searchParams = useSearchParams();
  const initialFromTicker = searchParams.get('from');

  return (
    <div className="flex min-h-screen w-full bg-background font-body text-foreground">
        <div className="flex flex-1 flex-col relative">
          <Header />
          <main className="flex py-8 items-center justify-center pb-32">
            <div className="w-full max-w-md">
                <TokenSwap initialFromTicker={initialFromTicker} />
            </div>
          </main>
          <BottomNav />
        </div>
    </div>
  );
}

export default function SwapPageWrapper() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen w-full bg-background"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>}>
      <SwapPage />
    </Suspense>
  )
}
