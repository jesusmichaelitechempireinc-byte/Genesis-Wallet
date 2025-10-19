
'use client';
import React, { Suspense } from 'react';
import Header from "@/components/dashboard/Header";
import TokenSwap from "@/components/dashboard/TokenSwap";
import BottomNav from "@/components/dashboard/BottomNav";

function SwapPage() {
  return (
    <div className="flex min-h-screen w-full bg-background font-body text-foreground">
        <div className="flex flex-1 flex-col relative">
          <Header />
          <main className="flex py-8 items-center justify-center pb-32">
            <div className="w-full max-w-md">
              <Suspense fallback={<div className="flex items-center justify-center h-full w-full">Loading...</div>}>
                <TokenSwap />
              </Suspense>
            </div>
          </main>
          <BottomNav />
        </div>
    </div>
  );
}

export default function SwapPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SwapPage />
    </Suspense>
  )
}
